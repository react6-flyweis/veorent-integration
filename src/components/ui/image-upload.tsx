import React, { useRef, useState } from "react";
import picturesIcon from "@/assets/icons/pictures.png";
import { X } from "lucide-react";

type ImageUploadProps = {
  value: File[];
  onChange: (files: File[]) => void;
  accept?: string[];
  maxSize?: number; // in MB
  maxFiles?: number;
  className?: string;
  dragPrompt?: string;
};

export const ImageUpload = ({
  value = [],
  onChange,
  accept = ["image/jpeg", "image/png", "image/gif", "image/webp"],
  maxSize = 5, // Default 5MB
  maxFiles = 1,
  className = "",
  dragPrompt = "CLICK OR DRAG TO UPLOAD IMAGES",
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // Check if max files limit is reached
  const isMaxFilesReached = value.length >= maxFiles;

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

    // Limit number of files
    const combinedFiles = [...value, ...validFiles].slice(0, maxFiles);
    onChange(combinedFiles);
  };

  // Create image preview URL
  const getImagePreview = (file: File) => {
    return URL.createObjectURL(file);
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
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-2">
      <div
        className={`relative ${className} ${isMaxFilesReached ? "pointer-events-none opacity-50" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <label
          htmlFor="image-upload"
          className={`block w-full ${isMaxFilesReached ? "cursor-not-allowed" : "cursor-pointer"}`}
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
            className={`flex h-40 flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-6 transition-colors ${dragActive ? "border-primary bg-primary/5" : ""} `}
          >
            <img src={picturesIcon} className="size-10" alt="Upload Images" />
            <span className="text-muted-foreground text-center text-lg">
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
            {value.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="group relative aspect-square overflow-hidden rounded-md border"
              >
                <img
                  src={getImagePreview(file)}
                  alt={file.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="w-full truncate text-xs text-white">
                    {file.name}
                    <span className="ml-1">
                      ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
