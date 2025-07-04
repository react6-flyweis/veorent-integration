import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { BedDoubleIcon, BathIcon, CalendarIcon, HouseIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type ListingProps = {
  data: IProperty;
};

export function RentalListingCard({ data }: ListingProps) {
  const { t } = useTranslation();
  return (
    <Card className="flex gap-4 p-3">
      <CardContent className="flex gap-2 p-0">
        <Avatar className="h-24 w-32 rounded-md">
          <AvatarImage
            src={data.image[0].img || "/property.png"}
            alt={data.name}
          />
          <AvatarFallback className="rounded-md">
            <HouseIcon className="size-6" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-1 justify-between">
          <div className="">
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {data.propertyTypeId?.name || t("listingCard.na")}
              </Badge>
            </div>
            <h3 className="mt-1 text-base font-semibold">{data.name}</h3>
            <p className="text-muted-foreground text-sm">
              {data.addressDetails?.streetAddress}
            </p>

            <div className="text-muted-foreground mt-2 flex gap-4 text-sm">
              <span className="flex items-center gap-1">
                <BedDoubleIcon className="h-4 w-4" /> {data.rentalDetails?.beds}{" "}
                {t("listingCard.beds")}
              </span>
              <span className="flex items-center gap-1">
                <BathIcon className="h-4 w-4" /> {data.rentalDetails?.baths}{" "}
                {t("listingCard.baths")}
              </span>
              <span className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" /> {data.status}
              </span>
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              {t("listingCard.landlord")}{" "}
              <span className="font-medium">{data.owner.firstname}</span>
            </p>
          </div>
          <div className="flex flex-col">
            <div className="">
              <span className="text-lg font-bold">
                {data.rentalDetails?.targetRent}
              </span>
              <span className="text-lg">{t("listingCard.perMonth")}</span>
            </div>
            <Button className="rounded-full" size="sm" asChild>
              <Link to={`/tenant/listing/${data._id}`}>
                {t("listingCard.viewListing")}
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export const ListingCardSkeleton = () => (
  <div className="flex gap-4 rounded-lg border p-3">
    <Skeleton className="h-24 w-32 rounded-md" />
    <div className="flex flex-1 justify-between">
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-36" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-3 w-32" />
      </div>
      <div className="flex flex-col items-end space-y-2">
        <div className="space-y-1">
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </div>
  </div>
);
