import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatDate } from "@/utils/formatDate";
import { getInitial } from "@/utils/name";

export function TenantCard({ tenant }: { tenant: ITenant }) {
  const { t } = useTranslation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const formattedAddress = useMemo(() => {
    return [
      tenant.propertyDetails.streetAddress,
      tenant.propertyDetails.unitNumber &&
        `Unit ${tenant.propertyDetails.unitNumber}`,
      "Na",
    ]
      .filter(Boolean)
      .join(", ");
  }, [tenant]);

  const statusText = useMemo(() => {
    if (tenant.createdAt) {
      return `${t("invitedToPortal")} ${formatDate(tenant.createdAt)}`;
    }
    if (tenant.updatedAt) {
      return `${t("lastActive")} ${formatDate(tenant.updatedAt)}`;
    }
    return "";
  }, [tenant, t]);

  return (
    <Card className="gap-0 p-0">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={tenant.document.photo} alt={tenant.fullName} />
            <AvatarFallback>{getInitial(tenant.fullName)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {tenant.fullName}
            </h3>
            <p className="text-sm text-gray-500">{statusText}</p>
            <p className="mt-0.5 text-sm text-gray-700">{formattedAddress}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-3 p-0">
        <Button onClick={(e) => e.preventDefault()} variant="outline" size="sm">
          {t("email")}
        </Button>

        <Button
          onClick={(e) => {
            e.preventDefault();
            setDialogOpen(true);
          }}
          variant="outline"
          size="sm"
        >
          {t("call")}
        </Button>

        <Button variant="outline" size="sm" asChild>
          <Link to="/landlord/messages" state={{ tenant }}>
            {t("message")}
          </Link>
        </Button>
      </CardFooter>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              {t("mobileAppFeature")}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className="w-full justify-center!">
            <AlertDialogAction>{t("clickHere")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
