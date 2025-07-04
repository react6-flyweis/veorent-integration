import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { CustomSwitch } from "@/components/ui/custom-switch";

import { useUpdateNotificationPreferenceMutation } from "../api/mutations";

interface NotificationToggleProps {
  /**
   * The current notification preference value from the profile
   */
  currentPreference?: boolean;
  /**
   * Whether to show the toggle controls initially
   */
  showToggle?: boolean;
  /**
   * Callback when the toggle visibility changes
   */
  onToggleVisibilityChange?: (visible: boolean) => void;
}

export function NotificationToggle({
  currentPreference = false,
  showToggle = false,
  onToggleVisibilityChange,
}: NotificationToggleProps) {
  const { t } = useTranslation();
  const [showNotificationToggles, setShowNotificationToggles] =
    useState(showToggle);
  const [showNotificationPreferences, setShowNotificationPreferences] =
    useState(currentPreference);

  const { mutateAsync } = useUpdateNotificationPreferenceMutation();

  const handleNotificationToggle = () => {
    const newValue = !showNotificationPreferences;
    setShowNotificationPreferences(newValue);

    mutateAsync({
      notificationPreference: newValue,
    }).catch((err) => {
      // Revert the state if the mutation fails
      setShowNotificationPreferences(currentPreference);
      toast.error(`Failed to update notification preference: ${err.message}`);
    });
  };

  const handleToggleVisibility = () => {
    const newVisibility = !showNotificationToggles;
    setShowNotificationToggles(newVisibility);
    onToggleVisibilityChange?.(newVisibility);
  };

  return (
    <div className="space-y-1">
      <h2 className="text-primary text-xl font-semibold">
        {t("notificationPreferences.title")}
      </h2>
      <p className="text-muted-foreground">
        {t("notificationPreferences.description")}
      </p>
      <div className="flex items-center justify-between">
        <Button
          onClick={handleToggleVisibility}
          variant="outlinePrimary"
          className="w-42"
        >
          {t("notificationPreferences.change")}
        </Button>
        {showNotificationToggles && (
          <div className="flex items-center space-x-2">
            {showNotificationPreferences !== currentPreference && (
              <Loader size="sm" />
            )}
            <CustomSwitch
              variant="colored"
              disabled={showNotificationPreferences !== currentPreference}
              checked={showNotificationPreferences}
              onCheckedChange={handleNotificationToggle}
            />
          </div>
        )}
      </div>
    </div>
  );
}
