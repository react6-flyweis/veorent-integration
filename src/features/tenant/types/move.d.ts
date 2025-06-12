interface IMoveIn {
  currentProperty: {
    streetAddress: string;
    unitNumber: string;
    city: string;
    region: string;
    zipCode: string;
    beds?: number;
    baths?: number;
    squareFeet?: number;
    yearBuilt?: number;
  };
  currentPropertyLeaseTerm: {
    termType: string; // e.g., "Fixed Term", "Month-to-Month"
    startDate: string; // ISO date format
    endDate: string; // ISO date format
  };
  destinationProperty: {
    streetAddress: string;
    unitNumber: string;
    city: string;
    region: string;
    zipCode: string;
  };
  destinationPropertyLeaseTerm: {
    termType: string; // "Fixed Term", "Month-to-Month"
    startDate: string; // ISO date format
    endDate: string; // ISO date format
  };
  moveDate: string; // ISO date format
  moveTime: string; // e.g., "10:00 AM"
  moveEndDate?: string; // Optional, ISO date format
  moveEndTime?: string; // Optional, e.g., "10:00 AM"
  flexibleTimings: boolean; // Optional, default is false
  flexibleTimingsData: string;
  availableUnit: string; // Optional, e.g., "2A"
  allocateUnit: string; // Optional, e.g., "2A"
  otherApplicants:
    | "Deny-And-Send-A-Notification"
    | "Keep-As-An-Active-Applicant"; // Optional, default is 'Keep-As-An-Active-Applicant'
}
