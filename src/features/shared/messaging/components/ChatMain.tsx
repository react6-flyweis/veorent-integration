import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatHeader } from "./ChatHeader";
import { ChatToolbar } from "./ChatToolbar";

interface ChatMainProps {
  selectedChat: IConversation;
}

export function ChatMain({ selectedChat }: ChatMainProps) {
  return (
    <div className="bg-blue-50 rounded-xl flex flex-col">
      <ChatHeader chat={selectedChat} />
      <ScrollArea className="flex-1 p-4 space-y-4">
        <div className="text-center text-xs text-gray-400">Sunday</div>
        {selectedChat.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex py-2 ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-xs text-sm ${
                msg.sender === "me"
                  ? "bg-blue-900 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {msg.content}
            </div>
            <span className="text-xs text-gray-400 self-end ml-2">
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
