import { useQuery } from "@tanstack/react-query";
import { axiosLandlord } from "../../api/axios";

export const useGetProfileQuery = () => {
  return useQuery({
    queryFn: () => axiosLandlord.get<IResponse<IUserFullDetails>>("/profile"),
    queryKey: ["profile"],
    select: (data) => data.data.data,
  });
};
