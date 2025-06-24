import { useTranslation } from "react-i18next";
import { PencilIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import type { IAddress } from "./AddressEditor";

export function AddressSummaryCard({
  address,
  onEdit,
  onDelete,
}: {
  address: IAddress;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { t } = useTranslation();
  return (
    <Card className="max-w-md p-2 md:w-1/2">
      <CardContent className="space-y-1 px-2 text-sm">
        <p className="text-primary font-bold">
          {address.streetAddress}, {address.city}, {address.region},{" "}
          {address.zipCode}
        </p>
        <p>
          <strong>Type:</strong> {address.residenceType}
        </p>
        <p>
          <strong>Moved In:</strong> {address.monthMovedIn}
          {address.yearMovedIn}
        </p>
        <p>
          <strong>Landlord:</strong> {address.landlordName}
        </p>
        <p>
          <strong>Phone No:</strong> {address.landlordPhone}
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
