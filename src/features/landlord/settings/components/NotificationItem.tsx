import { useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import { SingleTogglePreference } from "./ToggleNotificationPreference";
import { useUpdateNotificationPreferencesMutation } from "../api/mutation";

interface NotificationItemProps {
  title: string;
  description: string;
  channels: INotificationChannel | undefined;
  itemKey: keyof INotificationPreferencesUpdate;
}

export const NotificationItem: FC<NotificationItemProps> = ({
  title,
  description,
  channels,
  itemKey,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync } = useUpdateNotificationPreferencesMutation();

  const handleToggle = async (
    channel: keyof INotificationChannel,
    isEnabled: boolean,
  ) => {
    try {
      await mutateAsync({
        [itemKey]: {
          ...channels,
          [channel]: isEnabled,
        },
      });
      // setIsOpen(false);
      // toast.success(`Notification preference for ${channel} updated successfully!`);
    } catch (error) {
      console.error("Error updating notification preferences:", error);
      // toast.error(
      //   `Failed to update notification preference for ${channel}. Please try again.`,
      // );
    }
  };

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
            <span className="text-xs font-medium">
              {t("notification.edit")}
            </span>
          </Button>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="w-full gap-0 py-3">
            <div className="">
              <DialogTitle className="text-2xl">{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </div>
            <div className="">
              {(
                [
                  "Email",
                  "Call",
                  "PushNotification",
                ] as (keyof INotificationChannel)[]
              ).map((channel) => (
                <SingleTogglePreference
                  key={channel}
                  type={channel}
                  isEnabled={channels?.[channel]}
                  onChange={(isEnabled) => handleToggle(channel, isEnabled)}
                />
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
