import React, { useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Photo {
  img: string;
}

interface PhotoGalleryProps {
  images: Photo[];
  isOpen: boolean;
  onClose: () => void;
}

export function PhotoGallery({ images, isOpen, onClose }: PhotoGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  // When gallery opens, start with the first image in slider view
  React.useEffect(() => {
    if (isOpen) {
      setSelectedImageIndex(0);
    }
  }, [isOpen]);

  const closeImageViewer = useCallback(() => {
    setSelectedImageIndex(null);
    onClose();
  }, [onClose]);

  const goToPrevious = useCallback(() => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  }, [selectedImageIndex]);

  const goToNext = useCallback(() => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  }, [selectedImageIndex, images.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (e.key === "ArrowLeft") {
          goToPrevious();
        } else if (e.key === "ArrowRight") {
          goToNext();
        } else if (e.key === "Escape") {
          closeImageViewer();
        }
      }
    },
    [selectedImageIndex, goToPrevious, goToNext, closeImageViewer],
  );

  React.useEffect(() => {
    if (selectedImageIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedImageIndex, handleKeyDown]);

  return (
    <Dialog
      open={isOpen && selectedImageIndex !== null}
      onOpenChange={closeImageViewer}
    >
      <DialogContent className="max-w-7xl gap-0 overflow-hidden bg-white p-0">
        <div className="relative h-full">
          {/* Header */}
          <div className="absolute top-0 right-0 left-0 z-10 flex items-center justify-between border-b bg-white/95 px-3 text-gray-800 backdrop-blur-sm">
            <div className="text-base font-medium">
              {selectedImageIndex !== null && (
                <>
                  {selectedImageIndex + 1} of {images.length}
                </>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeImageViewer}
              className="text-gray-800 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Image Container */}
          <div className="relative h-[calc(98vh-120px)] w-full bg-gray-50">
            {selectedImageIndex !== null && (
              <img
                src={images[selectedImageIndex].img}
                alt={`Property photo ${selectedImageIndex + 1}`}
                className="h-full w-full object-contain"
              />
            )}

            {/* Navigation Buttons */}
            {selectedImageIndex !== null && selectedImageIndex > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="absolute top-1/2 left-4 h-12 w-12 -translate-y-1/2 rounded-full bg-white/80 text-gray-800 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-white/90"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            )}

            {selectedImageIndex !== null &&
              selectedImageIndex < images.length - 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToNext}
                  className="absolute top-1/2 right-4 h-12 w-12 -translate-y-1/2 rounded-full bg-white/80 text-gray-800 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-white/90"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              )}
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute right-0 bottom-0 left-0 border-t bg-white/95 p-3 backdrop-blur-sm">
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((photo, index) => (
                <div
                  key={index}
                  className={`relative h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded border-2 transition-all ${
                    index === selectedImageIndex
                      ? "border-blue-500 shadow-md"
                      : "border-gray-300 hover:border-blue-300"
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={photo.img}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
