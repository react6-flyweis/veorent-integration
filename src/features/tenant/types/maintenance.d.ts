interface IMaintenanceRequest {
  _id: string;
  maintenanceId: string;
  priority: "Low" | "Medium" | "High";
  category: string;
  desc: string;
  image: string[];
  voiceMemo?: string;
  permissionToEnter: boolean;
  permissionToEnterExplain?: string;
  areThereAnimal: boolean;
  areThereAnimalExplain?: string;
  status: "Open" | "Completed";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
