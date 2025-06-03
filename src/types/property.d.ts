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
  targetDeposite: number;
}

interface IPermission {
  smoking: string;
  pets: boolean;
  occupancyLimits: boolean;
}

interface IAmenities {
  cable: boolean;
  internet: boolean;
  electricty: boolean;
  sateliteTv: boolean;
  garbage: boolean;
  sewage: boolean;
  gas: boolean;
  water: boolean;
  acessibility: boolean;
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
  loundryHookups: boolean;
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

interface IGoal {
  // Add specific goal properties when they become known
  id: string;
  name: string;
}

interface IReferralLevel {
  // Add specific referral level properties when they become known
  level: number;
  reward: number;
}

interface ITenant {
  // Add specific tenant properties when they become known
  id: string;
  name: string;
}

interface IPropertyOwner {
  _id: string;
  userId: string;
  goals: IGoal[];
  image: string;
  email: string;
  password: string;
  otp: string;
  otpExpiration: string;
  accountVerification: boolean;
  completeProfile: boolean;
  roomRentals: boolean;
  userType: string;
  refferalCode: string;
  referredBy: null | string;
  wallet: number;
  isVerified: boolean;
  status: boolean;
  documentVerification: string;
  notificationPreference: boolean;
  referralLevels: IReferralLevel[];
  tenants: ITenant[];
  dummyImage: IPropertyImage[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  mobileNumber: string;
  fullName: string;
}

interface IPropertyType {
  _id: string;
  name: string;
  image: string;
  status: boolean;
  __v: number;
}

interface IProperty {
  _id: string;
  addressDetails: IAddressDetails;
  propertyDetails: IPropertyDetails;
  rentalDetails: IRentalDetails;
  propertySize: IPropertySize;
  leasingBasics: ILeasingBasics;
  permission: IPermission;
  amenities: IAmenities;
  currentLocation: ILocation;
  owner: IPropertyOwner;
  propertyTypeId: IPropertyType;
  name: string;
  description: string;
  isRoomRental: boolean;
  image: IPropertyImage[];
  video: IPropertyImage[];
  isPublishListing: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
