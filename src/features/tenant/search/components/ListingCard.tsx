import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BedDoubleIcon, BathIcon, CalendarIcon } from "lucide-react";
import { Link } from "react-router";

type ListingProps = {
  data: {
    id: string;
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
      <CardContent className="flex gap-2 p-0">
        <img
          src={data.imageUrl}
          alt={data.title}
          className="h-24 w-32 rounded-md object-cover"
        />
        <div className="flex flex-1 justify-between">
          <div className="">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{data.type}</Badge>
            </div>
            <h3 className="mt-1 text-base font-semibold">{data.title}</h3>
            <p className="text-muted-foreground text-sm">{data.address}</p>

            <div className="text-muted-foreground mt-2 flex gap-4 text-sm">
              <span className="flex items-center gap-1">
                <BedDoubleIcon className="h-4 w-4" /> {data.beds} Beds
              </span>
              <span className="flex items-center gap-1">
                <BathIcon className="h-4 w-4" /> {data.baths} Baths
              </span>
              <span className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" /> {data.available}
              </span>
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              Landlord: <span className="font-medium">{data.landlord}</span>
            </p>
          </div>
          <div className="flex flex-col">
            <div className="">
              <span className="text-lg font-bold">{data.price}</span>
              <span className="text-lg">/MO</span>
            </div>
            <Button className="rounded-full" size="sm" asChild>
              <Link to={"/tenant/listing/" + data.id}>View Listing</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
