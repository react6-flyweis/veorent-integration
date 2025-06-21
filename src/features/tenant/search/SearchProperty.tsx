import { useState } from "react";
import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useGetPropertiesQuery } from "./api/queries";
import { FilterDialog } from "./components/FilterDialog";
import {
  ListingCardSkeleton,
  RentalListingCard,
} from "./components/ListingCard";
import { usePropertyFilters } from "./hooks/usePropertyFilters";

export default function SearchProperty() {
  const [searchTerm, setSearchTerm] = useState("");
  const { filters, updateFilter, updateMultipleFilters, clearFilters } =
    usePropertyFilters();

  const { data, isLoading, error } = useGetPropertiesQuery(filters);

  const handleSearch = () => {
    updateFilter("search", searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleFiltersChange = (newFilters: Partial<IPropertyFilters>) => {
    updateMultipleFilters(newFilters);
  };

  const handleClearFilters = () => {
    clearFilters();
    setSearchTerm("");
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <img src="/logo-dark.png" alt="Veorent Logo" className="h-8" />
        <div className="border-primary flex w-full items-center border">
          <Input
            placeholder="Search rentals..."
            className="w-full border-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            size="icon"
            className="rounded-none border-0"
            onClick={handleSearch}
          >
            <SearchIcon className="size-4" />
          </Button>
        </div>
        <FilterDialog
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Error state */}
      {error && (
        <div className="flex items-center justify-center py-8">
          <div className="text-lg text-red-500">
            Error loading properties. Please try again.
          </div>
        </div>
      )}

      {/* Listings */}
      <div className="space-y-4">
        {isLoading ? (
          // Show skeleton loading
          Array.from({ length: 5 }).map((_, index) => (
            <ListingCardSkeleton key={index} />
          ))
        ) : data?.length ? (
          data.map((listing) => (
            <RentalListingCard key={listing._id} data={listing} />
          ))
        ) : (
          <div className="flex items-center justify-center py-8">
            <div className="text-lg text-gray-500">
              No properties found matching your criteria.
            </div>
          </div>
        )}
      </div>

      {/* Applied filters indicator */}
      {Object.keys(filters).length > 2 && ( // More than just page and limit
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Filters applied</span>
          <Button
            variant="link"
            size="sm"
            onClick={handleClearFilters}
            className="h-auto p-0"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
