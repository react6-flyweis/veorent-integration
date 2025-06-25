import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { useGoBack } from "@/hooks/useGoBack";

export default function NotFound() {
  const { t } = useTranslation();
  const goBack = useGoBack();
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <h1 className="text-primary mb-4 text-6xl font-bold">404</h1>
      <h2 className="mb-2 text-2xl font-semibold text-gray-800">
        {t("pageNotFound")}
      </h2>
      <p className="text-muted-foreground mb-6">
        {t("pageNotFoundDescription")}
      </p>
      <Button onClick={goBack}>{t("back")}</Button>
    </div>
  );
}
