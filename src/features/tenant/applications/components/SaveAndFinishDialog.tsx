import { useTranslation } from "react-i18next";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import castIcon from "../assets/cast.png";

export function SaveAndFinishDialog({ onSuccess }: { onSuccess: () => void }) {
  const { t } = useTranslation();
  return (
    <AlertDialogContent className="max-w-md overflow-hidden rounded-lg p-2">
      <div className="flex flex-col items-center">
        <div className="w-full">
          <div className="mb-4 flex justify-center">
            <img
              src={castIcon}
              alt={t("saveAndFinishDialog.iconAlt") || "TV icon"}
              className="max-h-14 max-w-14"
            />
          </div>
          <AlertDialogHeader className="gap-2">
            <AlertDialogTitle className="text-center text-xl font-bold">
              {t("saveAndFinishDialog.title")}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-gray-600">
              {t("saveAndFinishDialog.description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>

        <AlertDialogFooter className="flex w-full flex-col gap-2 p-0">
          <AlertDialogCancel asChild>
            <Button variant="outlinePrimary">
              {t("saveAndFinishDialog.backToApplication")}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild className="m-0 rounded-none">
            <Button
              className="w-full text-base font-medium"
              onClick={onSuccess}
            >
              {t("saveAndFinishDialog.saveAndFinishLater")}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </div>
    </AlertDialogContent>
  );
}
