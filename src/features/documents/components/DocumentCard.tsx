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
  return (
    <Card className="p-0">
      <CardContent className="p-3">
        <div className="space-x-2">
          <span className="font-bold text-primary">Date:</span>
          <span className="">{date}</span>
        </div>
        <div className="space-x-2">
          <span className="font-bold text-primary">Description:</span>
          <span className="">{description}</span>
        </div>
        <div className="space-x-2">
          <span className="font-bold text-primary">File Name:</span>
          <span className="truncate">{name}</span>
        </div>
      </CardContent>
    </Card>
  );
}
