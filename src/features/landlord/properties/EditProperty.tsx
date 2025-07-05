import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import {
  BathIcon,
  BedDoubleIcon,
  HomeIcon,
  PencilIcon,
  MapPinIcon,
  CigaretteIcon,
  BriefcaseIcon,
  InfoIcon,
  GroupIcon,
  PawPrintIcon,
  ArrowLeftIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetPropertyByIdQuery } from "./api/queries";

interface PropertySectionProps {
  title: string;
  children: React.ReactNode;
  onEdit: () => void;
}

const PropertySection = ({ title, children, onEdit }: PropertySectionProps) => {
  const { t } = useTranslation();
  return (
    <Card className="mb-4 gap-0 p-2">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <Button
          className="bg-blue-200 text-black hover:bg-blue-300"
          size="sm"
          onClick={onEdit}
        >
          <PencilIcon size={16} />
          <span>{t("edit")}</span>
        </Button>
      </div>
      {children}
    </Card>
  );
};

export default function EditProperty() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();
  const { data, isLoading } = useGetPropertyByIdQuery(id || "", {
    skip: !id && !state?.property?._id,
  });

  const propertyData = state?.property || data;
  const propertyId = propertyData?._id;

  // Show loading skeleton when there's no state.property and data is loading
  if (!state?.property && isLoading) {
    return (
      <div>
        <div className="bg-primary relative flex h-64 flex-col items-center justify-center gap-5">
          <div className="absolute top-0 left-0 p-4">
            <Button
              variant="outline"
              className="size-9 items-center justify-center rounded-full"
            >
              <ArrowLeftIcon className="text-primary size-5" />
            </Button>
          </div>
          <Skeleton className="h-8 w-48 bg-white/20" />
          <Skeleton className="size-32 rounded-full bg-white/20" />
        </div>

        <div className="mt-5 space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-16" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-primary relative flex h-64 flex-col items-center justify-center gap-5">
        <div className="absolute top-0 left-0 p-4">
          <Link to={`/landlord/properties/${propertyId}`} replace>
            <Button
              variant="outline"
              className="size-9 items-center justify-center rounded-full"
            >
              <ArrowLeftIcon className="text-primary size-5" />
            </Button>
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-white">{t("editProperty")}</h2>
        <div className="rounded-full">
          <Avatar className="size-32">
            <AvatarImage
              src={propertyData.image?.[0]?.img}
              alt={propertyData.addressDetails?.streetAddress}
              className="object-cover"
            />
            <AvatarFallback className="text-2xl font-semibold">
              {propertyData.addressDetails?.streetAddress?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="mt-5">
        <PropertySection
          title={t("address")}
          onEdit={() =>
            navigate(`/landlord/properties/${propertyId}/edit-address`)
          }
        >
          <div className="flex items-start gap-2">
            <MapPinIcon size={18} className="mt-1 text-gray-500" />
            <p>
              {propertyData.propertyDetails?.streetAddress}
              <br />
              {propertyData.propertyDetails?.city},{" "}
              {propertyData.propertyDetails?.region}{" "}
              {propertyData.propertyDetails?.zipCode}
            </p>
          </div>
        </PropertySection>

        <PropertySection
          title={t("leasingDetails")}
          onEdit={() =>
            navigate(`/landlord/properties/${propertyId}/edit-basics`)
          }
        >
          <div className="flex items-center gap-2">
            <BriefcaseIcon size={18} className="text-gray-500" />
            <p>{t("clickEditToAddLeasingInfo")}</p>
          </div>
        </PropertySection>

        <PropertySection
          title={t("propertyDetails")}
          onEdit={() =>
            navigate(`/landlord/properties/${propertyId}/edit-size`)
          }
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <BedDoubleIcon size={18} className="text-gray-500" />
              <span>
                {propertyData.rentalDetails?.beds} {t("beds")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <HomeIcon size={18} className="text-gray-500" />
              <span>{propertyData.propertyTypeId?.name || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <BathIcon size={18} className="text-gray-500" />
              <span>
                {propertyData.propertySize?.baths} {t("baths")}
              </span>
            </div>
          </div>
        </PropertySection>

        <PropertySection
          title={t("requirements")}
          onEdit={() =>
            navigate(`/landlord/properties/${propertyId}/edit-permissions`)
          }
        >
          <div className="">
            <div className="flex items-center gap-2">
              <CigaretteIcon size={18} className="text-gray-500" />
              <span>
                {propertyData.permission?.smoking === "No"
                  ? t("noSmoking")
                  : t("smokingAllowed")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <GroupIcon size={18} className="text-gray-500" />
              <span>
                {t("occupancyLimits")} :{" "}
                {propertyData.permission?.occupancyLimitsCount || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <PawPrintIcon size={18} className="text-gray-500" />
              <span>
                {" "}
                {propertyData.permission?.pets
                  ? t("petsAllowed")
                  : t("noPetsAllowed")}
              </span>
            </div>
          </div>
        </PropertySection>

        <PropertySection
          title={t("titleAndDescription")}
          onEdit={() =>
            navigate(`/landlord/properties/${propertyId}/edit-description`)
          }
        >
          <div className="space-y-1">
            <p className="text-gray-500">{propertyData.name || "N/A"}</p>
            <p className="text-gray-500">{propertyData.description || "N/A"}</p>
          </div>
        </PropertySection>

        <PropertySection
          title={t("includedUtilities")}
          onEdit={() =>
            navigate(`/landlord/properties/${propertyId}/edit-utilities`)
          }
        >
          <div className="flex items-center gap-2">
            <InfoIcon size={18} className="text-gray-500" />
            <p>{t("clickEditToAddUtilitiesInfo")}</p>
          </div>
        </PropertySection>

        <PropertySection
          title={t("amenities")}
          onEdit={() =>
            navigate(`/landlord/properties/${propertyId}/edit-amenities`)
          }
        >
          <div className="flex items-center gap-2">
            <InfoIcon size={18} className="text-gray-500" />
            <p>{t("clickEditToAddAmenitiesInfo")}</p>
          </div>
        </PropertySection>
      </div>
    </div>
  );
}
