interface ILead {
  _id: string;
  propertyInterested: IProperty;
  fullName: string;
  renterEmail: string;
  phoneNumber: string;
  status: "new" | "invited" | "selected";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v?: number; // Optional version key
}

interface ILeadCreateData {
  propertyInterested: string; // Property ID
  fullName: string;
  renterEmail: string;
  phoneNumber: string;
}

interface ILeadsResponse {
  status: boolean;
  message: string;
  leads: ILead[];
}
interface ILeadResponse {
  status: boolean;
  message: string;
  lead: ILead;
}

interface IPropertyShortDetail {
  streetAddress: string;
  unitNumber?: string;
  city: string;
  region: string;
  zipCode: string;
  beds: number;
  baths: number;
  squareFeet: number;
  yearBuilt?: number;
}

interface IApplicant {
  _id: string;
  currentProperty: IPropertyShortDetail;
  currentPropertyLeaseTerm: ILeaseTerm;
  destinationProperty: IPropertyShortDetail;
  destinationPropertyLeaseTerm: ILeaseTerm;
  lease: Omit<ILease, "rentalProperty">; // Omit rentalProperty
  userId: IUser;
  moveDate: string; // ISO date string
  moveTime: string; // e.g., "10:00 AM"
  flexibleTimings: boolean;
  avalibleUnit?: string; // Optional, e.g., "2A"
  allocateUnit?: string; // Optional, e.g., "2A"
  otherApplicants?: string; // Optional, e.g., "Keep-As-An-Active-Applicant"
  status: "In Progress" | "Completed" | "Cancelled"; // Example statuses
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v?: number; // Optional version key
}
