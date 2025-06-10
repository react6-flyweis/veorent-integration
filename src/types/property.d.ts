interface IAddressDetails {
  houseNumber: string;
  streetAddress: string;
  city: string;
  region: string;
  zipCode: string;
}

interface IPropertyDetails {
  streetAddress: string;
  unitNumber: string;
  city: string;
  region: string;
  zipCode: string;
}

interface IRentalDetails {
  beds: number;
  baths: number;
  apartmentUnit: number;
  studioUnit: number;
  roomsUnit: number;
  targetRent: number;
  targetDeposite: number;
}

interface IPropertySize {
  beds: number;
  baths: number;
  squareFeet: number;
  yearBuilt: number;
}

interface ILeasingBasics {
  Date: string;
  desiredLeaseTerm: string;
  targetRent: number;
  targetDeposit: number;
}

interface IPermission {
  smoking: "Yes" | "No";
  pets: boolean;
  occupancyLimits: boolean;
  occupancyLimitsCount?: string;
}

interface IAmenities {
  cable: boolean;
  internet: boolean;
  electricty: boolean;
  satelliteTv: boolean;
  garbage: boolean;
  sewage: boolean;
  gas: boolean;
  water: boolean;
  accessibility: boolean;
  alarmSystem: boolean;
  biCycleParking: boolean;
  cableReady: boolean;
  fencedyard: boolean;
  firePlace: boolean;
  fitnessCenter: boolean;
  furnished: boolean;
  garage: boolean;
  hotTub: boolean;
  intercom: boolean;
  laundryHookups: boolean;
  lawn: boolean;
  nearPark: boolean;
  offStreetParking: boolean;
  onSiteLaundry: boolean;
  secureBuilding: boolean;
  securityCameras: boolean;
  swimmingPool: boolean;
  vaultedCeiling: boolean;
  wiredFromInternet: boolean;
  dishwasher: boolean;
  dryer: boolean;
  freezer: boolean;
  garbageDisposal: boolean;
  microwave: boolean;
  oven: boolean;
  refrigerator: boolean;
  washer: boolean;
  carPet: boolean;
  concrete: boolean;
  hardWood: boolean;
  laminate: boolean;
  linoleum: boolean;
  slate: boolean;
  softWood: boolean;
  tile: boolean;
  other: boolean;
  airCondition: boolean;
  heating: boolean;
  wifi: boolean;
}

interface ILocation {
  type: "Point";
  coordinates: [number, number];
}

interface IPropertyImage {
  img: string;
  _id: string;
}
interface IFormCompletionStatus {
  addressDetails: boolean;
  propertyDetails: boolean;
  rentalDetails: boolean;
  propertySize: boolean;
  leasingBasics: boolean;
  amenities: boolean;
  permission: boolean;
}
interface IProperty {
  _id: string;
  addressDetails?: IAddressDetails;
  propertyDetails?: IPropertyDetails;
  rentalDetails?: IRentalDetails;
  propertySize?: IPropertySize;
  leasingBasics?: ILeasingBasics;
  permission?: IPermission;
  amenities?: IAmenities;
  currentLocation?: ILocation;
  owner: IUser;
  propertyTypeId: IPropertyType;
  name?: string;
  description?: string;
  isRoomRental: boolean;
  image: IPropertyImage[];
  video: IPropertyImage[];
  isPublishListing: boolean;
  formCompletionStatus?: IFormCompletionStatus;
  isMarketing: boolean;
  marketingExtendedDate: string; // ISO date string
  isMarketingExtended?: false;
  rating?: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IPropertyType {
  _id: string;
  name: string;
  image: string;
  status: boolean;
  __v: number;
}

interface IPropertyCreateData {
  name: string;
  description: string;
  propertyTypeId: string;
  isRoomRental: boolean;
  propertyDetails: IPropertyDetails;
  rentalDetails: IRentalDetails;
}

interface IPropertyUpdateData {
  propertyTypeId?: string;
  name?: string;
  description?: string;
  price?: number;
  addressDetails?: IAddressDetails;
  propertyDetails?: IPropertyDetails;
  rentalDetails?: IRentalDetails;
  propertySize?: IPropertySize;
  leasingBasics?: ILeasingBasics;
  permission?: IPermission;
  isRoomRental?: boolean;
  amenities?: IAmenities;
  currentLocation?: ILocation;
  image?: IPropertyImage[];
  video?: IPropertyImage[];
  status?: string; // enum: ['Available', 'Rented', 'Under Maintenance']
}
