import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { Loader } from "@/components/Loader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { getInitial } from "@/utils/name";

import { useGetLandlordsForUserQuery } from "../../api/queries";

interface LandlordCardProps {
  className?: string;
}

export function LandlordCard({ className }: LandlordCardProps) {
  const { t } = useTranslation();

  const { data: landlords, isLoading, error } = useGetLandlordsForUserQuery();

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center p-8">
          <Loader />
        </CardContent>
      </Card>
    );
  }

  if (error || !landlords || landlords.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <div className="space-y-2">
            <CardTitle className="text-muted-foreground">
              {t("noLandlordFound")}
            </CardTitle>
            <CardDescription>{t("noLandlordsAssigned")}</CardDescription>
          </div>
        </CardContent>
      </Card>
    );
  }

  // For now, show the first landlord. In the future, this could be enhanced
  // to show multiple landlords or allow selection
  const landlord = landlords[0];

  return (
    <Card className={`gap-0 p-0 ${className}`}>
      <CardContent className="flex items-center space-x-4 p-5">
        <Avatar className="h-12 w-12">
          <AvatarImage src={landlord.image || ""} alt={landlord.firstname} />
          <AvatarFallback>
            {getInitial((landlord.firstname || "") + (landlord.lastname || ""))}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <CardDescription className="font-bold uppercase">
            {t("landlord")}
          </CardDescription>
          <CardTitle className="text-primary">
            {landlord.firstname} {landlord.lastname}
          </CardTitle>
          <CardDescription>{landlord.email}</CardDescription>
        </div>
      </CardContent>
      <CardFooter className="px-0">
        <div className="grid w-full grid-cols-3">
          <Button variant="outline" asChild>
            <Link to={`mailto:${landlord.email}`}>{t("email")}</Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">{t("call")}</Button>
            </AlertDialogTrigger>
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
          <Button variant="outline" asChild>
            <Link to="/tenant/messages">{t("message")}</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
