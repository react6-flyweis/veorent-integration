import { PageTitle } from "@/components/PageTitle";
import { ProfileForm } from "./components/ProfileForm";
import { ProfilePicture } from "./components/ProfilePicture";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChangePasswordForm } from "./components/ChangePasswordForm";
import { CustomSwitch } from "@/components/ui/custom-switch";

export default function Settings() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showNotificationToggles, setShowNotificationToggles] = useState(false);
  const [showNotificationPreferences, setShowNotificationPreferences] =
    useState(false);

  return (
    <div className="space-y-5">
      <PageTitle title="Account Settings" />
      <div className="space-y-4">
        <ProfilePicture />
        <h2 className="text-primary text-lg font-semibold">My Information</h2>
        <ProfileForm />
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
            <ChangePasswordForm onClose={() => setShowPasswordForm(false)} />
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
