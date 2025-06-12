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
