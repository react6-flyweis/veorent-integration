import { ScrollArea } from "@/components/ui/scroll-area";
import { useConversationMessages } from "@/hooks/useMessaging";
import { useAuthStore } from "@/store/useAuthStore";

import { ChatHeader } from "./ChatHeader";
import { ChatToolbar } from "./ChatToolbar";

interface ChatMainProps {
  selectedChat: IConversation;
  onBackClick?: () => void;
}

export function ChatMain({ selectedChat, onBackClick }: ChatMainProps) {
  const user = useAuthStore((state) => state.user);
  const { messages, loading } = useConversationMessages(selectedChat.id);

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
      <ScrollArea className="flex-1 space-y-4 p-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Loading messages...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">
              No messages yet. Start the conversation!
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex py-2 ${
                msg.senderId === user?._id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
                  msg.senderId === user?._id
                    ? "bg-blue-900 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                {msg.content}
              </div>
              <span className="ml-2 self-end text-xs text-gray-400">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))
        )}
      </ScrollArea>
      <ChatToolbar conversationId={selectedChat.id} />
    </div>
  );
}
