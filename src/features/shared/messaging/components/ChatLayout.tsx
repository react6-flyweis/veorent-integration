import { cn } from "@/lib/utils";
import {
  Children,
  isValidElement,
  type PropsWithChildren,
  type ReactElement,
} from "react";

function ChatLayout({ children }: PropsWithChildren) {
  const header = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === ChatLayoutHeader,
  ) as ReactElement | undefined;

  const sidebar = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === ChatLayoutSidebar,
  ) as ReactElement | undefined;

  const main = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === ChatLayoutMain,
  ) as ReactElement | undefined;

  return (
    <div className="@container flex flex-1 flex-col">
      {header && <>{header}</>}
      <div className="flex flex-1 flex-col gap-5 bg-white @2xl:flex-row">
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
  showOnMobile?: boolean;
}

function ChatLayoutHeader({ children, className }: PropsWithChildClass) {
  return <div className={cn("flex-none", className)}>{children}</div>;
}

function ChatLayoutSidebar({
  children,
  className,
  showOnMobile = true,
}: PropsWithChildClass) {
  return (
    <div
      className={cn(
        "w-full border-r pr-2 @2xl:w-1/3",
        !showOnMobile && "hidden @2xl:block",
        className,
      )}
    >
      {children}
    </div>
  );
}

function ChatLayoutMain({
  children,
  className,
  showOnMobile = true,
}: PropsWithChildClass) {
  return (
    <div
      className={cn(
        "h-full w-full @2xl:w-2/3",
        !showOnMobile && "hidden @2xl:block",
        className,
      )}
    >
      {children}
    </div>
  );
}

export { ChatLayout, ChatLayoutHeader, ChatLayoutSidebar, ChatLayoutMain };
