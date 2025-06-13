// Maintenance request status enum
type MaintenanceStatus = "Pending" | "Open" | "Completed";

// Maintenance category enum
type MaintenanceCategory = "Starred" | "Rentals";

// Time period enum
type TimePeriod = "Any-Time" | "Coordinate-A-Time-First";

// Main maintenance request interface
interface IMaintenanceRequest {
  _id: string;
  user: IUser;
  property: string;
  category: MaintenanceCategory;
  issueTitle: string;
  issueDescription: string;
  timePeriod: TimePeriod;
  receipts: string[];
  status: MaintenanceStatus;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Simplified maintenance request for forms and lists
interface IMaintenanceRequestForm {
  property: string;
  category: MaintenanceCategory;
  issueTitle: string;
  issueDescription: string;
  timePeriod: TimePeriod;
  receipts: string[]; // at least one receipt is required
}
