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
