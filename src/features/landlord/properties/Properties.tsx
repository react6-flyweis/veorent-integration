import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { PageTitle } from "@/components/PageTitle";
import { HouseIcon, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CurrencyIcon } from "@/components/CurrencyIcon";
import { Link } from "react-router";

type PropertyType = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  image: string;
  baths?: number;
  beds?: number;
  rent?: number;
  rating?: number;
  status?: "complete" | "incomplete" | "marketing";
  type?: "single" | "multi";
};

export default function Properties() {
  const properties: PropertyType[] = [
    {
      id: "1",
      name: "Ft. Collins Home",
      address: "700 H St",
      city: "Ft Collins",
      state: "CO",
      zipCode: "80992",
      image: "/property.png",
      baths: 2,
      beds: 3,
      rent: 900,
      rating: 5,
      status: "marketing",
      type: "single",
    },
    {
      id: "2",
      name: "46 Bryant Way",
      address: "46 Bryant Way",
      city: "Denver",
      state: "CO",
      zipCode: "80219",
      image: "/property.png",
      baths: 2,
      beds: 2,
      rent: 800,
      type: "single",
    },
    {
      id: "3",
      name: "Family House in Santa Barbara",
      address: "2100 Circle Drive",
      city: "Santa Barbara",
      state: "CO",
      zipCode: "87692",
      image: "/property.png",
      baths: 1,
      beds: 2,
      rent: 750,
      status: "incomplete",
      type: "single",
    },
    {
      id: "4",
      name: "Multi-family House",
      address: "123 Main St",
      city: "Denver",
      state: "CO",
      zipCode: "80033",
      image: "/property.png",
      type: "multi",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <PageTitle title="Properties" />
      </div>
      <div className="flex flex-col gap-4">
        {properties.map((property) => (
          <Link to={`/landlord/properties/${property.id}`} key={property.id}>
            <PropertyCard property={property} />
          </Link>
        ))}
      </div>

      <Link to="/landlord/properties/add">
        <Button
          className="py- mt-6 flex h-24 w-full flex-col items-center justify-center gap-2"
          variant="outline"
        >
          <HouseIcon className="size-7" />
          <span className="font-medium tracking-wide uppercase">
            Add Property
          </span>
        </Button>
      </Link>
    </div>
  );
}

function PropertyCard({ property }: { property: PropertyType }) {
  return (
    <Card className="relative gap-0 overflow-hidden p-0">
      <CardHeader>
        {property.status === "incomplete" && (
          <Badge
            className="absolute top-0 left-0 bg-orange-500 text-white"
            variant="secondary"
          >
            Incomplete
          </Badge>
        )}
        {property.status === "marketing" && (
          <Badge
            className="absolute top-0 left-0 bg-blue-500 text-white"
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
              src={property.image}
              alt={property.name}
              className="size-24 rounded object-cover"
            />
          </div>
          <div className="flex flex-1 justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{property.name}</h3>
              <p className="text-muted-foreground text-sm">
                {property.address}
              </p>
              <p>
                {property.city}, {property.state} {property.zipCode}
              </p>
              {property.rating && (
                <div className="mt-1 flex">
                  {Array.from({ length: property.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-1 justify-start">
              {property.type === "single" && (
                <div className="">
                  <div>
                    <span>Baths/Beds: </span>
                    <span className="text-sm font-medium text-gray-700">
                      {property.baths}/{property.beds}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Rent: </span>
                    <CurrencyIcon size="sm" />
                    <span className="text-sm font-medium text-gray-700">
                      {property.rent}/-
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-0">
        {property.type === "single" ? (
          <div className="grid w-full grid-cols-2 gap-1">
            <Button variant="outline">Share Listing</Button>
            <Button variant="outline">Screen Tenant</Button>
          </div>
        ) : (
          <Button className="w-full" variant="outline">
            Show Units & Rooms
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
