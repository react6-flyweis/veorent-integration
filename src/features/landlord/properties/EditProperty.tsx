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
import { useNavigate } from "react-router";

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

const propertyData = {
  address: "123 Main St.",
  city: "Denver",
  state: "CO",
  zipCode: "80023",
  propertyType: "Multi-Family",
  beds: 0,
  baths: 0,
  title: "N/A",
  description: "N/A",
  requirements: {
    noSmoking: true,
  },
  utilities: [],
  amenities: [],
};

export default function EditProperty() {
  const navigate = useNavigate();

  const handleEditLeasing = () => {
    // Implement edit leasing logic
    console.log("Edit leasing");
  };

  const handleEditPropertyDetails = () => {
    // Implement edit property details logic
    console.log("Edit property details");
  };

  const handleEditRequirements = () => {
    // Implement edit requirements logic
    console.log("Edit requirements");
  };

  const handleEditTitleDescription = () => {
    // Implement edit title and description logic
    console.log("Edit title and description");
  };

  const handleEditUtilities = () => {
    // Implement edit utilities logic
    console.log("Edit utilities");
  };

  const handleEditAmenities = () => {
    // Implement edit amenities logic
    console.log("Edit amenities");
  };

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
          onEdit={() => navigate("/landlord/properties/1/edit-address")}
        >
          <div className="flex items-start gap-2">
            <MapPinIcon size={18} className="mt-1 text-gray-500" />
            <p>
              {propertyData.address}
              <br />
              {propertyData.city}, {propertyData.state} {propertyData.zipCode}
            </p>
          </div>
        </PropertySection>

        <PropertySection title="Leasing Details" onEdit={handleEditLeasing}>
          <div className="flex items-center gap-2">
            <BriefcaseIcon size={18} className="text-gray-500" />
            <p>Click Edit to add leasing information</p>
          </div>
        </PropertySection>

        <PropertySection
          title="Property Details"
          onEdit={handleEditPropertyDetails}
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <BedDoubleIcon size={18} className="text-gray-500" />
              <span>{propertyData.beds} Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <HomeIcon size={18} className="text-gray-500" />
              <span>{propertyData.propertyType}</span>
            </div>
            <div className="flex items-center gap-2">
              <BathIcon size={18} className="text-gray-500" />
              <span>{propertyData.baths} Baths</span>
            </div>
          </div>
        </PropertySection>

        <PropertySection title="Requirements" onEdit={handleEditRequirements}>
          <div className="flex items-center gap-2">
            <CigaretteIcon size={18} className="text-gray-500" />
            <span>No Smoking</span>
          </div>
        </PropertySection>

        <PropertySection
          title="Title & Description"
          onEdit={handleEditTitleDescription}
        >
          <div className="space-y-2">
            <p className="text-gray-500">N/A</p>
            <p className="text-gray-500">N/A</p>
          </div>
        </PropertySection>

        <PropertySection
          title="Included Utilities"
          onEdit={handleEditUtilities}
        >
          <div className="flex items-center gap-2">
            <InfoIcon size={18} className="text-gray-500" />
            <p>Click Edit to add utilities information</p>
          </div>
        </PropertySection>

        <PropertySection title="Amenities" onEdit={handleEditAmenities}>
          <div className="flex items-center gap-2">
            <InfoIcon size={18} className="text-gray-500" />
            <p>Click Edit to add amenities information</p>
          </div>
        </PropertySection>
      </div>
    </div>
  );
}
