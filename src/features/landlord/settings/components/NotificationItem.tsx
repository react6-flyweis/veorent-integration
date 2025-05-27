import type { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface NotificationItemProps {
  title: string;
  description: string;
}

export const NotificationItem: FC<NotificationItemProps> = ({
  title,
  description,
}) => {
  return (
    <Card className="mb-4 py-3 shadow-sm">
      <CardContent className="px-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium">{title}</h3>
            <p className="text-muted-foreground mt-1 text-sm">{description}</p>
            <p className="text-muted-foreground mt-2 text-sm">On: Email</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 bg-blue-50 px-3 text-blue-600 hover:bg-blue-100"
          >
            <Pencil className="mr-1 h-4 w-4" />
            <span className="text-xs font-medium">Edit</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
