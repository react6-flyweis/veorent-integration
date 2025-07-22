interface IBooking {
  propertyId: string | IProperty;
  userId: string | IUser;
  applyingFor: "Tenant" | "Co-signer";
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
  };
  applicationInfo?: {
    moveDate: string;
    othersApplyWithYou: boolean;
    shortTimeOfPeriod: boolean;
    fromDate: string;
    endDate: string;
    peopleLivingCount: string;
  };
  currentAddress?: {
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
    pastAddressNotApplicable: boolean;
  };
  pastAddress?: {
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
  };
  employment?: {
    currentEmployer: boolean;
    employer: string;
    occuption: string;
    month: string;
    year: string;
    income: string;
    employemntReferenceName: string;
    employemntReferenceNumber: string;
    pastemployemntNotApplicable: boolean;
  };
  pastEmployment?: {
    currentEmployer: boolean;
    employer: string;
    occuption: string;
    month: string;
    year: string;
    income: string;
    employemntReferenceName: string;
    employemntReferenceNumber: string;
  };
  otherIncome?: {
    otherSourceOfIncome: boolean;
    source: string;
    monthlyIncome: string;
    bank: string;
  };
  generalInformation?: {
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
  };
  background?: {
    criminalOffenseExplain: string;
    civilSuitExplain: string;
  };
  emergencyContact?: {
    fullName: string;
    relationShip: string;
    phoneNumber: string;
    comment: string;
    findProperty: string;
  };
  document?: {
    photo: string;
    incomeProof: string;
    otherDoc: string;
    comment: string;
  };
  depositedMoney: number;
  price: number;
  lateFee: number;
  taxAmount: number;
  totalAmount: number;
  isWalletUsed: boolean;
  isCouponApplied: boolean;
  status: "Pending" | "Approved" | "Canceled";
  paymentStatus: "Pending" | "Paid" | "Canceled";
  paymentMode?: "stripe" | "momo" | "orange-money";
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IBookingCreateData {
  applyingFor: "Tenant" | "Co-signer";
  paymentMode: "stripe";
  propertyId: string;
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
  };
}
