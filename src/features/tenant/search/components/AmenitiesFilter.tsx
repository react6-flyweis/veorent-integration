import {
  WifiIcon,
  UtensilsCrossedIcon,
  Waves,
  TvIcon,
  Flame,
  AirVentIcon,
  CarIcon,
  BedIcon,
  KeyIcon,
  ZapIcon,
  PawPrintIcon,
  MountainIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Amenity = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type AmenitiesCategory = {
  title: string;
  amenities: Amenity[];
};

const amenitiesData: AmenitiesCategory[] = [
  {
    title: "Essentials",
    amenities: [
      { id: "wifi", label: "Wifi", icon: <WifiIcon className="size-4" /> },
      {
        id: "kitchen",
        label: "Kitchen",
        icon: <UtensilsCrossedIcon className="size-4" />,
      },
      {
        id: "dryer",
        label: "Dryer",
        icon: <span className="text-sm">🧥</span>,
      },
      {
        id: "washing-machine",
        label: "Washing machine",
        icon: <span className="text-sm">🧺</span>,
      },
      {
        id: "air-conditioning",
        label: "Air conditioning",
        icon: <AirVentIcon className="size-4" />,
      },
      { id: "tv", label: "TV", icon: <TvIcon className="size-4" /> },
      { id: "heating", label: "Heating", icon: <Flame className="size-4" /> },
    ],
  },
  {
    title: "Features",
    amenities: [
      { id: "pool", label: "Pool", icon: <span className="text-sm">🏊</span> },
      {
        id: "hot-tub",
        label: "Hot tub",
        icon: <span className="text-sm">♨️</span>,
      },
      { id: "gym", label: "Gym", icon: <span className="text-sm">🏋️</span> },
      {
        id: "free-parking",
        label: "Free parking",
        icon: <CarIcon className="size-4" />,
      },
      {
        id: "bbq-grill",
        label: "BBQ grill",
        icon: <span className="text-sm">🍖</span>,
      },
      {
        id: "indoor-fireplace",
        label: "Indoor fireplace",
        icon: <Flame className="size-4" />,
      },
      {
        id: "breakfast",
        label: "Breakfast",
        icon: <span className="text-sm">🥐</span>,
      },
      {
        id: "king-bed",
        label: "King bed",
        icon: <BedIcon className="size-4" />,
      },
      {
        id: "smoking-allowed",
        label: "Smoking allowed",
        icon: <span className="text-sm">🚬</span>,
      },
    ],
  },
  {
    title: "Location",
    amenities: [
      {
        id: "beachfront",
        label: "Beachfront",
        icon: <span className="text-sm">🏖️</span>,
      },
      {
        id: "waterfall",
        label: "Waterfall",
        icon: <Waves className="size-4" />,
      },
      {
        id: "ski-in-out",
        label: "Ski-in/ski-out",
        icon: <span className="text-sm">⛷️</span>,
      },
      {
        id: "hillfront",
        label: "Hillfront",
        icon: <MountainIcon className="size-4" />,
      },
    ],
  },
  {
    title: "Booking options",
    amenities: [
      {
        id: "allow-pets",
        label: "Allow pets",
        icon: <PawPrintIcon className="size-4" />,
      },
      {
        id: "instant-book",
        label: "Instant book",
        icon: <ZapIcon className="size-4" />,
      },
      {
        id: "self-check-in",
        label: "Self check-in",
        icon: <KeyIcon className="size-4" />,
      },
    ],
  },
];

interface AmenitiesFilterProps {
  selectedAmenities: string[];
  setSelectedAmenities: (amenities: string[]) => void;
}

export const AmenitiesFilter = ({
  selectedAmenities,
  setSelectedAmenities,
}: AmenitiesFilterProps) => {
  const toggleAmenity = (amenityId: string) => {
    if (selectedAmenities.includes(amenityId)) {
      setSelectedAmenities(selectedAmenities.filter((id) => id !== amenityId));
    } else {
      setSelectedAmenities([...selectedAmenities, amenityId]);
    }
  };

  return (
    <div className="space-y-6">
      {amenitiesData.map((category) => (
        <div key={category.title} className="space-y-3">
          <h4 className="text-sm font-medium">{category.title}</h4>
          <div className="flex flex-wrap gap-2">
            {category.amenities.map((amenity) => (
              <Button
                size="sm"
                key={amenity.id}
                variant={
                  selectedAmenities.includes(amenity.id)
                    ? "default"
                    : "outlinePrimary"
                }
                className="flex h-auto items-center rounded-3xl px-4 py-2"
                onClick={() => toggleAmenity(amenity.id)}
              >
                <span className="">{amenity.icon}</span>
                <span>{amenity.label}</span>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
