import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListFilterIcon } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { RoomsAndBedsFilter } from "./RoomsAndBedsFilter";
import { AmenitiesFilter } from "./AmenitiesFilter";
import { AccessibilityFilter } from "./AccessibilityFilter";
import { PropertyTypeFilter } from "./PropertyTypeFilter";

type PlaceType = "any" | "room" | "entire";

export const FilterDialog = () => {
  const [open, setOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([840, 25000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [beds, setBeds] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [placeType, setPlaceType] = useState<PlaceType>("any");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedAccessibilityFeatures, setSelectedAccessibilityFeatures] =
    useState<string[]>([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>(
    [],
  );

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
                  variant={placeType === "any" ? "outline" : "ghost"}
                  className={`flex-1 rounded-lg ${
                    placeType === "any" ? "" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setPlaceType("any")}
                >
                  Any type
                </Button>
                <Button
                  variant={placeType === "room" ? "outline" : "ghost"}
                  className={`flex-1 rounded-lg ${
                    placeType === "room" ? "" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setPlaceType("room")}
                >
                  Room
                </Button>
                <Button
                  variant={placeType === "entire" ? "outline" : "ghost"}
                  className={`flex-1 rounded-lg ${
                    placeType === "entire" ? "" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setPlaceType("entire")}
                >
                  Entire home
                </Button>
              </div>
            </div>

            {/* Price Range */}
            <PriceRangeFilter
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              min={0}
              max={30000}
            />

            {/* Rooms and beds - Using our new component */}
            <RoomsAndBedsFilter
              bedrooms={bedrooms}
              setBedrooms={setBedrooms}
              beds={beds}
              setBeds={setBeds}
              bathrooms={bathrooms}
              setBathrooms={setBathrooms}
            />

            {/* Amenities - Using our new component */}
            <Accordion type="single" collapsible defaultValue="amenities">
              <AccordionItem value="amenities">
                <AccordionTrigger className="text-base font-medium">
                  Amenities
                </AccordionTrigger>
                <AccordionContent>
                  <AmenitiesFilter
                    selectedAmenities={selectedAmenities}
                    setSelectedAmenities={setSelectedAmenities}
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
                    selectedPropertyTypes={selectedPropertyTypes}
                    setSelectedPropertyTypes={setSelectedPropertyTypes}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Accessibility features - Using our new component */}
            <Accordion type="single" collapsible>
              <AccordionItem value="accessibility">
                <AccordionTrigger className="text-base font-medium">
                  Accessibility features
                </AccordionTrigger>
                <AccordionContent>
                  <AccessibilityFilter
                    selectedFeatures={selectedAccessibilityFeatures}
                    setSelectedFeatures={setSelectedAccessibilityFeatures}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
