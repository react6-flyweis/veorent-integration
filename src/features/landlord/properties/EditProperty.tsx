import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BathIcon,
  BedDoubleIcon,
  HomeIcon,
  PencilIcon,
  MapPinIcon,
  CigaretteIcon,
  BriefcaseIcon,
  InfoIcon,
} from "lucide-react";
import propertyEditIcon from "./assets/edit-property.png";
import { useLocation, useNavigate } from "react-router";

interface PropertySectionProps {
  title: string;
  children: React.ReactNode;
  onEdit: () => void;
}

const PropertySection = ({ title, children, onEdit }: PropertySectionProps) => {
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
          <span>Edit</span>
        </Button>
      </div>
      {children}
    </Card>
  );
};

// const propertyData = {
//   address: "123 Main St.",
//   city: "Denver",
//   state: "CO",
//   zipCode: "80023",
//   propertyType: "Multi-Family",
//   beds: 0,
//   baths: 0,
//   title: "N/A",
//   description: "N/A",
//   requirements: {
//     noSmoking: true,
//   },
//   utilities: [],
//   amenities: [],
// };

export default function EditProperty() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const propertyData = state?.property as IProperty;

  const propertyId = propertyData?._id;

  return (
    <div>
      <div className="bg-primary relative flex h-64 flex-col items-center justify-center gap-5">
        <div className="absolute top-0 left-0 p-4">
          <BackButton />
        </div>
        <h2 className="text-2xl font-bold text-white">Edit Property</h2>
        <div className="rounded-full">
          <img src={propertyEditIcon} alt="Edit" className="h-32" />
        </div>
      </div>

      <div className="mt-5">
        <PropertySection
          title="Address"
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
          title="Leasing Details"
          onEdit={() =>
            navigate(`/landlord/properties/${propertyId}/edit-basics`)
          }
        >
          <div className="flex items-center gap-2">
            <BriefcaseIcon size={18} className="text-gray-500" />
            <p>Click Edit to add leasing information</p>
          </div>
        </PropertySection>

        <PropertySection
          title="Property Details"
          onEdit={() =>
            navigate(`/landlord/properties/${propertyId}/edit-size`)
          }
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <BedDoubleIcon size={18} className="text-gray-500" />
              <span>{propertyData.rentalDetails?.beds} Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <HomeIcon size={18} className="text-gray-500" />
              <span>{propertyData.propertyTypeId?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <BathIcon size={18} className="text-gray-500" />
              <span>{propertyData.propertySize?.baths} Baths</span>
            </div>
          </div>
        </PropertySection>

        <PropertySection
          title="Requirements"
          onEdit={() =>
            navigate(`/landlord/properties/${propertyId}/edit-permissions`)
          }
        >
          <div className="flex items-center gap-2">
            <CigaretteIcon size={18} className="text-gray-500" />
            <span>No Smoking</span>
          </div>
        </PropertySection>

        <PropertySection
          title="Title & Description"
          onEdit={() =>
            navigate(`/landlord/properties/${propertyId}/edit-description`)
          }
        >
          <div className="space-y-2">
            <p className="text-gray-500">N/A</p>
            <p className="text-gray-500">N/A</p>
          </div>
        </PropertySection>

        <PropertySection
          title="Included Utilities"
          onEdit={() =>
            navigate(`/landlord/properties/${propertyId}/edit-utilities`)
          }
        >
          <div className="flex items-center gap-2">
            <InfoIcon size={18} className="text-gray-500" />
            <p>Click Edit to add utilities information</p>
          </div>
        </PropertySection>

        <PropertySection
          title="Amenities"
          onEdit={() =>
            navigate(`/landlord/properties/${propertyId}/edit-amenities`)
          }
        >
          <div className="flex items-center gap-2">
            <InfoIcon size={18} className="text-gray-500" />
            <p>Click Edit to add amenities information</p>
          </div>
        </PropertySection>
      </div>
    </div>
  );
}
