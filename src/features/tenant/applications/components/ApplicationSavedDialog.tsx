import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import checkIcon from "../assets/check.gif";
import { Link } from "react-router";

interface ApplicationSavedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApplicationSavedDialog({
  open,
  onOpenChange,
}: ApplicationSavedDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-xs overflow-hidden rounded-lg p-6">
        <div className="flex flex-col items-center">
          <img src={checkIcon} alt="Check Icon" className="max-h-12 max-w-12" />
          <AlertDialogHeader className="gap-2">
            <AlertDialogTitle className="text-center text-xl font-semibold">
              Application Saved
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-sm text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-4 flex w-full flex-col gap-2 p-0">
            <AlertDialogAction asChild>
              <Button variant="outlinePrimary" className="w-full" asChild>
                <Link to="/tenant">Done</Link>
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
