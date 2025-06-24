import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ScreenMethodDialog() {
  const { t } = useTranslation();

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-center text-2xl font-bold">
          {t("howToScreenTenant")}
        </DialogTitle>
      </DialogHeader>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {[
          {
            title: t("rentalApplicationScreening"),
            description: t("loremIpsumDescription"),
            buttonText: t("inviteToApply").toUpperCase(),
            path: "/landlord/invite",
            isRecommended: true,
          },
          {
            title: t("screeningReportOnly"),
            description: t("loremIpsumDescription"),
            buttonText: t("requestReport"),
            path: "/landlord/screen",
          },
        ].map((item, index) => (
          <Card
            className="relative justify-between gap-2 bg-blue-200 py-4"
            key={index}
          >
            {item.isRecommended && (
              <div className="absolute top-0 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                <Badge
                  variant="secondary"
                  className="bg-orange-500 text-white hover:bg-orange-600"
                >
                  {t("recommended")}
                </Badge>
              </div>
            )}
            <CardContent className="flex flex-col px-3 text-center">
              <h3 className="mb-3 flex-1 text-lg font-semibold">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button className="w-full" asChild>
                <Link to={item.path}>{item.buttonText}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <p className="text-muted-foreground mt-4 text-center text-sm">
        {t("loremIpsumDescription")}
      </p>
    </DialogContent>
  );
}
