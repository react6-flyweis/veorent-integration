import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BedDoubleIcon, BathIcon, CalendarIcon } from "lucide-react";

type ListingProps = {
  data: {
    type: string;
    title: string;
    address: string;
    beds: number;
    baths: number;
    available: string;
    price: string;
    landlord: string;
    imageUrl: string;
  };
};

export function RentalListingCard({ data }: ListingProps) {
  return (
    <Card className="flex gap-4 p-3">
      <CardContent className="flex p-0 gap-2">
        <img
          src={data.imageUrl}
          alt={data.title}
          className="w-32 h-24 rounded-md object-cover"
        />
        <div className="flex justify-between flex-1">
          <div className="">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{data.type}</Badge>
            </div>
            <h3 className="font-semibold text-base mt-1">{data.title}</h3>
            <p className="text-sm text-muted-foreground">{data.address}</p>

            <div className="flex gap-4 text-sm mt-2 text-muted-foreground">
              <span className="flex items-center gap-1">
                <BedDoubleIcon className="w-4 h-4" /> {data.beds} Beds
              </span>
              <span className="flex items-center gap-1">
                <BathIcon className="w-4 h-4" /> {data.baths} Baths
              </span>
              <span className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" /> {data.available}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Landlord: <span className="font-medium">{data.landlord}</span>
            </p>
          </div>
          <div className="flex flex-col">
            <div className="">
              <span className="text-lg font-bold">{data.price}</span>
              <span className="text-lg ">/MO</span>
            </div>
            <Button className="rounded-full" size="sm">
              View Listing
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
