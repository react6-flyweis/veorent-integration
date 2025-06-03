import { useMutation } from "@tanstack/react-query";
import { axiosLandlord } from "../../api/axios";

export const useCreateMaintenanceRequestMutation = () => {
  return useMutation({
    mutationFn: (data: IMaintenanceRequestForm) =>
      axiosLandlord.post<IResponse<IMaintenanceRequest>>("/maintenance", data),
  });
};
