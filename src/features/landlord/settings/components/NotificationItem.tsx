import { useState, type FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { ToggleNotificationPreferences } from "./ToggleNotificationPrefrence";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface NotificationItemProps {
  title: string;
  description: string;
  channels?: (
    | string
    | {
        type: string;
        label: string;
      }
  )[];
}

export const NotificationItem: FC<NotificationItemProps> = ({
  title,
  description,
  channels,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card className="mb-4 py-3 shadow-sm">
      <CardContent className="px-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium">{title}</h3>
            <p className="text-muted-foreground mt-1 text-sm">{description}</p>
          </div>

          <Button
            onClick={() => channels && setIsOpen(true)}
            variant="outline"
            size="sm"
            className="h-8 bg-blue-50 px-3 text-blue-600 hover:bg-blue-100"
          >
            <Pencil className="mr-1 h-4 w-4" />
            <span className="text-xs font-medium">Edit</span>
          </Button>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="w-full gap-0 py-3">
            <div className="">
              <DialogTitle className="text-2xl">{title}</DialogTitle>
              <DialogDescription>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum,
                voluptas.
              </DialogDescription>
            </div>
            <div className="">
              {channels && channels.length && (
                <ToggleNotificationPreferences
                  preferences={channels.map((channel) =>
                    typeof channel === "string"
                      ? { type: channel, label: channel }
                      : channel,
                  )}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
