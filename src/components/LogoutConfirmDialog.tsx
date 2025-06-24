import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LogoutConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function LogoutConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
}: LogoutConfirmDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Are You Sure Want To Logout ?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-center gap-4 sm:justify-center">
          <Button
            type="button"
            variant="default"
            className="bg-primary hover:bg-primary/90 w-32 text-white"
            onClick={onConfirm}
          >
            {t("yes")}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-32"
            onClick={() => onOpenChange(false)}
          >
            {t("no")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
