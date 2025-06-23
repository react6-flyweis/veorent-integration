interface IPropertyFilters {
  search?: string;
  typeOfPlace?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  beds?: number;
  bathrooms?: number;

  // Location filters
  city?: string;
  region?: string;
  country?: string;

  // Amenities
  wifi?: boolean;
  kitchen?: boolean;
  dryer?: boolean;
  washingMachine?: boolean;
  airConditioning?: boolean;
  tv?: boolean;
  heating?: boolean;
  pool?: boolean;
  hotTub?: boolean;
  gym?: boolean;
  freeParking?: boolean;
  bbqGrill?: boolean;
  indoorFireplace?: boolean;
  breakfast?: boolean;
  kingBed?: boolean;
  smokingAllowed?: boolean;
  beachfront?: boolean;
  waterfall?: boolean;
  skiInSkiOut?: boolean;
  hillfront?: boolean;
  allowPets?: boolean;
  instantBook?: boolean;
  selfCheckIn?: boolean;

  // Property type
  propertyType?: string;

  // Accessibility features
  stepFreeGuestEntrance?: boolean;
  guestEntranceWiderThan32Inches?: boolean;
  stepFreePathToGuestEntrance?: boolean;
  accessibleParkingSpot?: boolean;
  stepFreeBedroomAccess?: boolean;
  bedroomEntranceWiderThan32Inches?: boolean;
  stepFreeBathroomAccess?: boolean;
  bathroomEntranceWiderThan32Inches?: boolean;
  toiletGrabBar?: boolean;
  showerGrabBar?: boolean;
  stepFreeShower?: boolean;
  showerOrBathChair?: boolean;
  adaptiveEquipment?: boolean;
  CeilingOrMobileHoist?: boolean;

  // Pagination
  page?: number;
  limit?: number;
}
