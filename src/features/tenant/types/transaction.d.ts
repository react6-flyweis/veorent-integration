interface IPersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

interface IApplicationInfo {
  moveDate: string;
  othersApplyWithYou: boolean;
  shortTimeOfPeriod: boolean;
  fromDate: string;
  endDate: string;
  peopleLivingCount: string;
}

interface IAddress {
  residence: string;
  month: string;
  year: boolean;
  streetAddress: string;
  unit: string;
  city: string;
  region: string;
  zipCode: string;
  monthlyRent: string;
  whyMove: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pastAddressNotApplicable?: boolean;
}

interface IEmployment {
  currentEmployer: boolean;
  employer: string;
  occuption: string;
  month: string;
  year: string;
  income: string;
  employemntReferenceName: string;
  employemntReferenceNumber: string;
  pastemployemntNotApplicable?: boolean;
}

interface IOtherIncome {
  otherSourceOfIncome: boolean;
  source: string;
  monthlyIncome: string;
  bank: string;
}

interface IGeneralInformation {
  animalLiving: boolean;
  typeOfanimal: string;
  breed: string;
  age: string;
  weight: string;
  vehicleAtTheProperty: boolean;
  make: string;
  model: string;
  color: string;
  year: string;
  licensePlate: string;
  smoke: string;
  specialRequests: boolean;
  specialRequestsExplain: string;
}

interface IBackground {
  criminalOffenseExplain: string;
  civilSuitExplain: string;
}

interface IEmergencyContact {
  fullName: string;
  relationShip: string;
  phoneNumber: string;
  comment: string;
  findProperty: string;
}

interface IDocument {
  photo: string;
  incomeProof: string;
  otherDoc: string;
  comment: string;
}

interface IBooking {
  _id: string;
  propertyId: string;
  userId: string;
  applyingFor: string;
  depositedMoney: number;
  price: number;
  taxAmount: number;
  totalAmount: number;
  isWalletUsed: boolean;
  isCouponApplied: boolean;
  status: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lateFee: number;
  personalDetails: IPersonalDetails;
  applicationInfo: IApplicationInfo;
  currentAddress: IAddress;
  pastAddress: IAddress;
  employment: IEmployment;
  pastEmployment: IEmployment;
  otherIncome: IOtherIncome;
  generalInformation: IGeneralInformation;
  background: IBackground;
  emergencyContact: IEmergencyContact;
  document: IDocument;
}

interface ITransaction {
  _id: string;
  user: IUser;
  booking: IBooking;
  cr: boolean;
  dr: boolean;
  type: string;
  amount: number;
  details: string;
  paymentMode: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
