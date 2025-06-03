import { useQuery } from "@tanstack/react-query";
import { axiosLandlord } from "../../api/axios";

export const useGetLeases = () => {
  return useQuery({
    queryFn: () => axiosLandlord.get<IResponse<ILease[]>>("/leases"),
    queryKey: ["leases"],
    select: (data) => data.data.data,
  });
};
