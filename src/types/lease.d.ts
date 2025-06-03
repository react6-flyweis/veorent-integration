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
