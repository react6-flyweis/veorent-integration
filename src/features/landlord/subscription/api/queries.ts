import { useQuery } from "@tanstack/react-query";
import { axiosLandlord } from "../../api/axios";

export const useGetSubscriptionPlansQuery = () => {
  return useQuery({
    queryFn: () =>
      axiosLandlord.get<IResponse<ISubscription[]>>("/subscriptions"),
    queryKey: ["subscription-plans"],
    select: (data) => data.data.data,
  });
};

export const useGetSubscriptionPlanQuery = (id: string) => {
  return useQuery({
    queryFn: () =>
      axiosLandlord.get<IResponse<ISubscription>>(`/subscriptions/${id}`),
    queryKey: ["subscription-plan", id],
    select: (data) => data.data.data,
  });
};
