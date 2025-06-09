import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "@/api/axios";
import type { IGoals } from "@/types/goal";

export const useGetGoalsQuery = () => {
  return useQuery({
    queryFn: () => axiosClient.get<IResponse<IGoals[]>>("/partner/goal"),
    queryKey: ["goals"],
    select: (data) => data.data.data,
  });
};
