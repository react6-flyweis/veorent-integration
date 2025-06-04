import { useQuery } from "@tanstack/react-query";
import { axiosLandlord } from "../../api/axios";

export const useGetChargesQuery = () => {
  return useQuery({
    queryFn: () =>
      axiosLandlord.get<IResponseWithPagination<ICharge[]>>("/charges"),
    queryKey: ["charges"],
    select: (data) => data.data.data,
  });
};
