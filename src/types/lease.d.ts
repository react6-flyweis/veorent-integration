interface ILease {
  _id: string;
  rentalProperty: IProperty;
  leaseNickname: string;
  startDate: string;
  endDate: string;
  monthToMonth: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ILeaseCreateData {
  rentalProperty: string; // ID of the rental property
  leaseNickname: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  monthToMonth: boolean;
}

interface ILeaseAddendumCreateData {
  property: string; // ID of the rental property
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  monthlyRent: boolean;
  monthlyRentPrice: string;
  deposits: boolean;
  securityDeposite: string;
  petDeposit: string;
  otherDeposit: string;
  otherAmendments: boolean;
  otherAmendmentsText: string;
  effectiveDate: string; // ISO date string
}
