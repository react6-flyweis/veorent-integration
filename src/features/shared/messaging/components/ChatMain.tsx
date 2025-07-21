import { Suspense } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useConversationMessages } from "@/hooks/useMessaging";
import { useAuthStore } from "@/store/useAuthStore";

import { ChatHeader } from "./ChatHeader";
import { ChatToolbar } from "./ChatToolbar";
import { MessagesLoadingFallback } from "./MessagingLoadingFallbacks";

interface ChatMainProps {
  selectedChat: IConversation;
  onBackClick?: () => void;
}

// Separate component for messages to properly use Suspense
function MessagesList({ conversationId }: { conversationId: string }) {
  const user = useAuthStore((state) => state.user);
  const { messages, loading } = useConversationMessages(conversationId);

  if (loading) {
    return <MessagesLoadingFallback />;
  }

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500">
          No messages yet. Start the conversation!
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-3 ${
            message.senderId === user?._id ? "justify-end" : "justify-start"
          }`}
        >
          {message.senderId !== user?._id && (
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-300"></div>
          )}
          <div
            className={`max-w-xs rounded-lg px-4 py-2 ${
              message.senderId === user?._id
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            {message.type === "text" && <p>{message.content}</p>}
            {message.type === "image" && (
              <img
                src={message.content}
                alt="Sent image"
                className="max-h-48 rounded"
              />
            )}
          </div>
          {message.senderId === user?._id && (
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-blue-300"></div>
          )}
        </div>
      ))}
    </div>
  );
}

export function ChatMain({ selectedChat, onBackClick }: ChatMainProps) {
  const user = useAuthStore((state) => state.user);

  // Get other participant details for header
  const otherParticipantId = selectedChat.participants.find(
    (id) => id !== user?._id,
  );
  const otherParticipant = otherParticipantId
    ? selectedChat.participantDetails[otherParticipantId]
    : null;

  const chatHeaderData: IChatDisplay = {
    id: selectedChat.id,
    name: otherParticipant?.name || "Unknown User",
    message: selectedChat.lastMessage?.content || "",
    time: selectedChat.lastMessage
      ? new Date(selectedChat.lastMessage.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "",
    avatar: otherParticipant?.avatar || "/assets/user.jpg",
  };

  return (
    <div className="flex h-full flex-col rounded-xl bg-blue-50">
      <ChatHeader chat={chatHeaderData} onBackClick={onBackClick} />
      <ScrollArea className="flex-1">
        <Suspense fallback={<MessagesLoadingFallback />}>
          <MessagesList conversationId={selectedChat.id} />
        </Suspense>
      </ScrollArea>
      <ChatToolbar conversationId={selectedChat.id} />
    </div>
  );
}
