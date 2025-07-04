import { useState } from "react";
import { useTranslation } from "react-i18next";

import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { useGetProfileQuery } from "@/features/core/auth/api/queries";

import { ChangePasswordForm } from "./components/ChangePasswordForm";
import { NotificationToggle } from "./components/NotificationToggle";
import { ProfileForm } from "./components/ProfileForm";
import { ProfilePicture } from "./components/ProfilePicture";

export default function Settings() {
  const { t } = useTranslation();

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Fetch profile data once at the top level
  const { data: profile, error } = useGetProfileQuery();

  if (error) {
    return (
      <div className="space-y-5">
        <PageTitle title={t("tSettings.accountSettings")} />
        <div className="text-center text-red-500">
          {t("tSettings.failedToLoadProfile")}
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-5">
      <PageTitle title={t("tSettings.accountSettings")} />
      <div className="space-y-4">
        <ProfilePicture profile={profile} />
        <h2 className="text-primary text-lg font-semibold">
          {t("tSettings.myInformation")}
        </h2>
        <ProfileForm profile={profile} />
        <div>
          <h2 className="text-primary mb-1 text-xl font-semibold">
            {t("tSettings.password")}
          </h2>
          <Button
            variant="outlinePrimary"
            className="mb-5 w-42"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            {t("tSettings.changePassword")}
          </Button>
          {showPasswordForm && (
            <ChangePasswordForm
              profile={profile}
              onClose={() => setShowPasswordForm(false)}
            />
          )}
        </div>
        <NotificationToggle
          currentPreference={profile?.notificationPreference}
        />
      </div>
    </div>
  );
}
