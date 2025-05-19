import { PageTitle } from "@/components/PageTitle";
import { ProfileForm } from "./components/ProfileForm";
import { ProfilePicture } from "./components/ProfilePicture";
import { Button } from "@/components/ui/button";

export default function Settings() {
  return (
    <div className="space-y-5">
      <PageTitle title="Account Settings" />
      <div className="space-y-3">
        <ProfilePicture />
        <h2 className="text-lg font-semibold text-primary">My Information</h2>
        <ProfileForm />
        <div>
          <h2 className="text-xl font-semibold text-primary mb-1">Password</h2>
          <Button variant="outlinePrimary" className="w-42">
            Change Password
          </Button>
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-primary">
            Notification Preferences
          </h2>
          <p className="text-muted-foreground">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam,
            repudiandae consequuntur soluta dolore, cum odio, sunt fugiat
            explicabo voluptates molestiae quo tenetur! Veritatis laborum quod
            facilis deleniti numquam, ipsa libero.
          </p>
          <Button variant="outlinePrimary" className="w-42">
            Change Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}
