import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PageTitle } from "@/components/PageTitle";
import { CurrencyIcon } from "@/components/CurrencyIcon";
import { BackButton } from "@/components/BackButton";
import {
  InfoIcon,
  Link,
  Share2Icon,
  Star,
  UserIcon,
  MailIcon,
  DownloadIcon,
  EditIcon,
  CalendarIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";

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

export default function PropertyDetail() {
  const { propertyId } = useParams();

  // Mock data based on the provided images. In a real app, you would fetch this data from an API
  const property: PropertyDetailType = {
    id: propertyId || "",
    name:
      propertyId === "1"
        ? "Ft. Collins Home"
        : propertyId === "2"
          ? "46 Bryant Way"
          : "Family House in Santa Barbara",
    address:
      propertyId === "1"
        ? "700 H St"
        : propertyId === "2"
          ? "46 Bryant Way"
          : "2100 Circle Drive",
    city:
      propertyId === "1"
        ? "Ft Collins"
        : propertyId === "2"
          ? "Denver"
          : "Santa Barbara",
    state: propertyId === "1" ? "CO" : propertyId === "2" ? "CO" : "CA",
    zipCode:
      propertyId === "1" ? "80992" : propertyId === "2" ? "80219" : "87692",
    image: "/property.png",
    baths: propertyId === "1" ? 2 : propertyId === "2" ? 2 : 1,
    beds: propertyId === "1" ? 3 : propertyId === "2" ? 2 : 2,
    rent: propertyId === "1" ? 900 : propertyId === "2" ? 4000 : 1500,
    rating: propertyId === "1" ? 5 : undefined,
    status:
      propertyId === "1"
        ? "marketing"
        : propertyId === "2"
          ? undefined
          : "incomplete",
    type: "single",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    propertyId:
      propertyId === "1" ? "742148" : propertyId === "2" ? "749289" : "742151",
    marketingExpires: "08/17/2024 (29 DAYS LEFT)",
    listingUrl: "https://example/examplewebsite.com",
    preScreenerUrl: "https://example/examplewebsite.com",
  };

  return (
    <div className="flex flex-col gap-4 pb-8">
      <div className="flex items-center gap-2">
        <BackButton />
        <PageTitle title={property.name} className="mb-0" />
      </div>

      {/* Property Hero Section */}
      <div className="relative">
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white"
          >
            <InfoIcon className="size-5" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white"
          >
            <EditIcon className="size-5" />
          </Button>
        </div>

        {property.status === "marketing" && (
          <Badge className="absolute top-2 left-2 z-10 bg-blue-500 text-white">
            Marketing
          </Badge>
        )}

        {property.status === "incomplete" && (
          <Badge className="absolute top-2 left-2 z-10 bg-orange-500 text-white">
            Incomplete
          </Badge>
        )}

        <img
          src={property.image}
          alt={property.name}
          className="h-64 w-full rounded-lg object-cover"
        />
      </div>

      {/* Property Info Section */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-semibold">{property.address}</h2>
              <p className="text-muted-foreground">
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

            <div className="flex flex-wrap gap-6">
              <div>
                <span className="text-muted-foreground text-sm">
                  Property ID
                </span>
                <p className="font-medium">{property.propertyId}</p>
              </div>

              <div>
                <span className="text-muted-foreground text-sm">Rent</span>
                <p className="flex items-center font-medium">
                  <CurrencyIcon size="sm" />
                  {property.rent?.toLocaleString()}.00
                </p>
              </div>

              <div>
                <span className="text-muted-foreground text-sm">
                  Beds/Baths
                </span>
                <p className="font-medium">
                  {property.beds}/{property.baths}
                </p>
              </div>
            </div>

            {/* Marketing Status Section */}
            {property.status === "marketing" && (
              <div className="rounded-md bg-blue-50 p-4">
                <h3 className="mb-2 text-lg font-medium">
                  Marketing Online: ON
                </h3>
                <p className="text-muted-foreground text-sm">
                  EXPIRES ON {property.marketingExpires}
                </p>
                <Button className="mt-4 w-full" variant="outline">
                  Turn Off
                </Button>
              </div>
            )}

            {property.status === undefined && (
              <div className="rounded-md bg-blue-50 p-4">
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
                      <Link className="h-4 w-4" />
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
                <h3 className="mb-2 text-lg font-medium">
                  Marketing Online: OFF
                </h3>
                <p className="text-muted-foreground text-sm">
                  Your listing is almost ready!
                </p>
                <p className="mt-2 text-sm">{property.description}</p>
                <Button className="mt-4 w-full">Complete My Listing</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Property Details Section - Showing directly without tabs */}
      <Card>
        <CardContent className="p-4">
          <h3 className="mb-3 text-lg font-medium">Property Description</h3>
          <p className="text-muted-foreground">{property.description}</p>

          <Separator className="my-4" />

          <h3 className="mb-3 text-lg font-medium">Property Features</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <CalendarIcon className="text-muted-foreground h-4 w-4" />
              <span className="text-sm">Built in 2010</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="text-muted-foreground h-4 w-4" />
              <span className="text-sm">Available Now</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {property.status === "marketing" && (
        <Card>
          <CardContent className="p-4">
            <h3 className="mb-3 text-lg font-medium">Listing Page</h3>
            <div className="mb-2 flex items-center justify-between rounded-md bg-gray-50 p-3">
              <span className="text-sm text-blue-600">
                {property.listingUrl}
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">
                  <Share2Icon className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <DownloadIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <h3 className="mt-4 mb-3 text-lg font-medium">Pre-Screener</h3>
            <div className="flex items-center justify-between rounded-md bg-gray-50 p-3">
              <span className="text-sm text-blue-600">
                {property.preScreenerUrl}
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">
                  <Share2Icon className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <MailIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="grid grid-cols-2 gap-4 p-4">
            <Button variant="outline" className="w-full">
              Share Listing
            </Button>
            <Button variant="outline" className="w-full">
              Screen Tenant
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Footer action buttons for non-marketing properties */}
      {property.status !== "marketing" && (
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
      )}
    </div>
  );
}
