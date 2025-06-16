import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ChatAvatarImage } from "./ChatAvatarImage";

interface ChatHeaderProps {
  chat: IChatDisplay;
  onBackClick?: () => void;
}

export function ChatHeader({ chat, onBackClick }: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-2 border-b p-2 @lg:gap-3 @lg:p-4">
      {onBackClick && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onBackClick}
          className="size-6 @lg:hidden"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      )}
      <ChatAvatarImage avatar={chat.avatar} name={chat.name} />
      <div>
        <p className="font-semibold">{chat.name}</p>
        <p className="text-xs text-gray-500">Online</p>
      </div>
    </div>
  );
}
