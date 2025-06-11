import { Link } from "react-router";
import { BedDoubleIcon, BathIcon, CalendarIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ListingProps = {
  data: IProperty;
};

export function RentalListingCard({ data }: ListingProps) {
  return (
    <Card className="flex gap-4 p-3">
      <CardContent className="flex gap-2 p-0">
        <Avatar className="h-24 w-32 rounded-md">
          <AvatarImage
            src={data.image[0].img || "/property.png"}
            alt={data.name}
          />
          <AvatarFallback className="rounded-md">N/A</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 justify-between">
          <div className="">
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {data.propertyTypeId?.name || "N/A"}
              </Badge>
            </div>
            <h3 className="mt-1 text-base font-semibold">{data.name}</h3>
            <p className="text-muted-foreground text-sm">
              {data.addressDetails?.streetAddress}
            </p>

            <div className="text-muted-foreground mt-2 flex gap-4 text-sm">
              <span className="flex items-center gap-1">
                <BedDoubleIcon className="h-4 w-4" /> {data.rentalDetails?.beds}{" "}
                Beds
              </span>
              <span className="flex items-center gap-1">
                <BathIcon className="h-4 w-4" /> {data.rentalDetails?.baths}{" "}
                Baths
              </span>
              <span className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" /> {data.status}
              </span>
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              Landlord:{" "}
              <span className="font-medium">{data.owner.firstname}</span>
            </p>
          </div>
          <div className="flex flex-col">
            <div className="">
              <span className="text-lg font-bold">
                {data.rentalDetails?.targetRent}
              </span>
              <span className="text-lg">/MO</span>
            </div>
            <Button className="rounded-full" size="sm" asChild>
              <Link to={`/tenant/listing/${data._id}`}>View Listing</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
