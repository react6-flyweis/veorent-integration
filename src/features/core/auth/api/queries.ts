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

export const useGetBusinessQuery = () => {
  return useQuery({
    queryFn: () => axiosClient.get<IResponse<IBusiness[]>>("/partner/business"),
    queryKey: ["businessGoals"],
    select: (data) => data.data.data,
  });
};

// /RentalProcess
export const useGetRentalProcessQuery = () => {
  return useQuery({
    queryFn: () =>
      axiosClient.get<IResponse<IRentalProcess[]>>("/partner/rentalProcess"),
    queryKey: ["rentalProcess"],
    select: (data) => data.data.data,
  });
};
