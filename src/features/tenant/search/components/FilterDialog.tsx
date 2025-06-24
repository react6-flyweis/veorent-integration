import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { AccessibilityFilter } from "./AccessibilityFilter";
import { AmenitiesFilter } from "./AmenitiesFilter";
import { LocationFilter } from "./LocationFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { PropertyTypeFilter } from "./PropertyTypeFilter";
import { RoomsAndBedsFilter } from "./RoomsAndBedsFilter";
import {
  getSelectedAmenities,
  getSelectedAccessibilityFeatures,
  mapAmenitiesToFilters,
  mapAccessibilityToFilters,
} from "../utils/filterConfig";

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
  const { t } = useTranslation();

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
    const amenityFilters = mapAmenitiesToFilters(amenities);
    setLocalFilters((prev) => ({ ...prev, ...amenityFilters }));
  };

  const handlePropertyTypesChange = (types: string[]) => {
    setLocalFilters((prev) => ({
      ...prev,
      propertyType: types.length > 0 ? types.join(",") : undefined,
    }));
  };

  const handleAccessibilityChange = (features: string[]) => {
    const accessibilityFilters = mapAccessibilityToFilters(features);
    setLocalFilters((prev) => ({ ...prev, ...accessibilityFilters }));
  };

  const handleLocationChange = (location: {
    city?: string;
    region?: string;
    country?: string;
  }) => {
    setLocalFilters((prev) => ({ ...prev, ...location }));
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
    return getSelectedAmenities(localFilters);
  };

  const getCurrentSelectedPropertyTypes = (): string[] => {
    return localFilters.propertyType
      ? localFilters.propertyType.split(",")
      : [];
  };

  const getCurrentSelectedAccessibilityFeatures = (): string[] => {
    return getSelectedAccessibilityFeatures(localFilters);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="shrink-0">
          <ListFilterIcon className="size-5" />
          <span className="ml-1 text-lg">{t("filter")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-hidden p-0 sm:max-w-[425px]">
        <DialogHeader className="border-b p-3">
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[66vh] pr-3">
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
                  {t("amenities")}
                </AccordionTrigger>
                <AccordionContent>
                  <AmenitiesFilter
                    selectedAmenities={getCurrentSelectedAmenities()}
                    setSelectedAmenities={handleAmenitiesChange}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Location */}
            <div className="space-y-3">
              <h3 className="text-base font-medium">{t("location")}</h3>
              <LocationFilter
                city={localFilters.city}
                region={localFilters.region}
                country={localFilters.country}
                onLocationChange={handleLocationChange}
              />
            </div>

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
        <DialogFooter className="flex gap-3 border-t p-3">
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
