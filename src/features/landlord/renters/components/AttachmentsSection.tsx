import { DownloadIcon } from "lucide-react";

interface AttachmentCardProps {
  title: string;
  imageUrl?: string;
  onDownload?: () => void;
}

const AttachmentCard: React.FC<AttachmentCardProps> = ({
  title,
  imageUrl,
  onDownload,
}) => {
  return (
    <div className="mb-4 overflow-hidden rounded-lg bg-white shadow">
      <div className="flex items-center justify-between bg-gray-100 p-2">
        <h3 className="font-bold text-black">{title}</h3>
        {onDownload && (
          <button
            onClick={onDownload}
            className="text-gray-600 hover:text-gray-800"
            aria-label={`Download ${title}`}
          >
            <DownloadIcon className="h-5 w-5" />
          </button>
        )}
      </div>
      <div className="p-3">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-auto w-full rounded border object-contain" // Adjust styling as needed
          />
        ) : (
          <p className="text-center text-gray-500">No image available</p>
        )}
      </div>
    </div>
  );
};

export default function AttachmentsSection() {
  const handleDownload = (fileTitle: string) => {
    // Implement actual download logic here
    alert(`Downloading ${fileTitle}...`);
  };

  return (
    <div>
      <AttachmentCard
        title="Driving License"
        onDownload={() => handleDownload("Driving License")}
      />
      <AttachmentCard
        title="National ID Card"
        // No imageUrl provided for this card to show the placeholder
        onDownload={() => handleDownload("National ID Card")}
      />
    </div>
  );
}
