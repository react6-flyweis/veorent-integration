import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
// import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CurrencyIcon } from "@/components/CurrencyIcon";
import { Dialog } from "@/components/ui/dialog";
import { ScreenMethodDialog } from "../../dashboard/components/ScreenMethodDialog";
import { useMemo, useState } from "react";
// import { Link } from "react-router";

export function PropertyCard({ property }: { property: IProperty }) {
  const [isOpen, setIsOpen] = useState(false);

  const isIncomplete = useMemo(() => {
    return (
      property.formCompletionStatus &&
      !Object.values(property.formCompletionStatus).every(
        (status) => status === true,
      )
    );
  }, [property.formCompletionStatus]);

  const status = useMemo(() => {
    if (property.formCompletionStatus)
      return isIncomplete ? "incomplete" : "marketing";
    return property.status;
  }, [property, isIncomplete]);

  return (
    <Card className="relative gap-0 overflow-hidden p-0">
      <CardHeader>
        {status === "incomplete" && (
          <Badge
            className="absolute top-0 left-0 bg-orange-500 text-white"
            variant="secondary"
          >
            Incomplete
          </Badge>
        )}
        {status === "marketing" && (
          <Badge
            className="bg-primary absolute top-0 left-0 text-white"
            variant="secondary"
          >
            Marketing
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-2">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="">
            <img
              src={property.image[0]?.img}
              alt={property.name}
              className="size-24 rounded object-cover"
            />
          </div>
          <div className="flex flex-1 justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{property.name}</h3>
              <p className="text-muted-foreground text-sm">
                {property.addressDetails?.streetAddress}
              </p>
              <p>
                {property.addressDetails?.city},{" "}
                {property.addressDetails?.region}{" "}
                {property.addressDetails?.zipCode}
              </p>
              {/* {property.rating && (
                <div className="mt-1 flex">
                  {Array.from({ length: property.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              )} */}
            </div>
            <div className="flex flex-1 justify-start">
              {property.propertyTypeId?.name === "Single Family" && (
                <div className="">
                  <div>
                    <span>Baths/Beds: </span>
                    <span className="text-sm font-medium text-gray-700">
                      {property.propertySize?.baths}/
                      {property.propertySize?.beds}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Rent: </span>
                    <CurrencyIcon size="sm" />
                    <span className="text-sm font-medium text-gray-700">
                      {property.leasingBasics?.targetRent}/-
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-0">
        {/* {property.propertyTypeId?.name === "Single Family" ? ( */}
        <div className="grid w-full grid-cols-2 gap-1">
          <Button variant="outline">Share Listing</Button>

          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(true);
            }}
            variant="outline"
          >
            Screen Tenant
          </Button>
        </div>
        {/* ) : (
          <Link
            className="w-full"
            to={`/landlord/properties/${property._id}/units`}
          >
            <Button className="w-full" variant="outline">
              Show Units & Rooms
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
