import { useState, useEffect, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";

import { CreateButton } from "@/components/CreateButton";
import { PageTitle } from "@/components/PageTitle";
import { useMessaging } from "@/hooks/useMessaging";
import { useAuthStore } from "@/store/useAuthStore";

import {
  ChatLayout,
  ChatLayoutSidebar,
  ChatLayoutMain,
  ChatLayoutHeader,
} from "./components/ChatLayout";
import { ChatMain } from "./components/ChatMain";
import { ChatSidebar, ChatSidebarContent } from "./components/ChatSidebar";
import { ChatSidebarItem } from "./components/ChatSidebarItem";
import { ConversationLoadingFallback } from "./components/MessagingLoadingFallbacks";

export default function Messages() {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const { conversations, loading } = useMessaging();

  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [showMainChat, setShowMainChat] = useState(false);

  // Handle navigation from AddContacts
  useEffect(() => {
    if (location.state?.conversationId) {
      setSelectedConversationId(location.state.conversationId);
      setShowMainChat(true);
    }
  }, [location.state]);

  const selectedConversation = conversations.find(
    (conv) => conv.id === selectedConversationId,
  );

  const handleChatSelect = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    setShowMainChat(true);
  };

  const handleBackToSidebar = () => {
    setShowMainChat(false);
  };

  // Convert Firebase conversation to display format
  const getConversationDisplayData = (
    conversation: IConversation,
  ): IChatDisplay | null => {
    if (!user) return null;

    const otherParticipantId = conversation.participants.find(
      (id) => id !== user._id,
    );

    if (!otherParticipantId) return null;

    const otherParticipant =
      conversation.participantDetails[otherParticipantId];

    return {
      id: conversation.id,
      name: otherParticipant?.name || "Unknown",
      message: conversation.lastMessage?.content || t("noMessagesYet"),
      time: conversation.lastMessage
        ? new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "",
      avatar: otherParticipant?.avatar || "/assets/user.jpg",
    };
  };

  return (
    <ChatLayout>
      <ChatLayoutHeader className="mb-4">
        <div className="flex items-center justify-between">
          <PageTitle title={t("messages")} className="mb-0 hidden @md:flex" />
          <Link to="add">
            <CreateButton
              label={
                user?.userType === "PARTNER"
                  ? t("addRenters")
                  : t("addContacts")
              }
            />
          </Link>
        </div>
      </ChatLayoutHeader>
      <ChatLayoutSidebar showOnMobile={!showMainChat}>
        <ChatSidebar>
          <ChatSidebarContent>
            {loading ? (
              <div className="space-y-3 p-4">
                {/* Loading skeleton for conversation list */}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex animate-pulse items-center space-x-3"
                  >
                    <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-3/4 rounded bg-gray-300"></div>
                      <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                    </div>
                    <div className="h-3 w-12 rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>
            ) : conversations.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-gray-500">{t("noConversationsYet")}</div>
              </div>
            ) : (
              conversations.map((conversation) => {
                const displayData = getConversationDisplayData(conversation);
                if (!displayData) return null;

                return (
                  <ChatSidebarItem
                    key={conversation.id}
                    chat={displayData}
                    isSelected={selectedConversationId === conversation.id}
                    onClick={() => handleChatSelect(conversation.id)}
                  />
                );
              })
            )}
          </ChatSidebarContent>
        </ChatSidebar>
      </ChatLayoutSidebar>

      <ChatLayoutMain showOnMobile={showMainChat}>
        {selectedConversation ? (
          <Suspense fallback={<ConversationLoadingFallback />}>
            <ChatMain
              selectedChat={selectedConversation}
              onBackClick={handleBackToSidebar}
            />
          </Suspense>
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-50">
            <div className="text-center text-gray-500">
              {t("selectConversationToStart")}
            </div>
          </div>
        )}
      </ChatLayoutMain>
    </ChatLayout>
  );
}
