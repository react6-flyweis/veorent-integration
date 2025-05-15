import { cn } from "@/lib/utils";
import {
  Children,
  isValidElement,
  type PropsWithChildren,
  type ReactElement,
} from "react";

function ChatLayout({ children }: PropsWithChildren) {
  const header = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === ChatLayoutHeader
  ) as ReactElement | undefined;

  const sidebar = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === ChatLayoutSidebar
  ) as ReactElement | undefined;

  const main = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === ChatLayoutMain
  ) as ReactElement | undefined;

  return (
    <div className="">
      {header && <>{header}</>}
      <div className="flex gap-5 bg-white">
        {/* sidebar */}
        {sidebar && <>{sidebar}</>}
        {/* main */}
        {main && <>{main}</>}
      </div>
    </div>
  );
}

interface PropsWithChildClass extends PropsWithChildren {
  className?: string;
}

function ChatLayoutHeader({ children, className }: PropsWithChildClass) {
  return <div className={cn("flex-none", className)}>{children}</div>;
}

function ChatLayoutSidebar({ children }: PropsWithChildClass) {
  return <div className="w-1/3 border-r pr-2">{children}</div>;
}

function ChatLayoutMain({ children }: PropsWithChildClass) {
  return <div className="w-2/3">{children}</div>;
}

export { ChatLayout, ChatLayoutHeader, ChatLayoutSidebar, ChatLayoutMain };
