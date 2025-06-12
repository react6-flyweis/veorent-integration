import { useQuery, useQueryClient } from "@tanstack/react-query";

import { axiosClient } from "@/api/axios";
import { useAuthStore } from "@/store/useAuthStore";
import type { IGoals } from "@/types/goal";

import { getProfile } from "./authApi";

export const useGetProfileQuery = () => {
  return useQuery({
    queryFn: getProfile,
    queryKey: ["user", "profile"],
    select: (data) => data,
    // Only run this query if user is authenticated
    enabled: !!useAuthStore.getState().token,
  });
};

export const useInvalidateProfile = () => {
  const queryClient = useQueryClient();

  return {
    invalidateProfile: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },
    refetchProfile: () => {
      queryClient.refetchQueries({ queryKey: ["user", "profile"] });
    },
    removeProfileCache: () => {
      queryClient.removeQueries({ queryKey: ["user", "profile"] });
    },
  };
};

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
