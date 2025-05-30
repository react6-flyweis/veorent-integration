import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrencyIcon } from "@/components/CurrencyIcon";
import { BackButton } from "@/components/BackButton";
import {
  Star,
  UserIcon,
  EditIcon,
  EllipsisVerticalIcon,
  CopyIcon,
  ForwardIcon,
  PenLineIcon,
  BadgeInfoIcon,
  LinkIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

type PropertyDetailType = {
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
  status?: "complete" | "incomplete" | "marketing" | undefined;
  type?: "single" | "multi";
  description?: string;
  propertyId?: string;
  marketingExpires?: string;
  listingUrl?: string;
  preScreenerUrl?: string;
};

const properties: PropertyDetailType[] = [
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
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    propertyId: "742148",
    marketingExpires: "08/17/2024 (29 DAYS LEFT)",
    listingUrl: "https://example/examplewebsite.com",
    preScreenerUrl: "https://example/examplewebsite.com",
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
    rent: 4000,
    status: undefined,
    type: "single",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    propertyId: "749289",
    marketingExpires: "08/17/2024 (29 DAYS LEFT)",
    listingUrl: "https://example/examplewebsite.com",
    preScreenerUrl: "https://example/examplewebsite.com",
  },
  {
    id: "3",
    name: "Family House in Santa Barbara",
    address: "2100 Circle Drive",
    city: "Santa Barbara",
    state: "CA",
    zipCode: "87692",
    image: "/property.png",
    baths: 1,
    beds: 2,
    rent: 1500,
    status: "incomplete",
    type: "single",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    propertyId: "742151",
    marketingExpires: "08/17/2024 (29 DAYS LEFT)",
    listingUrl: "https://example/examplewebsite.com",
    preScreenerUrl: "https://example/examplewebsite.com",
  },
];

export default function PropertyDetail() {
  const { propertyId } = useParams();

  const [extended, setExtended] = useState(false);

  const property = properties.find((p) => p.id === propertyId) || properties[0];

  return (
    <div className="flex flex-col gap-4 pb-8">
      <Card className="gap-0 rounded-sm p-0">
        {/* Property Hero Section */}
        <CardHeader className="px-0">
          <div className="relative">
            <div className="absolute top-2 left-2 z-10">
              <BackButton />
            </div>
            <div className="absolute top-2 right-2 z-10 flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-white"
              >
                <EllipsisVerticalIcon className="size-5" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-white"
              >
                <EditIcon className="size-5" />
              </Button>
            </div>

            {/* {property.status === "marketing" && (
          <Badge className="absolute top-2 left-2 z-10 bg-blue-500 text-white">
            Marketing
          </Badge>
        )}

        {property.status === "incomplete" && (
          <Badge className="absolute top-2 left-2 z-10 bg-orange-500 text-white">
            Incomplete
          </Badge>
        )} */}

            <img
              src={property.image}
              alt={property.name}
              className="h-64 w-full object-cover"
            />
          </div>
        </CardHeader>
        {/* Property Info Section */}
        <CardContent className="px-4 py-2">
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex gap-2">
                <h2 className="text-xl font-semibold">{property.address}</h2>
                {property.rating && (
                  <div className="mt-1 flex">
                    {Array.from({ length: property.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-3 fill-yellow-200 text-yellow-400"
                      />
                    ))}
                  </div>
                )}
              </div>
              <p className="text-muted-foreground">
                {property.city}, {property.state} {property.zipCode}
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">
                  Property ID
                </span>
                <p className="font-medium">{property.propertyId}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">Rent</span>
                <p className="flex items-center font-medium">
                  <CurrencyIcon size="sm" />
                  {property.rent?.toLocaleString()}.00
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property Description */}
      <Card className="gap-0 rounded-sm py-2">
        <CardHeader className="px-3">
          <CardTitle className="text-xl">Description</CardTitle>
        </CardHeader>
        <CardContent className="px-3">
          <p className="text-muted-foreground">{property.description}</p>
        </CardContent>
      </Card>

      {/* Marketing Status Section */}
      <Card className="rounded-sm py-0">
        {property.status === "marketing" && (
          <div className="rounded-md p-4">
            <h3 className="mb-2 text-lg font-medium">Marketing Online: ON</h3>
            <p className="text-muted-foreground text-sm">
              EXPIRES ON {property.marketingExpires}
            </p>
            <div className="mt-4 flex justify-around gap-5">
              <Button className="flex-1" variant="outlinePrimary">
                Turn Off
              </Button>

              {!extended && (
                <Link
                  to="/landlord/properties/marketing-extended"
                  className="flex-1"
                >
                  <Button onClick={() => setExtended(true)} className="w-full">
                    Extend
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}

        {property.status === undefined && (
          <div className="rounded-md p-4">
            <h3 className="mb-2 text-lg font-medium">
              Market My Rental For Free
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-900 text-white">
                  <UserIcon className="h-4 w-4" />
                </div>
                <p className="text-sm">
                  Reach thousands of renters with a 5 minute setup
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-900 text-white">
                  <LinkIcon className="h-4 w-4" />
                </div>
                <p className="text-sm">
                  Post to the top listing sites from one place
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-900 text-white">
                  <UserIcon className="h-4 w-4" />
                </div>
                <p className="text-sm">
                  Fill your vacancy with the perfect tenant!
                </p>
              </div>
            </div>

            <Button className="mt-4 w-full">Create My Listing</Button>
          </div>
        )}

        {property.status === "incomplete" && (
          <div className="rounded-md bg-orange-50 p-4">
            <h3 className="mb-2 text-lg font-medium">Marketing Online: OFF</h3>
            <p className="text-muted-foreground text-sm">
              Your listing is almost ready!
            </p>
            <p className="mt-2 text-sm">{property.description}</p>
            <Button className="mt-4 w-full">Complete My Listing</Button>
          </div>
        )}
      </Card>

      {/* Action Buttons */}
      {property.status === "marketing" && (
        <Card className="py-4">
          <CardContent className="space-y-5 px-4">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Listing Page</h3>

              <p className="text-blue-600">{property.listingUrl}</p>
              <div className="flex gap-5">
                <Button
                  size="sm"
                  className="text-primary h-6 bg-blue-200 hover:bg-blue-300"
                >
                  <ForwardIcon className="size-3" />
                  <span className="ml-2">Share</span>
                </Button>
                <Button
                  size="sm"
                  className="text-primary h-6 bg-blue-200 hover:bg-blue-300"
                >
                  <CopyIcon className="size-3" />
                  <span className="ml-2">Copy</span>
                </Button>
                <Button
                  size="sm"
                  className="text-primary h-6 bg-blue-200 hover:bg-blue-300"
                >
                  <PenLineIcon className="size-3" />
                  <span className="ml-2">Edit</span>
                </Button>
              </div>
            </div>

            <Separator className="my-2" />

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">Pre-Screener</h3>
                <BadgeInfoIcon className="size-4" />
              </div>

              <p className="text-blue-600">{property.listingUrl}</p>
              <div className="flex gap-5">
                <Button
                  size="sm"
                  className="text-primary h-6 bg-blue-200 hover:bg-blue-300"
                >
                  <ForwardIcon className="size-3" />
                  <span className="ml-2">Share</span>
                </Button>
                <Button
                  size="sm"
                  className="text-primary h-6 bg-blue-200 hover:bg-blue-300"
                >
                  <CopyIcon className="size-3" />
                  <span className="ml-2">Copy</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Footer action buttons for non-marketing properties */}
      {/* {property.status !== "marketing" && (
        <Card>
          <CardFooter className="grid grid-cols-2 gap-4 p-4">
            <Button variant="outline" className="w-full">
              Share Listing
            </Button>
            <Button variant="outline" className="w-full">
              Screen Tenant
            </Button>
          </CardFooter>
        </Card>
      )} */}
    </div>
  );
}
