import { useTranslation } from "react-i18next";
import { User2Icon } from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useAlertToast";

import { useUploadProfilePictureMutation } from "../api/mutations";

export function ProfilePicture({ profile }: { profile?: IUser }) {
  const { t } = useTranslation();
  const uploadProfilePictureMutation = useUploadProfilePictureMutation();
  const { showToast } = useToast();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file);

        await uploadProfilePictureMutation.mutateAsync(formData);
        showToast(t("profilePicture.uploadSuccess"), "success");
      } catch {
        showToast(t("profilePicture.uploadFailed"), "error");
      }
    }
  };
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="size-16">
        <AvatarImage
          src={profile?.image || "/avatar-placeholder.png"}
          alt="Profile Photo"
        />
        <AvatarFallback>
          <User2Icon />
        </AvatarFallback>
      </Avatar>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          disabled={uploadProfilePictureMutation.isPending}
          id="profile-picture-input"
        />
        <Button
          variant="outlinePrimary"
          disabled={uploadProfilePictureMutation.isPending}
          onClick={() =>
            document.getElementById("profile-picture-input")?.click()
          }
          type="button"
        >
          {uploadProfilePictureMutation.isPending
            ? t("profilePicture.uploading")
            : t("profilePicture.uploadPhoto")}
        </Button>
      </div>
    </div>
  );
}
