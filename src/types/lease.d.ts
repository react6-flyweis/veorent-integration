interface IPropertyAddress {
  streetAddress: string;
  unit: string;
  city: string;
  region: string;
  zipCode: string;
}

interface ILeaseTerm {
  termType: string;
  startDate: string;
}

interface IRentDepositAndFee {
  monthlyRent: number;
  petRent: boolean;
  proratedRent: boolean;
  securityDeposit: number;
  otherDeposit: number;
  petDeposite: boolean;
  oneTimeFees: boolean;
  banckAccount: string;
  paymentMethod: string;
}

interface IPeopleOnTheLease {
  renters: string;
  additionalOccupants: boolean;
  EntitityType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  unit: string;
  city: string;
  region: string;
  zipCode: string;
  poBox: boolean;
  signers: boolean;
}

interface IPetsSmokingAndOther {
  ptes: boolean;
  smoking: boolean;
  parking: boolean;
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
  attachement: string;
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
