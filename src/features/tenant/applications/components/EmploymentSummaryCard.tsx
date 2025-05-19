import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PencilIcon, Trash2Icon } from "lucide-react";
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
  return (
    <Card className="md:w-1/2 max-w-md p-2">
      <CardContent className="px-2 space-y-1 text-sm">
        <p className="font-bold text-primary">{data.employerName}</p>
        <p>
          <strong>Position:</strong> {data.monthStarted}
          {data.yearStarted}
        </p>
        <p>
          <strong>Monthly Income: </strong> {data.monthlyIncome}
        </p>
        <p>
          <strong>Employment Reference:</strong> {data.referenceName}
        </p>
        <p>
          <strong>Phone No:</strong> {data.referenceNumber}
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
