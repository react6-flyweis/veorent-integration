import { useTranslation } from "react-i18next";
import { PencilIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import type { IEmployer } from "./EmployerEditor";

export function EmployerSummaryCard({
  data,
  onEdit,
  onDelete,
}: {
  data: IEmployer;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { t } = useTranslation();
  return (
    <Card className="max-w-md p-2 md:w-1/2">
      <CardContent className="space-y-1 px-2 text-sm">
        <p className="text-primary font-bold">{data.employerName}</p>
        <p>
          <strong>{t("employment.position")}:</strong> {data.position}
        </p>
        <p>
          <strong>{t("employment.startDate")}:</strong> {data.monthStarted}{" "}
          {data.yearStarted}
        </p>
        <p>
          <strong>{t("employment.monthlyIncome")}:</strong> {data.monthlyIncome}
        </p>
        <p>
          <strong>{t("employment.referenceName")}:</strong> {data.referenceName}
        </p>
        <p>
          <strong>{t("employment.referenceNumber")}:</strong>{" "}
          {data.referenceNumber}
        </p>
        <div className="flex justify-between pt-2">
          <Button
            type="button"
            className="flex items-center"
            variant="outline"
            size="sm"
            onClick={onEdit}
          >
            <PencilIcon />
            <span> {t("edit")}</span>
          </Button>
          <Button
            type="button"
            className="flex items-center"
            variant="secondary"
            size="sm"
            onClick={onDelete}
          >
            <Trash2Icon />
            <span>{t("delete")}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
