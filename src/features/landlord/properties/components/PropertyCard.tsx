import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StarIcon } from "lucide-react";

import { CurrencyIcon } from "@/components/CurrencyIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
// import { Star } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";

import { ScreenMethodDialog } from "../../dashboard/components/ScreenMethodDialog";

// import { Link } from "react-router";

export function PropertyCard({ property }: { property: IProperty }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const status = useMemo(() => {
    // Check if property has incomplete form status
    const hasIncompleteForm =
      property.formCompletionStatus &&
      !Object.values(property.formCompletionStatus).every(
        (status) => status === true,
      );

    if (hasIncompleteForm) return "incomplete";
    if (property.isMarketing) return "marketing";
    return property.status;
  }, [property.formCompletionStatus, property.isMarketing, property.status]);

  return (
    <Card className="relative gap-0 overflow-hidden p-0">
      <CardHeader>
        {status === "incomplete" && (
          <Badge
            className="absolute top-0 left-0 z-10 bg-orange-500 text-white"
            variant="secondary"
          >
            {t("incomplete")}
          </Badge>
        )}
        {status === "marketing" && (
          <Badge
            className="bg-primary absolute top-0 left-0 z-10 text-white"
            variant="secondary"
          >
            {t("marketing")}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-2">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="">
            <Avatar className="size-24 overflow-hidden rounded-sm">
              <AvatarImage
                src={property.image?.[0]?.img}
                alt={property.name}
                className="object-cover"
              />
              <AvatarFallback className="rounded-sm">N/A</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-1 justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{property.name}</h3>
              <p className="text-muted-foreground text-sm">
                {property.propertyDetails?.streetAddress}
              </p>
              <p>
                {property.propertyDetails?.city},{" "}
                {property.propertyDetails?.region}{" "}
                {property.propertyDetails?.zipCode}
              </p>
              {property.rating && (
                <div className="mt-1 flex">
                  {Array.from({ length: property.rating }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-1 justify-start">
              <div className="">
                <div>
                  <span>{t("bathsBeds")}: </span>
                  <span className="text-sm font-medium text-gray-700">
                    {property.propertySize?.baths}/{property.propertySize?.beds}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{t("rent")}: </span>
                  <CurrencyIcon size="sm" />
                  <span className="text-sm font-medium text-gray-700">
                    {property.leasingBasics?.targetRent}/-
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-0">
        {/* {property.propertyTypeId?.name === "Single Family" ? ( */}
        <div className="grid w-full grid-cols-2 gap-1">
          <Button variant="outline">{t("shareListing")}</Button>

          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(true);
            }}
            variant="outline"
          >
            {t("screenTenant")}
          </Button>
        </div>
        {/* ) : (
          <Link
            className="w-full"
            to={`/landlord/properties/${property._id}/units`}
          >
            <Button className="w-full" variant="outline">
              {t("showUnitsRooms")}
            </Button>
          </Link>
        )} */}
      </CardFooter>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <ScreenMethodDialog />
      </Dialog>
    </Card>
  );
}
