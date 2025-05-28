import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatHeader } from "./ChatHeader";
import { ChatToolbar } from "./ChatToolbar";

interface ChatMainProps {
  selectedChat: IConversation;
  onBackClick?: () => void;
}

export function ChatMain({ selectedChat, onBackClick }: ChatMainProps) {
  return (
    <div className="flex h-full flex-col rounded-xl bg-blue-50">
      <ChatHeader chat={selectedChat} onBackClick={onBackClick} />
      <ScrollArea className="flex-1 space-y-4 p-4">
        <div className="text-center text-xs text-gray-400">Sunday</div>
        {selectedChat.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex py-2 ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
                msg.sender === "me"
                  ? "bg-blue-900 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {msg.content}
            </div>
            <span className="ml-2 self-end text-xs text-gray-400">
              {msg.time}
            </span>
          </div>
        ))}
        <div className="text-center text-xs text-gray-400">Just Now</div>
      </ScrollArea>
      <ChatToolbar />
    </div>
  );
}
