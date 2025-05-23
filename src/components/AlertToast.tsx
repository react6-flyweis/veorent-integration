import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckIcon, XIcon, InfoIcon } from "lucide-react";

interface AlertToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
  type: "success" | "error" | "info";
}

const iconMap = {
  success: CheckIcon,
  error: XIcon,
  info: InfoIcon,
};

const titleMap = {
  success: "Success",
  error: "Error",
  info: "Information",
};

export function AlertToast({
  open,
  onOpenChange,
  message,
  type,
}: AlertToastProps) {
  const IconComponent = iconMap[type];
  const title = titleMap[type];

  if (!open) {
    // Render based on the 'open' prop
    return null;
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="flex h-12 items-center gap-5 rounded-full sm:max-w-md">
        <AlertDialogHeader className="flex flex-row items-center space-x-2">
          <div className="flex size-7 items-center justify-center rounded-full bg-blue-400 p-1">
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>{message}</AlertDialogDescription>
        {/* AlertDialogFooter and AlertDialogAction/AlertDialogCancel can be added if needed */}
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertToast;
