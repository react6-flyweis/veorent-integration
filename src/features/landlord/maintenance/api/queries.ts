import { useQuery } from "@tanstack/react-query";
import { axiosLandlord } from "../../api/axios";

export const useGetMaintenanceRequests = () => {
  return useQuery({
    queryFn: () =>
      axiosLandlord.get<IResponse<IMaintenanceRequest[]>>("/maintenance"),
    queryKey: ["maintenance"],
    select: (data) => data.data.data,
  });
};

export const useGetMaintenanceRequest = (id: string) => {
  return useQuery({
    queryFn: () =>
      axiosLandlord.get<IResponse<IMaintenanceRequest>>(
        `/maintenance/byId/${id}`,
      ),
    queryKey: ["maintenance", id],
    select: (data) => data.data.data,
  });
};
