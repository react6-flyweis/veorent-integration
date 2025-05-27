import React, { useRef, useState } from "react";
import picturesIcon from "@/assets/icons/pictures.png";
import { X } from "lucide-react";

type ImageUploadProps = {
  value?: (File | string)[];
  onChange: (files: (File | string)[]) => void;
  accept?: string[];
  maxSize?: number; // in MB
  maxFiles?: number;
  className?: string;
  dragPrompt?: string;
  variant?: "default" | "small";
};

export const ImageUpload = ({
  value = [],
  onChange,
  accept = ["image/jpeg", "image/png", "image/gif", "image/webp"],
  maxSize = 5, // Default 5MB
  maxFiles = 1,
  className = "",
  dragPrompt = "CLICK OR DRAG TO UPLOAD IMAGES",
  variant = "default",
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<Record<number, string>>({});

  // Check if max files limit is reached
  const isMaxFilesReached = value.length >= maxFiles;

  // Helper to check if an item is a File or string URL
  const isFile = (item: File | string): item is File => {
    return item instanceof File;
  };

  // Create or retrieve image preview URL
  const getImagePreview = (item: File | string, index: number) => {
    if (previewUrls[index]) {
      return previewUrls[index];
    }

    const url = isFile(item) ? URL.createObjectURL(item) : item;
    setPreviewUrls((prev) => ({ ...prev, [index]: url }));
    return url;
  };

  // Clean up object URLs on component unmount
  React.useEffect(() => {
    return () => {
      Object.values(previewUrls).forEach((url) => {
        // Only revoke blob URLs created by this component
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previewUrls]);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles || isMaxFilesReached) return;

    const filesArray = Array.from(newFiles);
    const validFiles = filesArray.filter((file) => {
      // Check if file is an image
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        console.error(`File ${file.name} is not an image`);
        return false;
      }

      // Check file size (convert MB to bytes)
      const isValidSize = file.size <= maxSize * 1024 * 1024;
      if (!isValidSize) {
        console.error(
          `File ${file.name} exceeds the maximum size of ${maxSize}MB`,
        );
        return false;
      }

      return true;
    });

    // Limit number of files, preserving string URLs
    const combinedFiles = [...value, ...validFiles].slice(0, maxFiles);
    onChange(combinedFiles);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemoveFile = (indexToRemove: number) => {
    // If removing a File object, revoke its Object URL to prevent memory leaks
    if (previewUrls[indexToRemove]?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrls[indexToRemove]);
    }

    // Remove from preview URLs
    const newPreviewUrls = { ...previewUrls };
    delete newPreviewUrls[indexToRemove];
    setPreviewUrls(newPreviewUrls);

    // Remove from value
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-2">
      <div
        className={`relative ${className} ${
          isMaxFilesReached ? "pointer-events-none opacity-50" : ""
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <label
          htmlFor="image-upload"
          className={`block w-full ${
            isMaxFilesReached ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={(e) => {
            if (isMaxFilesReached) {
              e.preventDefault();
              return;
            }
            // Do NOT call fileInputRef.current?.click() here, as the htmlFor will handle it
          }}
        >
          <input
            ref={fileInputRef}
            id="image-upload"
            type="file"
            accept={accept.join(",")}
            className="hidden"
            multiple={maxFiles > 1}
            onChange={(e) => handleFiles(e.target.files)}
            disabled={isMaxFilesReached}
          />
          <div
            className={`flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-6 transition-colors ${
              dragActive ? "border-primary bg-primary/5" : ""
            } ${variant === "small" ? "h-24" : "h-40"}`}
          >
            <img
              src={picturesIcon}
              className={`${variant === "small" ? "size-6" : "size-10"}`}
              alt="Upload Images"
            />
            <span
              className={`text-muted-foreground text-center ${
                variant === "small" ? "text-sm" : "text-lg"
              }`}
            >
              {isMaxFilesReached
                ? `Maximum ${maxFiles} image${maxFiles > 1 ? "s" : ""} reached`
                : dragPrompt}
            </span>
          </div>
        </label>
      </div>

      {value.length > 0 && (
        <div className="mt-2 space-y-2">
          <p className="text-muted-foreground text-sm">
            Uploaded images ({value.length}/{maxFiles}):
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {value.map((item, index) => {
              const isFileItem = isFile(item);
              const fileName = isFileItem
                ? item.name
                : item.split("/").pop() || "image";
              const fileSize = isFileItem
                ? `(${(item.size / (1024 * 1024)).toFixed(2)} MB)`
                : "";

              return (
                <div
                  key={`${fileName}-${index}`}
                  className="group relative aspect-square overflow-hidden rounded-md border"
                >
                  <img
                    src={getImagePreview(item, index)}
                    alt={fileName}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="w-full truncate text-xs text-white">
                      {fileName}
                      <span className="ml-1">{fileSize}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="absolute top-1 right-1 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
