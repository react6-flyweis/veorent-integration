import { useState, useEffect } from "react";
import { ListFilterIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { AccessibilityFilter } from "./AccessibilityFilter";
import { AmenitiesFilter } from "./AmenitiesFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { PropertyTypeFilter } from "./PropertyTypeFilter";
import { RoomsAndBedsFilter } from "./RoomsAndBedsFilter";

type PlaceType = "any" | "room" | "entire";

interface FilterDialogProps {
  filters: IPropertyFilters;
  onFiltersChange: (filters: Partial<IPropertyFilters>) => void;
  onClearFilters: () => void;
}

export const FilterDialog = ({
  filters,
  onFiltersChange,
  onClearFilters,
}: FilterDialogProps) => {
  const [open, setOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<IPropertyFilters>(filters);

  // Update local filters when props change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handlePlaceTypeChange = (type: PlaceType) => {
    const typeOfPlace =
      type === "any" ? "" : type === "room" ? "room" : "entire";
    setLocalFilters((prev) => ({ ...prev, typeOfPlace }));
  };

  const handlePriceRangeChange = (range: number[]) => {
    setLocalFilters((prev) => ({
      ...prev,
      minPrice: range[0],
      maxPrice: range[1],
    }));
  };

  const handleRoomsChange = (
    type: "bedrooms" | "beds" | "bathrooms",
    value: number,
  ) => {
    setLocalFilters((prev) => ({ ...prev, [type]: value }));
  };

  const handleAmenitiesChange = (amenities: string[]) => {
    const amenityMap: Record<string, keyof IPropertyFilters> = {
      WiFi: "wifi",
      Kitchen: "kitchen",
      Dryer: "dryer",
      "Washing machine": "washingMachine",
      "Air conditioning": "airConditioning",
      TV: "tv",
      Heating: "heating",
      Pool: "pool",
      "Hot tub": "hotTub",
      Gym: "gym",
      "Free parking": "freeParking",
      "BBQ grill": "bbqGrill",
      "Indoor fireplace": "indoorFireplace",
      Breakfast: "breakfast",
      "King bed": "kingBed",
      "Smoking allowed": "smokingAllowed",
      Beachfront: "beachfront",
      Waterfall: "waterfall",
      "Ski-in/Ski-out": "skiInSkiOut",
      Hillfront: "hillfront",
      "Allow pets": "allowPets",
      "Instant book": "instantBook",
      "Self check-in": "selfCheckIn",
    };

    const updatedAmenities: Record<string, boolean> = {};
    Object.entries(amenityMap).forEach(([displayName, filterKey]) => {
      updatedAmenities[filterKey] = amenities.includes(displayName);
    });

    setLocalFilters((prev) => ({ ...prev, ...updatedAmenities }));
  };

  const handlePropertyTypesChange = (types: string[]) => {
    setLocalFilters((prev) => ({
      ...prev,
      propertyType: types.length > 0 ? types.join(",") : undefined,
    }));
  };

  const handleAccessibilityChange = (features: string[]) => {
    const accessibilityMap: Record<string, keyof IPropertyFilters> = {
      "Step-free guest entrance": "stepFreeGuestEntrance",
      "Guest entrance wider than 32 inches": "guestEntranceWiderThan32Inches",
      "Step-free path to guest entrance": "stepFreePathToGuestEntrance",
      "Accessible parking spot": "accessibleParkingSpot",
      "Step-free bedroom access": "stepFreeBedroomAccess",
      "Bedroom entrance wider than 32 inches":
        "bedroomEntranceWiderThan32Inches",
      "Step-free bathroom access": "stepFreeBathroomAccess",
      "Bathroom entrance wider than 32 inches":
        "bathroomEntranceWiderThan32Inches",
      "Toilet grab bar": "toiletGrabBar",
      "Shower grab bar": "showerGrabBar",
      "Step-free shower": "stepFreeShower",
      "Shower or bath chair": "showerOrBathChair",
      "Adaptive equipment": "adaptiveEquipment",
      "Ceiling or mobile hoist": "CeilingOrMobileHoist",
    };

    const updatedAccessibility: Record<string, boolean> = {};
    Object.entries(accessibilityMap).forEach(([displayName, filterKey]) => {
      updatedAccessibility[filterKey] = features.includes(displayName);
    });

    setLocalFilters((prev) => ({ ...prev, ...updatedAccessibility }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    setOpen(false);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    onClearFilters();
    setOpen(false);
  };

  const getCurrentPlaceType = (): PlaceType => {
    const typeOfPlace = localFilters.typeOfPlace;
    if (!typeOfPlace || typeOfPlace === "") return "any";
    if (typeOfPlace === "room") return "room";
    if (typeOfPlace === "entire") return "entire";
    return "any";
  };

  const getCurrentSelectedAmenities = (): string[] => {
    const amenities: string[] = [];
    if (localFilters.wifi) amenities.push("WiFi");
    if (localFilters.kitchen) amenities.push("Kitchen");
    if (localFilters.dryer) amenities.push("Dryer");
    if (localFilters.washingMachine) amenities.push("Washing machine");
    if (localFilters.airConditioning) amenities.push("Air conditioning");
    if (localFilters.tv) amenities.push("TV");
    if (localFilters.heating) amenities.push("Heating");
    if (localFilters.pool) amenities.push("Pool");
    if (localFilters.hotTub) amenities.push("Hot tub");
    if (localFilters.gym) amenities.push("Gym");
    if (localFilters.freeParking) amenities.push("Free parking");
    if (localFilters.bbqGrill) amenities.push("BBQ grill");
    if (localFilters.indoorFireplace) amenities.push("Indoor fireplace");
    if (localFilters.breakfast) amenities.push("Breakfast");
    if (localFilters.kingBed) amenities.push("King bed");
    if (localFilters.smokingAllowed) amenities.push("Smoking allowed");
    if (localFilters.beachfront) amenities.push("Beachfront");
    if (localFilters.waterfall) amenities.push("Waterfall");
    if (localFilters.skiInSkiOut) amenities.push("Ski-in/Ski-out");
    if (localFilters.hillfront) amenities.push("Hillfront");
    if (localFilters.allowPets) amenities.push("Allow pets");
    if (localFilters.instantBook) amenities.push("Instant book");
    if (localFilters.selfCheckIn) amenities.push("Self check-in");
    return amenities;
  };

  const getCurrentSelectedPropertyTypes = (): string[] => {
    return localFilters.propertyType
      ? localFilters.propertyType.split(",")
      : [];
  };

  const getCurrentSelectedAccessibilityFeatures = (): string[] => {
    const features: string[] = [];
    if (localFilters.stepFreeGuestEntrance)
      features.push("Step-free guest entrance");
    if (localFilters.guestEntranceWiderThan32Inches)
      features.push("Guest entrance wider than 32 inches");
    if (localFilters.stepFreePathToGuestEntrance)
      features.push("Step-free path to guest entrance");
    if (localFilters.accessibleParkingSpot)
      features.push("Accessible parking spot");
    if (localFilters.stepFreeBedroomAccess)
      features.push("Step-free bedroom access");
    if (localFilters.bedroomEntranceWiderThan32Inches)
      features.push("Bedroom entrance wider than 32 inches");
    if (localFilters.stepFreeBathroomAccess)
      features.push("Step-free bathroom access");
    if (localFilters.bathroomEntranceWiderThan32Inches)
      features.push("Bathroom entrance wider than 32 inches");
    if (localFilters.toiletGrabBar) features.push("Toilet grab bar");
    if (localFilters.showerGrabBar) features.push("Shower grab bar");
    if (localFilters.stepFreeShower) features.push("Step-free shower");
    if (localFilters.showerOrBathChair) features.push("Shower or bath chair");
    if (localFilters.adaptiveEquipment) features.push("Adaptive equipment");
    if (localFilters.CeilingOrMobileHoist)
      features.push("Ceiling or mobile hoist");
    return features;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="shrink-0">
          <ListFilterIcon className="size-5" />
          <span className="ml-1 text-lg">Filter</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[425px]">
        <DialogHeader className="border-b p-3">
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[80vh] pr-3">
          <div className="space-y-6 p-3">
            {/* Type of place */}
            <div className="space-y-3">
              <h3 className="text-base font-medium">Type of place</h3>
              <div className="flex w-full rounded-lg border border-gray-300 p-1">
                <Button
                  variant={
                    getCurrentPlaceType() === "any" ? "outline" : "ghost"
                  }
                  className={`flex-1 rounded-lg ${
                    getCurrentPlaceType() === "any" ? "" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handlePlaceTypeChange("any")}
                >
                  Any type
                </Button>
                <Button
                  variant={
                    getCurrentPlaceType() === "room" ? "outline" : "ghost"
                  }
                  className={`flex-1 rounded-lg ${
                    getCurrentPlaceType() === "room" ? "" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handlePlaceTypeChange("room")}
                >
                  Room
                </Button>
                <Button
                  variant={
                    getCurrentPlaceType() === "entire" ? "outline" : "ghost"
                  }
                  className={`flex-1 rounded-lg ${
                    getCurrentPlaceType() === "entire"
                      ? ""
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handlePlaceTypeChange("entire")}
                >
                  Entire home
                </Button>
              </div>
            </div>

            {/* Price Range */}
            <PriceRangeFilter
              priceRange={[
                localFilters.minPrice || 0,
                localFilters.maxPrice || 30000,
              ]}
              setPriceRange={handlePriceRangeChange}
              min={0}
              max={30000}
            />

            {/* Rooms and beds */}
            <RoomsAndBedsFilter
              bedrooms={localFilters.bedrooms || 0}
              setBedrooms={(value) => handleRoomsChange("bedrooms", value)}
              beds={localFilters.beds || 0}
              setBeds={(value) => handleRoomsChange("beds", value)}
              bathrooms={localFilters.bathrooms || 0}
              setBathrooms={(value) => handleRoomsChange("bathrooms", value)}
            />

            {/* Amenities */}
            <Accordion type="single" collapsible defaultValue="amenities">
              <AccordionItem value="amenities">
                <AccordionTrigger className="text-base font-medium">
                  Amenities
                </AccordionTrigger>
                <AccordionContent>
                  <AmenitiesFilter
                    selectedAmenities={getCurrentSelectedAmenities()}
                    setSelectedAmenities={handleAmenitiesChange}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Property type */}
            <Accordion type="single" collapsible defaultValue="property-type">
              <AccordionItem value="property-type">
                <AccordionTrigger className="text-base font-medium">
                  Property type
                </AccordionTrigger>
                <AccordionContent>
                  <PropertyTypeFilter
                    selectedPropertyTypes={getCurrentSelectedPropertyTypes()}
                    setSelectedPropertyTypes={handlePropertyTypesChange}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Accessibility features */}
            <Accordion type="single" collapsible>
              <AccordionItem value="accessibility">
                <AccordionTrigger className="text-base font-medium">
                  Accessibility features
                </AccordionTrigger>
                <AccordionContent>
                  <AccessibilityFilter
                    selectedFeatures={getCurrentSelectedAccessibilityFeatures()}
                    setSelectedFeatures={handleAccessibilityChange}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>

        {/* Footer with action buttons */}
        <div className="flex gap-3 border-t p-3">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="flex-1"
          >
            Clear all
          </Button>
          <Button onClick={handleApplyFilters} className="flex-1">
            Apply filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
