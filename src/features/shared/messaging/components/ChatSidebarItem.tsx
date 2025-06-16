import { cn } from "@/lib/utils";

import { ChatAvatarImage } from "./ChatAvatarImage";

interface ChatSidebarItemProps {
  chat: IChatDisplay;
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
        "flex cursor-pointer items-center space-x-3 rounded-lg border-b px-2 transition-colors hover:bg-blue-50",
        "py-3 @lg:py-2", // More padding in smaller containers
        isSelected && "bg-blue-100",
        className,
      )}
    >
      <ChatAvatarImage avatar={chat.avatar} name={chat.name} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-semibold @lg:text-sm">
          {chat.name}
        </p>
        <p className="truncate text-sm text-gray-500 @lg:text-xs">
          {chat.message}
        </p>
      </div>
      <span className="flex-shrink-0 text-sm text-gray-400 @lg:text-xs">
        {chat.time}
      </span>
    </div>
  );
}
