// Centralized filter configuration and utilities

export interface FilterConfig {
  key: keyof IPropertyFilters;
  displayName: string;
  formatValue?: (value: unknown) => string;
  type: "boolean" | "number" | "string" | "array";
}

// Amenities mapping
export const AMENITIES_CONFIG: FilterConfig[] = [
  { key: "wifi", displayName: "WiFi", type: "boolean" },
  { key: "kitchen", displayName: "Kitchen", type: "boolean" },
  { key: "dryer", displayName: "Dryer", type: "boolean" },
  { key: "washingMachine", displayName: "Washing machine", type: "boolean" },
  { key: "airConditioning", displayName: "Air conditioning", type: "boolean" },
  { key: "tv", displayName: "TV", type: "boolean" },
  { key: "heating", displayName: "Heating", type: "boolean" },
  { key: "pool", displayName: "Pool", type: "boolean" },
  { key: "hotTub", displayName: "Hot tub", type: "boolean" },
  { key: "gym", displayName: "Gym", type: "boolean" },
  { key: "freeParking", displayName: "Free parking", type: "boolean" },
  { key: "bbqGrill", displayName: "BBQ grill", type: "boolean" },
  { key: "indoorFireplace", displayName: "Indoor fireplace", type: "boolean" },
  { key: "breakfast", displayName: "Breakfast", type: "boolean" },
  { key: "kingBed", displayName: "King bed", type: "boolean" },
  { key: "smokingAllowed", displayName: "Smoking allowed", type: "boolean" },
  { key: "beachfront", displayName: "Beachfront", type: "boolean" },
  { key: "waterfall", displayName: "Waterfall", type: "boolean" },
  { key: "skiInSkiOut", displayName: "Ski-in/Ski-out", type: "boolean" },
  { key: "hillfront", displayName: "Hillfront", type: "boolean" },
  { key: "allowPets", displayName: "Allow pets", type: "boolean" },
  { key: "instantBook", displayName: "Instant book", type: "boolean" },
  { key: "selfCheckIn", displayName: "Self check-in", type: "boolean" },
];

// Accessibility features mapping
export const ACCESSIBILITY_CONFIG: FilterConfig[] = [
  {
    key: "stepFreeGuestEntrance",
    displayName: "Step-free guest entrance",
    type: "boolean",
  },
  {
    key: "guestEntranceWiderThan32Inches",
    displayName: "Guest entrance wider than 32 inches",
    type: "boolean",
  },
  {
    key: "stepFreePathToGuestEntrance",
    displayName: "Step-free path to guest entrance",
    type: "boolean",
  },
  {
    key: "accessibleParkingSpot",
    displayName: "Accessible parking spot",
    type: "boolean",
  },
  {
    key: "stepFreeBedroomAccess",
    displayName: "Step-free bedroom access",
    type: "boolean",
  },
  {
    key: "bedroomEntranceWiderThan32Inches",
    displayName: "Bedroom entrance wider than 32 inches",
    type: "boolean",
  },
  {
    key: "stepFreeBathroomAccess",
    displayName: "Step-free bathroom access",
    type: "boolean",
  },
  {
    key: "bathroomEntranceWiderThan32Inches",
    displayName: "Bathroom entrance wider than 32 inches",
    type: "boolean",
  },
  { key: "toiletGrabBar", displayName: "Toilet grab bar", type: "boolean" },
  { key: "showerGrabBar", displayName: "Shower grab bar", type: "boolean" },
  { key: "stepFreeShower", displayName: "Step-free shower", type: "boolean" },
  {
    key: "showerOrBathChair",
    displayName: "Shower or bath chair",
    type: "boolean",
  },
  {
    key: "adaptiveEquipment",
    displayName: "Adaptive equipment",
    type: "boolean",
  },
  {
    key: "CeilingOrMobileHoist",
    displayName: "Ceiling or mobile hoist",
    type: "boolean",
  },
];

// All filter configurations
export const ALL_FILTERS_CONFIG: FilterConfig[] = [
  {
    key: "search",
    displayName: "Search",
    type: "string",
    formatValue: (value) => `"${String(value)}"`,
  },
  {
    key: "minPrice",
    displayName: "Min Price",
    type: "number",
    formatValue: (value) => `Min: $${Number(value)}`,
  },
  {
    key: "maxPrice",
    displayName: "Max Price",
    type: "number",
    formatValue: (value) => `Max: $${Number(value)}`,
  },
  {
    key: "bedrooms",
    displayName: "Bedrooms",
    type: "number",
    formatValue: (value) => {
      const num = Number(value);
      return `${num} bed${num > 1 ? "s" : ""}`;
    },
  },
  {
    key: "beds",
    displayName: "Beds",
    type: "number",
    formatValue: (value) => {
      const num = Number(value);
      return `${num} bed${num > 1 ? "s" : ""}`;
    },
  },
  {
    key: "bathrooms",
    displayName: "Bathrooms",
    type: "number",
    formatValue: (value) => {
      const num = Number(value);
      return `${num} bath${num > 1 ? "s" : ""}`;
    },
  },
  {
    key: "typeOfPlace",
    displayName: "Type of Place",
    type: "string",
    formatValue: (value) => {
      const str = String(value);
      if (str === "room") return "Room";
      if (str === "entire") return "Entire home";
      return str;
    },
  },
  {
    key: "city",
    displayName: "City",
    type: "string",
    formatValue: (value) => String(value),
  },
  {
    key: "region",
    displayName: "Region",
    type: "string",
    formatValue: (value) => String(value),
  },
  {
    key: "country",
    displayName: "Country",
    type: "string",
    formatValue: (value) => String(value),
  },
  {
    key: "propertyType",
    displayName: "Property Type",
    type: "string",
    formatValue: (value) => String(value),
  },
  ...AMENITIES_CONFIG,
  ...ACCESSIBILITY_CONFIG,
];

// Utility functions
export const formatFilterValue = (key: string, value: unknown): string => {
  const config = ALL_FILTERS_CONFIG.find((f) => f.key === key);

  if (config?.formatValue) {
    return config.formatValue(value);
  }

  if (config?.type === "boolean" && value) {
    return config.displayName;
  }

  return String(value);
};

export const getActiveFilters = (filters: IPropertyFilters) => {
  const excludeKeys = ["page", "limit"];
  return Object.entries(filters)
    .filter(
      ([key, value]) =>
        !excludeKeys.includes(key) &&
        value !== undefined &&
        value !== "" &&
        value !== null &&
        value !== false, // Exclude false boolean values
    )
    .map(([key, value]) => ({
      key,
      value,
      label: formatFilterValue(key, value),
    }));
};

// Helper functions for FilterDialog
export const getSelectedAmenities = (filters: IPropertyFilters): string[] => {
  return AMENITIES_CONFIG.filter((config) => filters[config.key]).map(
    (config) => config.displayName,
  );
};

export const getSelectedAccessibilityFeatures = (
  filters: IPropertyFilters,
): string[] => {
  return ACCESSIBILITY_CONFIG.filter((config) => filters[config.key]).map(
    (config) => config.displayName,
  );
};

export const mapAmenitiesToFilters = (
  amenities: string[],
): Partial<IPropertyFilters> => {
  const result: Record<string, boolean> = {};

  AMENITIES_CONFIG.forEach((config) => {
    result[config.key] = amenities.includes(config.displayName);
  });

  return result as Partial<IPropertyFilters>;
};

export const mapAccessibilityToFilters = (
  features: string[],
): Partial<IPropertyFilters> => {
  const result: Record<string, boolean> = {};

  ACCESSIBILITY_CONFIG.forEach((config) => {
    result[config.key] = features.includes(config.displayName);
  });

  return result as Partial<IPropertyFilters>;
};
