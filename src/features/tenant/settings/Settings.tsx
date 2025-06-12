import { useState } from "react";

import { Loader } from "@/components/Loader";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { CustomSwitch } from "@/components/ui/custom-switch";

import { useGetProfileQuery } from "./api/queries";
import { ChangePasswordForm } from "./components/ChangePasswordForm";
import { ProfileForm } from "./components/ProfileForm";
import { ProfilePicture } from "./components/ProfilePicture";

export default function Settings() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showNotificationToggles, setShowNotificationToggles] = useState(false);
  const [showNotificationPreferences, setShowNotificationPreferences] =
    useState(false);

  // Fetch profile data once at the top level
  const { data: profile, isLoading, error } = useGetProfileQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="space-y-5">
        <PageTitle title="Account Settings" />
        <div className="text-center text-red-500">
          Failed to load profile data. Please try again.
        </div>
      </div>
    );
  }

  if (!profile) {
    return <Loader />;
  }

  return (
    <div className="space-y-5">
      <PageTitle title="Account Settings" />
      <div className="space-y-4">
        <ProfilePicture profile={profile} />
        <h2 className="text-primary text-lg font-semibold">My Information</h2>
        <ProfileForm profile={profile} />
        <div>
          <h2 className="text-primary mb-1 text-xl font-semibold">Password</h2>
          <Button
            variant="outlinePrimary"
            className="mb-5 w-42"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            Change Password
          </Button>
          {showPasswordForm && (
            <ChangePasswordForm
              profile={profile}
              onClose={() => setShowPasswordForm(false)}
            />
          )}
        </div>
        <div className="space-y-1">
          <h2 className="text-primary text-xl font-semibold">
            Notification Preferences
          </h2>
          <p className="text-muted-foreground">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam,
            repudiandae consequuntur soluta dolore, cum odio, sunt fugiat
            explicabo voluptates molestiae quo tenetur! Veritatis laborum quod
            facilis deleniti numquam, ipsa libero.
          </p>
          <div className="flex items-center justify-between">
            <Button
              onClick={() =>
                setShowNotificationToggles(!showNotificationToggles)
              }
              variant="outlinePrimary"
              className="w-42"
            >
              Change Preferences
            </Button>
            {showNotificationToggles && (
              <CustomSwitch
                variant="colored"
                checked={showNotificationPreferences}
                onCheckedChange={setShowNotificationPreferences}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
