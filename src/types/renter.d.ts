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
