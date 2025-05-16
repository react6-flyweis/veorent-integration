import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  type LucideIcon,
  CalendarClock,
  Wrench,
  PackageCheck,
} from "lucide-react";
import type { FC } from "react";

interface NotificationProps {
  title: string;
  time: string;
  message: string;
  icon: keyof typeof iconMap;
}

const iconMap: Record<string, LucideIcon> = {
  Wrench,
  CalendarClock,
  PackageCheck,
};

export const NotificationCard: FC<NotificationProps> = ({
  title,
  time,
  message,
  icon,
}) => {
  const Icon = iconMap[icon];

  return (
    <Card className="border-primary relative gap-0">
      <CardHeader>
        <div className="absolute -top-2 -left-2 bg-primary text-white rounded-full p-2 size-7 flex justify-center  items-center">
          <Icon size={16} />
        </div>
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-primary">{title}</h3>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
      </CardHeader>
      <CardContent className="">
        <p className="text-muted-foreground leading-snug">{message}</p>
      </CardContent>
    </Card>
  );
};
