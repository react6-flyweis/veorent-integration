import { ChatAvatarImage } from "./ChatAvatarImage";

interface ChatHeaderProps {
  chat: IConversation;
}

export function ChatHeader({ chat }: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-3 p-4 border-b">
      <ChatAvatarImage avatar={chat.avatar} name={chat.name} />
      <div>
        <p className="font-semibold">{chat.name}</p>
        <p className="text-xs text-gray-500">Online</p>
      </div>
    </div>
  );
}
