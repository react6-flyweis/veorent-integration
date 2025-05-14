import { ScrollArea } from "@/components/ui/scroll-area";
import { type ReactNode } from "react";

interface ChatSidebarProps {
  children: ReactNode;
}

interface ChatSidebarHeaderProps {
  children: ReactNode;
}

interface ChatSidebarContentProps {
  children: ReactNode;
}

function ChatSidebar({ children }: ChatSidebarProps) {
  return <div className="flex flex-col h-full">{children}</div>;
}

function ChatSidebarHeader({ children }: ChatSidebarHeaderProps) {
  return <div className="p-4 border-b">{children}</div>;
}

function ChatSidebarContent({ children }: ChatSidebarContentProps) {
  return <ScrollArea className="flex-1">{children}</ScrollArea>;
}

export { ChatSidebar, ChatSidebarHeader, ChatSidebarContent };
