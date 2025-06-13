import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  UserIcon,
  EditIcon,
  EllipsisVerticalIcon,
  CopyIcon,
  ForwardIcon,
  PenLineIcon,
  BadgeInfoIcon,
  LinkIcon,
  StarIcon,
} from "lucide-react";
import { toast } from "sonner";

import { BackButton } from "@/components/BackButton";
import { CurrencyIcon } from "@/components/CurrencyIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingButton } from "@/components/ui/loading-button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { PROPERTY_URL_PREFIX } from "@/constants";
import { cn } from "@/lib/utils";
import { getDaysLeft } from "@/utils/date";
import { formatDate } from "@/utils/formatDate";

import { useUpdatePropertyMutation } from "./api/mutation";
import { useGetPropertyByIdQuery } from "./api/queries";

const statusColorMap: Record<string, string> = {
  marketing: "bg-blue-500",
  incomplete: "bg-orange-500",
};

function PropertyDetailSkeleton() {
  return (
    <div className="flex flex-col gap-4 pb-8">
      <Card className="gap-0 rounded-sm p-0">
        <CardHeader className="bg-primary h-64 flex-none px-0 py-0">
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="absolute top-2 left-2 z-10">
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <Skeleton className="size-32 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="px-4 py-2">
          <div className="flex flex-col gap-4">
            <div>
              <Skeleton className="mb-2 h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex flex-wrap gap-6">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="gap-0 rounded-sm py-2">
        <CardHeader className="px-3">
          <Skeleton className="h-6 w-24" />
        </CardHeader>
        <CardContent className="px-3">
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

export default function PropertyDetail() {
  const { id: propertyId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetPropertyByIdQuery(propertyId || "");
  const { mutateAsync: updateProperty, isPending } = useUpdatePropertyMutation(
    propertyId || "",
  );

  const status = useMemo(() => {
    // Check if property has incomplete form status
    const hasIncompleteForm =
      data?.formCompletionStatus &&
      !Object.values(data?.formCompletionStatus).every(
        (status) => status === true,
      );

    if (hasIncompleteForm) return "incomplete";
    if (data?.isMarketing) return "marketing";

    return data?.status;
  }, [data]);

  if (isLoading || !data) {
    return <PropertyDetailSkeleton />;
  }

  const property = data;

  const handleExtendMarketing = async () => {
    try {
      const currentDate = new Date(property.marketingExtendedDate);
      const extendedDate = new Date(currentDate);
      extendedDate.setDate(extendedDate.getDate() + 30); // Add 30 days

      await updateProperty({
        marketingExtendedDate: extendedDate.toISOString(),
        isMarketingExtended: true,
      });

      // Navigate to the marketing extended success page
      navigate("/landlord/properties/marketing-extended");
    } catch (error) {
      console.error("Failed to extend marketing date:", error);
      toast.error("Failed to extend marketing date. Please try again.");
    }
  };

  const handleTurnOffMarketing = async () => {
    try {
      await updateProperty({
        isMarketing: false,
        isMarketingExtended: false,
        marketingExtendedDate: "",
      });

      toast.success("Marketing has been turned off successfully.");
    } catch (error) {
      console.error("Failed to turn off marketing:", error);
      toast.error("Failed to turn off marketing. Please try again.");
    }
  };

  const handleMarketNow = async () => {
    try {
      const currentDate = new Date();
      const marketingEndDate = new Date(currentDate);
      marketingEndDate.setDate(marketingEndDate.getDate() + 30); // Add 30 days

      await updateProperty({
        isMarketing: true,
        isMarketingExtended: false,
        marketingExtendedDate: marketingEndDate.toISOString(),
      });

      toast.success("Marketing has been turned on for 30 days!");
    } catch (error) {
      console.error("Failed to start marketing:", error);
      toast.error("Failed to start marketing. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-8">
      <Card className="gap-0 rounded-sm p-0">
        {/* Property Hero Section */}
        <CardHeader className="bg-primary relative flex h-64 flex-none items-center justify-center px-0 py-0">
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
              onClick={() =>
                navigate(`/landlord/properties/${propertyId}/edit`, {
                  state: { property },
                })
              }
            >
              <EditIcon className="size-5" />
            </Button>
          </div>

          {status && (
            <Badge
              className={cn(
                "absolute bottom-2 left-2 z-10 text-white",
                statusColorMap[status] || "bg-gray-500",
              )}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          )}
          <Avatar className="size-32">
            <AvatarImage
              src={property.image?.[0]?.img}
              alt={property.propertyDetails?.streetAddress}
              className="object-cover"
            />
            <AvatarFallback className="text-2xl font-semibold">
              {property.propertyDetails?.streetAddress?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </CardHeader>
        {/* Property Info Section */}
        <CardContent className="px-4 py-2">
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex gap-2">
                <h2 className="text-xl font-semibold">
                  {property.propertyDetails?.streetAddress}
                </h2>
                {property.rating && (
                  <div className="mt-1 flex">
                    {Array.from({ length: property.rating }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className="size-3 fill-yellow-200 text-yellow-400"
                      />
                    ))}
                  </div>
                )}
              </div>
              <p className="text-muted-foreground">
                {property.propertyDetails?.city},{" "}
                {property.propertyDetails?.region}{" "}
                {property.propertyDetails?.zipCode}
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">
                  Property ID
                </span>
                <p className="font-medium">{property._id}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">Rent</span>
                <p className="flex items-center gap-1 font-medium">
                  <CurrencyIcon size="sm" />
                  {property.rentalDetails?.targetRent?.toLocaleString()}
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
        {status === "marketing" && (
          <div className="rounded-md p-4">
            <h3 className="mb-2 text-lg font-medium">
              Marketing Online: {property.isMarketing ? "ON" : "OFF"}
            </h3>
            <p className="text-muted-foreground text-sm">
              <span>EXPIRES ON:</span>{" "}
              <span>
                {formatDate(property.marketingExtendedDate)} (
                {getDaysLeft(property.marketingExtendedDate)} Days left)
              </span>
            </p>
            <div className="mt-4 flex justify-around gap-5">
              <LoadingButton
                className="flex-1"
                variant="outlinePrimary"
                onClick={handleTurnOffMarketing}
                isLoading={isPending}
              >
                Turn Off
              </LoadingButton>
              {!property.isMarketingExtended && (
                <LoadingButton
                  className="flex-1"
                  onClick={handleExtendMarketing}
                  isLoading={isPending}
                >
                  Extend
                </LoadingButton>
              )}
            </div>
          </div>
        )}

        {status === "Available" && (
          <div className="rounded-md p-4">
            <h3 className="mb-2 text-2xl font-bold">
              Market My Rental For Free
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white">
                  <UserIcon className="h-4 w-4" />
                </div>
                <p className="text-sm">
                  Reach thousands of renters with a 5 minute setup
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white">
                  <LinkIcon className="h-4 w-4" />
                </div>
                <p className="text-sm">
                  Post to the top listing sites from one place
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white">
                  <UserIcon className="h-4 w-4" />
                </div>
                <p className="text-sm">
                  Fill your vacancy with the perfect tenant!
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <LoadingButton
                size="lg"
                className="w-full"
                onClick={handleMarketNow}
                isLoading={isPending}
              >
                Market Now
              </LoadingButton>
            </div>
          </div>
        )}

        {status === "incomplete" && (
          <div className="p-4">
            <h3 className="mb-2 text-lg font-medium">Marketing Online: OFF</h3>
            <p className="text-muted-foreground text-sm">
              Your listing is almost ready!
            </p>
            <p className="mt-2 text-sm">{property.description}</p>
          </div>
        )}
      </Card>

      {/* Action Buttons */}
      {(status === "incomplete" || !status) && (
        <div className="flex justify-center">
          <Link
            className="w-4/5"
            to={`/landlord/properties/${property._id}/setup`}
          >
            <Button size="lg" className="mt-4 w-full">
              {status ? "Complete" : "Create"} My Listing
            </Button>
          </Link>
        </div>
      )}
      {status === "marketing" && (
        <Card className="py-4">
          <CardContent className="space-y-5 px-4">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Listing Page</h3>
              <p className="text-blue-600">
                {PROPERTY_URL_PREFIX}
                {property._id}
              </p>
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

              <p className="text-blue-600">{property._id}</p>
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
    </div>
  );
}
