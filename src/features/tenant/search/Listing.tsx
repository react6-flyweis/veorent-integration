import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  BathIcon,
  BedDoubleIcon,
  HammerIcon,
  HomeIcon,
  MapIcon,
  PawPrintIcon,
  CigaretteIcon,
  DropletsIcon,
  ToiletIcon,
  WifiIcon,
  SofaIcon,
  WashingMachineIcon,
  TvIcon,
  ParkingCircleIcon,
  FenceIcon,
  FlameKindlingIcon,
  MicrowaveIcon,
  RefrigeratorIcon,
  Trash2Icon,
  GalleryHorizontalEndIcon,
  Waves,
  UtensilsCrossedIcon,
  DumbbellIcon,
  ZapIcon,
  AccessibilityIcon,
  HouseIcon,
} from "lucide-react";

import { BackButton } from "@/components/BackButton";
import { CurrencyIcon } from "@/components/CurrencyIcon";
import { Logo } from "@/components/Logo";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPropertyByIdQuery } from "@/features/landlord/properties/api/queries";
import { formatDate } from "@/utils/formatDate";

import { ContactForm } from "./components/ContactForm";

// Utility mappings
const utilityMap = {
  water: { icon: DropletsIcon, label: "Water" },
  sewage: { icon: ToiletIcon, label: "Sewage" },
  internet: { icon: WifiIcon, label: "Internet" },
  cable: { icon: TvIcon, label: "Cable" },
  electricty: { icon: ZapIcon, label: "Electricity" },
  gas: { icon: FlameKindlingIcon, label: "Gas" },
  garbage: { icon: Trash2Icon, label: "Garbage" },
};

// Amenity mappings
const amenityMap = {
  furnished: { icon: SofaIcon, label: "Furnished" },
  onSiteLaundry: { icon: WashingMachineIcon, label: "On Site Laundry" },
  cableReady: { icon: TvIcon, label: "Cable Ready" },
  offStreetParking: { icon: ParkingCircleIcon, label: "Off Street Parking" },
  wiredFromInternet: { icon: WifiIcon, label: "High Speed Internet" },
  fencedyard: { icon: FenceIcon, label: "Fenced Yard" },
  firePlace: { icon: FlameKindlingIcon, label: "Fireplace" },
  swimmingPool: { icon: Waves, label: "Swimming Pool" },
  fitnessCenter: { icon: DumbbellIcon, label: "Fitness Center" },
  garage: { icon: HomeIcon, label: "Garage" },
  accessibility: { icon: AccessibilityIcon, label: "Accessibility" },
};

// Appliance mappings
const applianceMap = {
  washer: { icon: WashingMachineIcon, label: "Washer" },
  dryer: { icon: WashingMachineIcon, label: "Dryer" },
  microwave: { icon: MicrowaveIcon, label: "Microwave" },
  refrigerator: { icon: RefrigeratorIcon, label: "Refrigerator" },
  garbageDisposal: { icon: Trash2Icon, label: "Garbage Disposal" },
  dishwasher: { icon: UtensilsCrossedIcon, label: "Dishwasher" },
  oven: { icon: MicrowaveIcon, label: "Oven" },
  freezer: { icon: RefrigeratorIcon, label: "Freezer" },
};

export default function PropertyListingDetail() {
  const { id } = useParams();
  const { data, isLoading } = useGetPropertyByIdQuery(id || "");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Helper function to render feature/amenity sections
  const renderSection = (
    title: string,
    itemMap: Record<
      string,
      {
        icon: React.ComponentType<{ className?: string }>;
        label: string;
        dataPath?: string;
      }
    >,
    dataSource?: unknown,
  ) => {
    const items = Object.entries(itemMap).filter(([key, config]) => {
      if (config.dataPath) {
        // Handle nested paths like "permission.pets"
        const pathParts = config.dataPath.split(".");
        let value: unknown = data;
        for (const part of pathParts) {
          value = (value as Record<string, unknown>)?.[part];
        }
        return value === true || value === "Yes";
      }
      return (dataSource as Record<string, unknown>)?.[key];
    });

    if (items.length === 0) return null;

    return (
      <div>
        <h3 className="mt-4 text-xl font-semibold">{title}</h3>
        <div className="mt-2 flex flex-wrap gap-5">
          {items.map(([key, config]) => {
            const IconComponent = config.icon;
            return (
              <span key={key} className="flex items-center gap-1">
                <IconComponent className="size-5" /> {config.label}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-5">
        <div className="flex justify-between">
          <BackButton />
          <Logo />
        </div>
        <div className="mx-auto grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Left: Listing Info Skeleton */}
          <div className="space-y-4 md:col-span-2">
            {/* Image Skeleton */}
            <Skeleton className="h-64 w-full rounded-xl" />

            {/* Title and Address Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
            </div>

            {/* Property Details Skeleton */}
            <div className="mt-2 flex w-full items-end justify-around">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <Skeleton className="size-7 rounded-full" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>

            {/* Description Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>

            {/* Features Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-24" />
              <div className="flex flex-wrap gap-5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-32" />
                ))}
              </div>
            </div>

            {/* Utilities/Amenities Skeleton */}
            {Array.from({ length: 3 }).map((_, sectionIndex) => (
              <div key={sectionIndex} className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <div className="flex flex-wrap gap-5">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-5 w-28" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Sidebar Skeleton */}
          <div className="space-y-4">
            {/* Rent Card Skeleton */}
            <Card className="gap-2 rounded bg-gray-50 p-3 shadow-none">
              <CardHeader className="px-1">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </CardHeader>
              <CardContent className="px-1">
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Skeleton className="h-8 w-24 rounded-full" />
              </CardFooter>
            </Card>

            {/* Contact Form Skeleton */}
            <Card className="gap-2 rounded bg-gray-50 p-3 shadow-none">
              <CardContent className="space-y-3 px-3">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <BackButton />
        <Logo />
      </div>
      <div className="mx-auto grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Left: Listing Info */}
        <div className="space-y-4 md:col-span-2">
          <div className="relative">
            <Avatar className="h-64 w-full rounded-xl">
              <AvatarImage
                src={data?.image?.[0]?.img}
                alt={data?.name || "Property"}
                className="h-64 w-full rounded-xl object-cover"
              />
              <AvatarFallback className="bg-muted flex h-64 w-full items-center justify-center rounded-xl">
                <HouseIcon className="text-muted-foreground size-10" />
              </AvatarFallback>
            </Avatar>

            {(data?.image?.length ?? 0) > 1 && (
              <Button
                variant="ghost"
                className="absolute right-2 bottom-2 rounded-full bg-white"
                onClick={() => setIsGalleryOpen(true)}
              >
                <GalleryHorizontalEndIcon className="rotate-180" />
                <span className="font-semibold">
                  {data?.image?.length || 0} photos
                </span>
              </Button>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold">{data?.name}</h2>
            <div className="flex gap-1">
              <a href="#" className="text-lg tracking-wide text-blue-600">
                {data?.addressDetails?.streetAddress},{" "}
                {data?.addressDetails?.city}, {data?.addressDetails?.region}{" "}
                {data?.addressDetails?.zipCode}
              </a>
              <MapIcon className="text-blue-600" />
            </div>
            <div className="mt-2 flex w-full items-end justify-around text-gray-700">
              <div className="flex flex-col items-center gap-1">
                <BedDoubleIcon className="size-7" />
                <span> {data?.rentalDetails?.beds} Beds</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <BathIcon className="size-7" />
                <span> {data?.rentalDetails?.baths} Baths</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <HomeIcon className="size-7" />
                <span>{data?.propertyTypeId?.name}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <HammerIcon className="size-7" />
                <span>Built in {data?.propertySize?.yearBuilt}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold">Description</h3>
            <p className="text-muted-foreground mt-2">{data?.description}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="mt-4 text-xl font-semibold">Features</h3>
            <div className="mt-2 flex flex-wrap gap-5">
              <span
                className={`flex items-center gap-1 ${data?.permission?.pets ? "text-green-600" : "text-red-600"}`}
              >
                <PawPrintIcon className="size-5" />
                {data?.permission?.pets ? "Pets Allowed" : "No Pets Allowed"}
              </span>
              <span
                className={`flex items-center gap-1 ${
                  data?.permission?.smoking === "Yes"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                <CigaretteIcon className="size-5" />
                {data?.permission?.smoking === "Yes"
                  ? "Smoking Allowed"
                  : "Smoking Outside Only"}
              </span>
            </div>
          </div>

          {/* Utilities */}
          {renderSection("Utilities Included", utilityMap, data?.amenities)}

          {/* Amenities */}
          {renderSection("Amenities", amenityMap, data?.amenities)}

          {/* Appliances */}
          {renderSection("Appliances", applianceMap, data?.amenities)}
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-4">
          <Card className="gap-2 rounded bg-gray-50 p-3 shadow-none">
            <CardHeader className="px-1">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xl">Rent</span>
                <div className="flex items-center gap-1">
                  <CurrencyIcon size="sm" />
                  <span className="text-2xl font-bold">
                    {data?.rentalDetails?.targetRent}
                  </span>
                  <span className="">/MO</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-1">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Deposit</span>
                  <div className="flex items-center gap-1">
                    <CurrencyIcon size="sm" />
                    {data?.rentalDetails?.targetDeposite}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Available</span>
                  <span className="">
                    {formatDate(data?.leasingBasics?.Date || "")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Lease Terms</span>
                  <span className="">
                    {data?.leasingBasics?.desiredLeaseTerm}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button size="sm" className="rounded-full">
                <Link to={`/tenant/listing/${id}/apply`}>Apply Now</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Contact Form */}
          <Card className="gap-2 rounded bg-gray-50 p-3 shadow-none">
            <CardContent className="space-y-3 px-3">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">Contact the Landlord</h3>
                <p>
                  Send a message to the landlord if you are interested in or
                  have any questions about this property.
                </p>
              </div>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Photo Gallery */}
      <PhotoGallery
        images={data?.image || []}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  );
}
