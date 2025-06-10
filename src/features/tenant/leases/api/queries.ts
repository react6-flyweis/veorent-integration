import { useQuery } from "@tanstack/react-query";

import { axiosTenant } from "../../api/axios";

export const useGetLeasesQuery = () => {
  return useQuery({
    queryFn: () => axiosTenant.get<IResponse<IMaintenanceRequest[]>>("/leases"),
    queryKey: ["leases"],
    select: (data) => data.data.data,
  });
};
