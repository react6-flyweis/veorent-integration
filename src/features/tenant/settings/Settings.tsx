import { useState } from "react";

import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";

import { useGetProfileQuery } from "./api/queries";
import { ChangePasswordForm } from "./components/ChangePasswordForm";
import { NotificationToggle } from "./components/NotificationToggle";
import { ProfileForm } from "./components/ProfileForm";
import { ProfilePicture } from "./components/ProfilePicture";

export default function Settings() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Fetch profile data once at the top level
  const { data: profile, error } = useGetProfileQuery();

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
        <NotificationToggle
          currentPreference={profile?.notificationPreference}
        />
      </div>
    </div>
  );
}
