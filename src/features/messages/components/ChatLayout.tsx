import { type ReactNode } from "react";

interface ChatLayoutProps {
  children: ReactNode;
}

interface ChatLayoutHeaderProps {
  children: ReactNode;
}

interface ChatLayoutSidebarProps {
  children: ReactNode;
}

interface ChatLayoutMainProps {
  children: ReactNode;
}

function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Message</h2>
      <div className="flex gap-5 bg-white">{children}</div>
    </div>
  );
}

function ChatLayoutHeader({ children }: ChatLayoutHeaderProps) {
  return <div className="flex-none">{children}</div>;
}

function ChatLayoutSidebar({ children }: ChatLayoutSidebarProps) {
  return <div className="w-1/3 border-r pr-4">{children}</div>;
}

function ChatLayoutMain({ children }: ChatLayoutMainProps) {
  return <div className="w-2/3">{children}</div>;
}

export { ChatLayout, ChatLayoutHeader, ChatLayoutSidebar, ChatLayoutMain };
