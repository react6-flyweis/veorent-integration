import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User2Icon } from "lucide-react";
import { useState } from "react";

export function ProfilePicture() {
  const [imageUrl, setImageUrl] = useState("/avatar-placeholder.png");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="size-16">
        <AvatarImage src={imageUrl} alt="Profile Photo" />
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
        />
        <Button variant="outlinePrimary">Upload Photo</Button>
      </label>
    </div>
  );
}
