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

interface IRentalDetails {
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
  referralCode: string;
  refferalCode?: string; // Legacy field
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
}

interface IUserFullDetails extends IUser {
  addressDetails?: IAddressDetails;
  propertyDetails?: IPropertyDetails;
  rentalDetails?: IRentalDetails;
  memberSince: string;
}
