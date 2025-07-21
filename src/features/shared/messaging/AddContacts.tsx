import { useMemo, Suspense } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { Loader } from "@/components/Loader";
import { PageTitle } from "@/components/PageTitle";
import { useGetTenantsQuery } from "@/features/landlord/renters/api/queries";
import { useGetLandlordsForUserQuery } from "@/features/tenant/api/queries";
import { useMessaging } from "@/hooks/useMessaging";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

import { ChatAvatarImage } from "./components/ChatAvatarImage";
import {
  ChatLayout,
  ChatLayoutSidebar,
  ChatLayoutMain,
  ChatLayoutHeader,
} from "./components/ChatLayout";
import { MessagingLoadingFallback } from "./components/MessagingLoadingFallbacks";

interface Contact {
  id: string;
  name: string;
  description: string;
  avatar: string;
  email: string;
  originalData: IUser;
}

function AddContacts() {
  const user = useAuthStore((store) => store.user);
  const userPref = user?.userType;
  const navigate = useNavigate();
  const { createConversation } = useMessaging();

  // Get tenants for landlord users
  const { data: tenants = [], isLoading: tenantsLoading } = useGetTenantsQuery(
    1,
    100,
  );

  // Get landlords for tenant users
  const { data: landlords = [], isLoading: landlordsLoading } =
    useGetLandlordsForUserQuery();

  const handleContactSelect = async (contact: Contact) => {
    try {
      // Create or get existing Firebase conversation
      const conversationId = await createConversation(contact.id, {
        name: contact.name,
        avatar: contact.avatar,
        email: contact.email,
      });

      // Navigate to messages with the conversation ID
      navigate("/landlord/messages", {
        state: {
          conversationId,
          selectedContact: contact,
        },
      });
    } catch (error) {
      console.error("Error creating conversation:", error);
      toast.error("Failed to start conversation. Please try again.");
    }
  };

  // Transform data based on user type
  const contacts: Contact[] = useMemo(() => {
    if (userPref === "PARTNER") {
      return tenants.map((tenant) => ({
        id: tenant._id,
        name:
          tenant.fullName ||
          `${tenant.userId?.firstname || ""} ${tenant.userId?.lastname || ""}`.trim(),
        description:
          `${tenant.propertyDetails?.streetAddress || ""}, ${tenant.propertyDetails?.unitNumber || ""}`.replace(
            ", ",
            "",
          ),
        avatar: tenant.userId?.image || "/assets/user.jpg",
        email: tenant.userId?.email || "",
        originalData: tenant.user, // Include original tenant data
      }));
    } else {
      return landlords.map((landlord) => ({
        id: landlord._id,
        name:
          `${landlord.firstname || ""} ${landlord.lastname || ""}`.trim() ||
          landlord.fullName ||
          "Landlord",
        description: landlord.email || "",
        avatar: landlord.image || "/assets/user.jpg",
        email: landlord.email || "",
        originalData: landlord, // Include original landlord data
      }));
    }
  }, [userPref, tenants, landlords]);

  // Group contacts by first letter
  const contactsByLetter = useMemo(() => {
    const grouped: Record<string, Contact[]> = {};

    contacts.forEach((contact) => {
      const firstLetter = contact.name.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(contact);
    });

    // Sort each group alphabetically
    Object.keys(grouped).forEach((letter) => {
      grouped[letter].sort((a, b) => a.name.localeCompare(b.name));
    });

    return grouped;
  }, [contacts]);

  const isLoading = userPref === "PARTNER" ? tenantsLoading : landlordsLoading;

  if (isLoading) {
    return (
      <ChatLayout>
        <ChatLayoutHeader className="mb-4">
          <PageTitle
            title={userPref === "PARTNER" ? "Renters" : "Landlords"}
            className="mb-0"
            withBack
          />
        </ChatLayoutHeader>
        <ChatLayoutSidebar>
          <div className="flex items-center justify-center py-8">
            <Loader />
          </div>
        </ChatLayoutSidebar>
        <ChatLayoutMain showOnMobile={false}>
          <div className="flex h-full items-center justify-center bg-blue-50">
            <div className="text-center text-gray-500"></div>
          </div>
        </ChatLayoutMain>
      </ChatLayout>
    );
  }

  return (
    <ChatLayout>
      <ChatLayoutHeader className="mb-4">
        <PageTitle
          title={userPref === "PARTNER" ? "Renters" : "Landlords"}
          className="mb-0"
          withBack
        />
      </ChatLayoutHeader>
      <ChatLayoutSidebar>
        <div className="pr-4">
          {Object.keys(contactsByLetter).length === 0 ? (
            <div className="flex items-center justify-center py-8 text-gray-500">
              No {userPref === "PARTNER" ? "tenants" : "landlords"} found
            </div>
          ) : (
            Object.entries(contactsByLetter)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([letter, contacts]) => (
                <div key={letter} className="mb-2">
                  <div className="sticky top-0 bg-white">
                    <h2 className="text-lg font-bold text-gray-500">
                      {letter}
                    </h2>
                  </div>
                  {contacts.map((contact) => (
                    <ContactItem
                      key={contact.id}
                      contact={contact}
                      onClick={() => handleContactSelect(contact)}
                    />
                  ))}
                </div>
              ))
          )}
        </div>
      </ChatLayoutSidebar>

      <ChatLayoutMain showOnMobile={false}>
        <div className="flex h-full items-center justify-center bg-blue-50">
          <div className="text-center text-gray-500"></div>
        </div>
      </ChatLayoutMain>
    </ChatLayout>
  );
}

interface ContactItemProps {
  contact: Contact;
  onClick?: (contact: Contact) => void;
  className?: string;
}

function ContactItem({ contact, onClick, className }: ContactItemProps) {
  return (
    <div
      onClick={() => onClick?.(contact)}
      className={cn(
        "flex cursor-pointer items-center space-x-3 rounded-lg border-b px-2 py-2 transition-colors hover:bg-blue-50",
        className,
      )}
    >
      <ChatAvatarImage avatar={contact.avatar} name={contact.name} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-semibold">{contact.name}</p>
        <p className="truncate text-sm text-gray-500">{contact.description}</p>
      </div>
    </div>
  );
}

export default function AddContactsWithSuspense() {
  return (
    <Suspense
      fallback={<MessagingLoadingFallback message="Loading contacts..." />}
    >
      <AddContacts />
    </Suspense>
  );
}
