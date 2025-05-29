import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconRound } from "@/components/IconRound";
import { Card, CardContent } from "@/components/ui/card";

// Using an existing icon that could represent publish listing
import listingIcon from "../assets/listing-title.png";

interface PublishListingFormProps {
  onSuccess: () => void;
  onSaveDraft?: () => void;
  address?: string;
}

export const PublishListingForm = ({
  onSuccess,
  onSaveDraft,
  address = "123 Main St.",
}: PublishListingFormProps) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSuccess();
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (onSaveDraft) onSaveDraft();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        <IconRound icon={listingIcon} size="sm" />
        <h2 className="text-xl font-semibold text-gray-800">Publish Listing</h2>
      </div>

      <Card className="mb-8 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
                <path d="M16.5 9.4 7.55 4.24"></path>
                <polyline points="3.29 7 12 12 20.71 7"></polyline>
                <line x1="12" y1="22" x2="12" y2="12"></line>
                <circle cx="18.5" cy="15.5" r="2.5"></circle>
                <path d="M20.27 17.27 22 19"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-medium">{address}</h3>
              <p className="text-sm text-gray-500">
                Your property is ready to be published
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Button
          variant="outline"
          className="w-full sm:w-60"
          onClick={handleSaveDraft}
          disabled={isSaving || isPublishing}
        >
          {isSaving ? "Saving..." : "Save & Publish Later"}
        </Button>
        <Button
          className="w-full sm:w-60"
          onClick={handlePublish}
          disabled={isSaving || isPublishing}
        >
          {isPublishing ? "Publishing..." : "Publish My Listing"}
        </Button>
      </div>
    </div>
  );
};
