import { useQuery } from "@tanstack/react-query";

import { axiosTenant } from "../../api/axios";

export const useGetMaintenanceRequests = () => {
  return useQuery({
    queryFn: () =>
      axiosTenant.get<IResponse<IMaintenanceRequest[]>>("/maintenance"),
    queryKey: ["maintenanceRequests"],
    select: (data) => data.data.data,
  });
};
