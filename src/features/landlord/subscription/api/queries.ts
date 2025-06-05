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
