import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosTenant } from "../../api/axios";

export interface IMaintenanceRequestCreateData {
  priority: "Emergency" | "High" | "Medium" | "Low";
  category: "Appliances" | "Electrical" | "Pest Control" | "Plumbing";
  desc: string;
  image: string[];
  voiceMemo?: string;
  permissionToEnter: boolean;
  permissionToEnterExplain?: string;
  areThereAnimal: boolean;
  areThereAnimalExplain?: string;
}

export const useCreateMaintenanceRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IMaintenanceRequestCreateData) =>
      axiosTenant.post<IResponse<IMaintenanceRequest>>("/maintenance", data),
    onSuccess: () => {
      // Invalidate and refetch maintenance requests data
      queryClient.invalidateQueries({ queryKey: ["maintenanceRequests"] });
    },
  });
};
