import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/components/ui/card";

export function DocumentCard({
  date,
  description,
  name,
}: {
  date: string;
  description: string;
  name: string;
}) {
  const { t } = useTranslation();

  return (
    <Card className="relative w-full p-0">
      <CardContent className="p-3">
        <div className="mb-1 flex flex-wrap gap-1">
          <span className="text-primary shrink-0 font-bold">{t("date")}:</span>
          <span className="break-all">{date}</span>
        </div>
        <div className="mb-1 flex flex-wrap gap-1">
          <span className="text-primary shrink-0 font-bold">
            {t("description")}:
          </span>
          <span className="break-all">{description}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          <span className="text-primary shrink-0 font-bold">
            {t("fileName")}:
          </span>
          <span className="break-all">{name}</span>
        </div>
      </CardContent>
    </Card>
  );
}
