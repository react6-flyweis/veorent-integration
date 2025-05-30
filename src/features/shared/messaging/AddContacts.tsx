import {
  ChatLayout,
  ChatLayoutSidebar,
  ChatLayoutMain,
  ChatLayoutHeader,
} from "./components/ChatLayout";
import { ChatAvatarImage } from "./components/ChatAvatarImage";
import { PageTitle } from "@/components/PageTitle";
import { cn } from "@/lib/utils";
import { useUserPreferenceStore } from "@/store/useUserPreferenceStore";

interface Contact {
  name: string;
  description: string;
  avatar: string;
}

// Mock data for contacts organized by first letter
const contactsByLetter: Record<string, Contact[]> = {
  A: [
    {
      name: "Aheyenne Dias",
      description: "Lorem Ipsum is simply dummy text",
      avatar: "/avatars/ellen.jpg",
    },
    {
      name: "Aincoln Geidt",
      description: "Lorem Ipsum is simply dummy text",
      avatar: "/avatars/talan.jpg",
    },
    {
      name: "Aayna Torff",
      description: "Lorem Ipsum is simply dummy text",
      avatar: "/avatars/ashlynn.jpg",
    },
  ],
  B: [
    {
      name: "Baylon Korsgaard",
      description: "Lorem Ipsum is simply dummy text",
      avatar: "/avatars/connor.jpg",
    },
  ],
  C: [
    {
      name: "Cspen Siphron",
      description: "Lorem Ipsum is simply dummy text",
      avatar: "/avatars/josephine.jpg",
    },
    {
      name: "Cianna Schleifer",
      description: "Lorem Ipsum is simply dummy text",
      avatar: "/avatars/dulce.jpg",
    },
    {
      name: "Cheyenne Vetrovs",
      description: "Lorem Ipsum is simply dummy text",
      avatar: "/avatars/ellen.jpg",
    },
  ],
  D: [
    {
      name: "Dandy Botosh",
      description: "Lorem Ipsum is simply dummy text",
      avatar: "/avatars/connor.jpg",
    },
    {
      name: "Dheyenne Rosser",
      description: "Lorem Ipsum is simply dummy text",
      avatar: "/avatars/ashlynn.jpg",
    },
  ],
};

export default function AddContacts() {
  const userPref = useUserPreferenceStore((state) => state.userType);
  const handleContactSelect = (contact: Contact) => {
    // Handle contact selection logic here
    console.log("Selected contact:", contact);
  };

  return (
    <ChatLayout>
      <ChatLayoutHeader className="mb-4">
        <PageTitle
          title={userPref === "landlord" ? "Renters" : "Contacts"}
          className="mb-0"
          withBack
        />
      </ChatLayoutHeader>
      <ChatLayoutSidebar>
        <div className="pr-4">
          {Object.entries(contactsByLetter).map(([letter, contacts]) => (
            <div key={letter} className="mb-2">
              <div className="sticky top-0 bg-white">
                <h2 className="text-lg font-bold text-gray-500">{letter}</h2>
              </div>
              {contacts.map((contact, idx) => (
                <ContactItem
                  key={idx}
                  contact={contact}
                  onClick={() => handleContactSelect(contact)}
                />
              ))}
            </div>
          ))}
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
  onClick?: () => void;
  className?: string;
}

function ContactItem({ contact, onClick, className }: ContactItemProps) {
  return (
    <div
      onClick={onClick}
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
