import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";

export function SignatureCard({
  title,
  signer,
  role,
}: {
  title: string;
  signer: string;
  role: string;
}) {
  return (
    <Card className="py-3">
      <CardContent className="px-5 space-y-1">
        <h2 className="text-lg font-bold text-primary">{title}</h2>
        <p className="">
          <span className="font-medium text-primary">{signer}</span>
          <span className="text-muted-foreground text-sm"> ({role}) </span>
        </p>

        <Button variant="default" size="sm" className="p-1! h-fit">
          <PencilIcon className="size-3" />
          <span className="text-xs">Sign</span>
        </Button>

        <div className="">
          <Button variant="link">View</Button>
          <span>|</span>
          <Button variant="link">Download</Button>
          <span>|</span>
          <Button variant="link">Print</Button>
        </div>
      </CardContent>
    </Card>
  );
}
