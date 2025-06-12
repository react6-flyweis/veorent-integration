import { User2Icon } from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useAlertToast";

import { useUploadProfilePictureMutation } from "../api/mutations";

export function ProfilePicture({ profile }: { profile?: IUser }) {
  const uploadProfilePictureMutation = useUploadProfilePictureMutation();
  const { showToast } = useToast();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file);

        await uploadProfilePictureMutation.mutateAsync(formData);
        showToast("Profile picture updated successfully", "success");
      } catch {
        showToast("Failed to upload profile picture", "error");
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
      <label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          disabled={uploadProfilePictureMutation.isPending}
        />
        <Button
          variant="outlinePrimary"
          disabled={uploadProfilePictureMutation.isPending}
        >
          {uploadProfilePictureMutation.isPending
            ? "Uploading..."
            : "Upload Photo"}
        </Button>
      </label>
    </div>
  );
}
