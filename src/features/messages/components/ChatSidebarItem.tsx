import { cn } from "@/lib/utils";
import { ChatAvatarImage } from "./ChatAvatarImage";

interface ChatSidebarItemProps {
  chat: IConversation;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ChatSidebarItem({
  chat,
  isSelected,
  onClick,
  className,
}: ChatSidebarItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center space-x-3 cursor-pointer py-2 border-b px-2 rounded-lg transition-colors hover:bg-blue-50",
        isSelected && "bg-blue-100",
        className
      )}
    >
      <ChatAvatarImage avatar={chat.avatar} name={chat.name} />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate">{chat.name}</p>
        <p className="text-xs text-gray-500 truncate">{chat.message}</p>
      </div>
      <span className="text-xs text-gray-400 flex-shrink-0">{chat.time}</span>
    </div>
  );
}
