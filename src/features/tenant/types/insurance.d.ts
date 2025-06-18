interface IInsurancePlan {
  _id: string;
  planName: string;
  coverAmount: number;
  description: string;
  coverageDetails: {
    coverageType: string;
    isCovered: boolean;
    _id: string;
  }[];
  status: string;
  createdAt: string;
  updatedAt: string;
  premium: {
    monthlyPremium: number;
    annualPremium: number;
  };
  logo: string;
  additionalPlans: number;
}

interface IInsurancePurchase {
  insurancePlanId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyTypeId: string;
  propertyDetails: {
    streetAddress: string;
    unitNumber: string;
    city: string;
    region: string;
    zipCode: string;
    beds: number;
    baths: number;
    squareFeet: number;
    yearBuilt: number;
  };
  startDate: string;
  // endDate: string;
  premiumPaymentMode: string;
  // totalPremiumPaid: number;
  policyNumber: string;
  status: string;
  paymentStatus: string;
}
