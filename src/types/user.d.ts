interface IGoal {
  _id: string;
  selectedAt: string;
}

interface ITenant {
  user: IUser;
  dateJoined: string;
  _id: string;
}
interface IDummyImage {
  img: string;
  _id: string;
}

interface IRentalDetailsShort {
  beds: number;
  baths: number;
  squareFeet: number;
  yearBuilt: number;
}

interface IUser {
  _id: string;
  userId: string;
  businessId?: string;
  goals: IGoal[];
  image?: string | null;
  email: string;
  password: string;
  otp: string;
  otpExpiration: string;
  accountVerification: boolean;
  completeProfile: boolean;
  roomRentals: boolean;
  userType: "USER" | "PARTNER";
  // referralCode: string;
  refferalCode?: string;
  referredBy: string | null;
  invitedBy?: string;
  invitedDate?: string | null;
  wallet: number;
  isVerified: boolean;
  status: boolean;
  documentVerification: "PENDING" | "APPROVED" | "REJECTED";
  notificationPreference: boolean;
  referralLevels: unknown[];
  tenants: ITenant[];
  dummyImage: IDummyImage[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  mobileNumber?: string;
  fullName?: string;
  firstname: string;
  lastname: string;
  propertyCount: string;
  propertyTypeId?: string;
  rentalProcessId?: string;
  company?: string;
  companyLogo?: string;
}

interface IUserFullDetails extends IUser {
  addressDetails?: IAddressDetails;
  propertyDetails?: IPropertyDetails;
  rentalDetails?: IRentalDetailsShort;
  memberSince: string;
}

interface INewLandlordUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  goals: {
    goalId: string;
    selectedOptionId: string;
  }[];
  propertyCount: string;
  businessId: string;
  propertyTypeId: string;
  rentalProcessId: string;
  referralCode?: string; // Optional, if not provided, will be handled in the backend
}

interface INewTenantUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IRegisterResponse {
  status: number;
  data: string; // jwt token
  savedUser: IUser;
}
