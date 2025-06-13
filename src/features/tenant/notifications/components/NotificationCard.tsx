import type { FC } from "react";
import {
  type LucideIcon,
  CalendarClock,
  Wrench,
  PackageCheck,
} from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/utils/formatDate";

const iconMap: Record<string, LucideIcon> = {
  Wrench,
  CalendarClock,
  PackageCheck,
};

export const NotificationCard: FC<INotification> = ({
  title,
  createdAt,
  content,
}) => {
  const Icon = iconMap["CalendarClock"]; // You can replace "Wrench" with a dynamic key if needed

  return (
    <Card className="border-primary relative gap-0">
      <CardHeader>
        <div className="bg-primary absolute -top-2 -left-2 flex size-7 items-center justify-center rounded-full p-2 text-white">
          <Icon size={16} />
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-primary text-lg font-bold">{title}</h3>
          <span className="text-muted-foreground text-xs">
            {formatDate(createdAt)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="">
        <p className="text-muted-foreground leading-snug">{content}</p>
      </CardContent>
    </Card>
  );
};

export function NotificationCardSkeleton() {
  return (
    <Card className="border-primary relative gap-0">
      <CardHeader>
        <div className="bg-primary absolute -top-2 -left-2 flex size-7 items-center justify-center rounded-full p-2">
          <Skeleton className="size-4 rounded-full bg-white/30" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-3 w-20" />
        </div>
      </CardHeader>
      <CardContent className="">
        <Skeleton className="h-4 w-full" />
      </CardContent>
    </Card>
  );
}
