import { useQuery } from "@tanstack/react-query";

import { axiosLandlord } from "../../api/axios";

interface IDashboardCounts {
  marketing: number;
  leads: number;
  applicants: number;
}

export const useGetDashboardCounts = () => {
  return useQuery({
    queryFn: () =>
      axiosLandlord.get<IResponse<IDashboardCounts>>("/getDashboardCounts"),
    queryKey: ["dashboardCounts"],
    select: (data) => data.data.data,
  });
};
