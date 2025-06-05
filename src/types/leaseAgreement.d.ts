interface IPropertyAddress {
  streetAddress: string;
  unit?: string;
  city: string;
  region: string;
  zipCode: string;
}

interface ILeaseTerm {
  termType: "Fixed Term" | "Month-to-Month";
  startDate: string;
  endDate?: string;
}

interface IRentDepositAndFee {
  monthlyRent: number;
  petRent?: boolean;
  proratedRent?: boolean;
  securityDeposit: number;
  otherDeposit?: number;
  petDeposit?: boolean;
  oneTimeFees?: boolean;
  bankAccount: string;
  paymentMethod: string;
}

interface IPeopleOnTheLease {
  renters: string; // Name of the primary renter(s)
  additionalOccupants: boolean; // Indicates if there are additional occupants
  fullName?: string;
  relationship?: string;
  age?: string;
  EntityType: "Individual" | "Company";
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  companyName?: string;
  companyEmail?: string;
  companyPhone?: string;
  streetAddress?: string;
  unit?: string;
  city?: string;
  region?: string;
  zipCode?: string;
  poBox: boolean;
  poBoxstreetAddress?: string;
  poBoxunit?: string;
  poBoxcity?: string;
  poBoxregion?: string;
  poBoxzipCode?: string;
  signers: boolean;
  legalFirstName: string;
  legalLastName: string;
  legalEmail: string;
}

interface IPetsSmokingAndOther {
  pets: boolean;
  typeOfPet?: string;
  petBreed?: string;
  petWeight?: string;
  petAge?: string;
  smoking: boolean;
  parking: boolean;
  isGarage?: boolean;
  isDriveway?: boolean;
  isStreet?: boolean;
  isCarport?: boolean;
  isDesignatedSpace?: boolean;
  isOther?: boolean;
  renterInsurance: boolean;
}

interface IUtilitiesServiceAndKeys {
  electricity: string;
  internet: string;
  water: string;
  cable: string;
  gas: string;
  trash: string;
  sewer: string;
  lawnCare: string;
  snowRemoval: string;
  hoa: string;
  keys: string;
  copies: string;
  maintenance: string;
}

interface IProvisionsAndAttachments {
  additionalTerm: string;
  attachment: string;
}

interface ILeaseDetail {
  propertyAddress: IPropertyAddress;
  leaseTerm: ILeaseTerm;
  rentDepositAndFee: IRentDepositAndFee;
  peopleOnTheLease: IPeopleOnTheLease;
  petsSmokingAndOther: IPetsSmokingAndOther;
  utilitiesServiceAndKeys: IUtilitiesServiceAndKeys;
  ProvisionsAndAttachments: IProvisionsAndAttachments;
  _id: string;
  lease: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
