import { useTranslation } from "react-i18next";
import { PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function SignatureCard({
  title,
  signer,
  role,
}: {
  title: string;
  signer: string;
  role: string;
}) {
  const { t } = useTranslation();

  return (
    <Card className="py-3">
      <CardContent className="space-y-1 px-5">
        <h2 className="text-primary text-lg font-bold">{title}</h2>
        <p className="">
          <span className="text-primary font-medium">{signer}</span>
          <span className="text-muted-foreground text-sm"> ({role}) </span>
        </p>

        <Button variant="default" size="sm" className="h-fit p-1!">
          <PencilIcon className="size-3" />
          <span className="text-xs">Sign</span>
        </Button>

        <div className="">
          <Button variant="link">{t("view")}</Button>
          <span>|</span>
          <Button variant="link">{t("download")}</Button>
          <span>|</span>
          <Button variant="link">Print</Button>
        </div>
      </CardContent>
    </Card>
  );
}
