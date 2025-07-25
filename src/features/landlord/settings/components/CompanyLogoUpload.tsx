import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PlusIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { useToast } from "@/hooks/useAlertToast";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useUploadImageMutation } from "../../api/mutations";
import { useUpdateProfileMutation } from "../api/mutation";

interface CompanyLogoUploadProps {
  currentLogo?: string;
}

export function CompanyLogoUpload({ currentLogo }: CompanyLogoUploadProps) {
  const { t } = useTranslation();
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(
    currentLogo || null,
  );
  const [isUploading, setIsUploading] = useState(false);
  const { mutateAsync: uploadImage } = useUploadImageMutation();
  const { mutateAsync: updateProfile } = useUpdateProfileMutation();
  const { showToast } = useToast();

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      showToast(t("companyLogoUpload.invalidFile"), "error");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      showToast(t("companyLogoUpload.fileSize"), "error");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      // Upload image using ID picture endpoint
      const uploadResponse = await uploadImage(formData);
      const imageUrl = uploadResponse.data.data[0].img;

      // Update profile with the new logo URL
      await updateProfile({
        // Add company logo field - you may need to adjust this based on your API structure
        companyLogo: imageUrl,
      });

      setUploadedLogo(imageUrl);
      showToast(t("companyLogoUpload.success"), "success");
    } catch (error) {
      console.error("Failed to upload logo:", error);
      showToast(getErrorMessage(error), "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveLogo = () => {
    setUploadedLogo(null);
  };

  return (
    <div className="flex-1">
      <FormLabel className="mb-2 block text-lg font-medium">
        {t("companyLogoUpload.label")}
      </FormLabel>

      {uploadedLogo ? (
        <div className="relative">
          <div className="flex h-32 items-center justify-center rounded-md border-2 border-gray-300 p-4 sm:p-6">
            <img
              src={uploadedLogo}
              alt={t("companyLogoUpload.alt")}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
            onClick={handleRemoveLogo}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 z-10 cursor-pointer opacity-0"
            disabled={isUploading}
          />
          <div className="flex h-32 flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-4 transition-colors hover:border-gray-400 sm:p-6">
            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
                <span className="text-sm text-gray-500">
                  {t("companyLogoUpload.uploading")}
                </span>
              </div>
            ) : (
              <>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300">
                  <PlusIcon className="h-5 w-5 text-gray-500" />
                </div>
                <span className="text-sm text-gray-500">
                  {t("companyLogoUpload.add")}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
