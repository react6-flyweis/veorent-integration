import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { IAddress } from "./AddressEditor";
import { PencilIcon, Trash2Icon } from "lucide-react";

export function AddressSummaryCard({
  address,
  onEdit,
  onDelete,
}: {
  address: IAddress;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Card className="md:w-1/2 max-w-md p-2">
      <CardContent className="px-2 space-y-1 text-sm">
        <p className="font-bold text-primary">
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
            <span> Edit</span>
          </Button>
          <Button
            type="button"
            className="flex items-center"
            variant="secondary"
            size="sm"
            onClick={onDelete}
          >
            <Trash2Icon />
            <span>Delete</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
