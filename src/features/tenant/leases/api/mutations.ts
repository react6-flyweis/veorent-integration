import { useMutation } from "@tanstack/react-query";

import { axiosTenant } from "../../api/axios";

export interface ILeasingRequestCreateData {
  priority: "Emergency" | "High" | "Medium" | "Low";
  category: "Appliances" | "Electrical" | "Pest Control" | "Plumbing";
  desc: string;
  image?: string[];
  voiceMemo?: string;
  areThereAnimal: boolean;
  areThereAnimalExplain?: string;
}

export const useCreateLeasingRequestMutation = () => {
  return useMutation({
    mutationFn: (data: ILeasingRequestCreateData) =>
      axiosTenant.post<IResponse<IMaintenanceRequest>>("/leases", data),
  });
};
