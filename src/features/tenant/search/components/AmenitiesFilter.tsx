import { useTranslation } from "react-i18next";
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

type AmenitiesFilterProps = {
  selectedAmenities: string[];
  setSelectedAmenities: (amenities: string[]) => void;
};

type Amenity = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type AmenitiesCategory = {
  title: string;
  amenities: Amenity[];
};

export const AmenitiesFilter = ({
  selectedAmenities,
  setSelectedAmenities,
}: AmenitiesFilterProps) => {
  const { t } = useTranslation();
  const amenitiesData: AmenitiesCategory[] = [
    {
      title: t("filterDialog.amenities.essentials"),
      amenities: [
        {
          id: "wifi",
          label: t("filterDialog.amenities.wifi"),
          icon: <WifiIcon className="size-4" />,
        },
        {
          id: "kitchen",
          label: t("filterDialog.amenities.kitchen"),
          icon: <UtensilsCrossedIcon className="size-4" />,
        },
        {
          id: "dryer",
          label: t("filterDialog.amenities.dryer"),
          icon: <span className="text-sm">🧥</span>,
        },
        {
          id: "washing-machine",
          label: t("filterDialog.amenities.washingMachine"),
          icon: <span className="text-sm">🧺</span>,
        },
        {
          id: "air-conditioning",
          label: t("filterDialog.amenities.airConditioning"),
          icon: <AirVentIcon className="size-4" />,
        },
        {
          id: "tv",
          label: t("filterDialog.amenities.tv"),
          icon: <TvIcon className="size-4" />,
        },
        {
          id: "heating",
          label: t("filterDialog.amenities.heating"),
          icon: <Flame className="size-4" />,
        },
      ],
    },
    {
      title: t("filterDialog.amenities.features"),
      amenities: [
        {
          id: "pool",
          label: t("filterDialog.amenities.pool"),
          icon: <span className="text-sm">🏊</span>,
        },
        {
          id: "hot-tub",
          label: t("filterDialog.amenities.hotTub"),
          icon: <span className="text-sm">♨️</span>,
        },
        {
          id: "gym",
          label: t("filterDialog.amenities.gym"),
          icon: <span className="text-sm">🏋️</span>,
        },
        {
          id: "free-parking",
          label: t("filterDialog.amenities.freeParking"),
          icon: <CarIcon className="size-4" />,
        },
        {
          id: "bbq-grill",
          label: t("filterDialog.amenities.bbqGrill"),
          icon: <span className="text-sm">🍖</span>,
        },
        {
          id: "indoor-fireplace",
          label: t("filterDialog.amenities.indoorFireplace"),
          icon: <Flame className="size-4" />,
        },
        {
          id: "breakfast",
          label: t("filterDialog.amenities.breakfast"),
          icon: <span className="text-sm">🥐</span>,
        },
        {
          id: "king-bed",
          label: t("filterDialog.amenities.kingBed"),
          icon: <BedIcon className="size-4" />,
        },
        {
          id: "smoking-allowed",
          label: t("filterDialog.amenities.smokingAllowed"),
          icon: <span className="text-sm">🚬</span>,
        },
      ],
    },
    {
      title: t("filterDialog.amenities.location"),
      amenities: [
        {
          id: "beachfront",
          label: t("filterDialog.amenities.beachfront"),
          icon: <span className="text-sm">🏖️</span>,
        },
        {
          id: "waterfall",
          label: t("filterDialog.amenities.waterfall"),
          icon: <Waves className="size-4" />,
        },
        {
          id: "ski-in-out",
          label: t("filterDialog.amenities.skiInOut"),
          icon: <span className="text-sm">⛷️</span>,
        },
        {
          id: "hillfront",
          label: t("filterDialog.amenities.hillfront"),
          icon: <MountainIcon className="size-4" />,
        },
      ],
    },
    {
      title: t("filterDialog.amenities.bookingOptions"),
      amenities: [
        {
          id: "allow-pets",
          label: t("filterDialog.amenities.allowPets"),
          icon: <PawPrintIcon className="size-4" />,
        },
        {
          id: "instant-book",
          label: t("filterDialog.amenities.instantBook"),
          icon: <ZapIcon className="size-4" />,
        },
        {
          id: "self-check-in",
          label: t("filterDialog.amenities.selfCheckIn"),
          icon: <KeyIcon className="size-4" />,
        },
      ],
    },
  ];

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
