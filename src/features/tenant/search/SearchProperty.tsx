import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { SearchIcon, XIcon, FilterIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useGetPropertiesQuery } from "./api/queries";
import { FilterDialog } from "./components/FilterDialog";
import {
  ListingCardSkeleton,
  RentalListingCard,
} from "./components/ListingCard";
import { usePropertyFilters } from "./hooks/usePropertyFilters";
import { getActiveFilters } from "./utils/filterConfig";

export default function SearchProperty() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    filters,
    updateFilter,
    updateMultipleFilters,
    clearFilters,
    removeFilter,
  } = usePropertyFilters();

  const { data, isLoading, error } = useGetPropertiesQuery(filters);

  const activeFilters = getActiveFilters(filters);

  const handleRemoveFilter = (key: string) => {
    removeFilter(key as keyof IPropertyFilters);

    // If removing search filter, also clear the search term
    if (key === "search") {
      setSearchTerm("");
    }
  };

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
        <Link to="/tenant/">
          <Button
            variant="outline"
            className="size-9 items-center justify-center rounded-full"
          >
            <XIcon className="text-primary size-5" />
          </Button>
        </Link>

        <img src="/logo-dark.png" alt="Veorent Logo" className="h-8" />
        <div className="border-primary flex w-full items-center border">
          <Input
            placeholder={t("searchProperty.searchRentals")}
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

      <div className="">
        <div className="flex justify-between">
          {/* Results Count */}
          {!isLoading && data && (
            <div className="text-sm text-gray-600">
              {data.length > 0 ? (
                <span>
                  {t("searchProperty.found", { count: data.length })}
                  {activeFilters.length > 0
                    ? t("searchProperty.matchingFilters")
                    : ""}
                </span>
              ) : (
                <span>
                  {t("searchProperty.noProperties")}
                  {activeFilters.length > 0
                    ? t("searchProperty.matchingFilters")
                    : ""}
                </span>
              )}
            </div>
          )}

          {/* Active Filters Display */}
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2">
              <FilterIcon className="size-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {t("searchProperty.activeFilters", {
                  count: activeFilters.length,
                })}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-primary hover:text-primary-foreground h-6 px-2 py-0 text-xs"
              >
                {t("searchProperty.clearAll")}
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {activeFilters?.length
            ? activeFilters.map(({ key, label }) => (
                <Badge
                  key={key}
                  variant="secondary"
                  className="flex items-center gap-1 px-2 py-1 pr-1"
                >
                  <span className="text-xs">{label}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRemoveFilter(key);
                    }}
                    className="ml-1 flex h-4 w-4 items-center justify-center rounded-full hover:bg-gray-300 focus:ring-1 focus:ring-gray-400 focus:outline-none"
                    aria-label={`Remove ${label} filter`}
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </Badge>
              ))
            : ""}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="flex items-center justify-center py-8">
          <div className="text-lg text-red-500">
            {t("searchProperty.errorLoading")}
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
              {t("searchProperty.noPropertiesCriteria")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
