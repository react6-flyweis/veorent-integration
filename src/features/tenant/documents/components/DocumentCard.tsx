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
    <Card className="relative p-0 w-full">
      <CardContent className="p-3">
        <div className="flex flex-wrap gap-1 mb-1">
          <span className="text-primary font-bold shrink-0">Date:</span>
          <span className="break-all">{date}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-1">
          <span className="text-primary font-bold shrink-0">Description:</span>
          <span className="break-all">{description}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          <span className="text-primary font-bold shrink-0">File Name:</span>
          <span className="break-all">{name}</span>
        </div>
      </CardContent>
    </Card>
  );
}
