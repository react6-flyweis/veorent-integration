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

export const useGetPendingRentReportQuery = (params: {
  year?: number;
  month?: number;
}) => {
  return useQuery({
    queryFn: () =>
      axiosLandlord.get<IResponse<IPendingRentReport>>("/pending-rent/data", {
        params,
      }),
    queryKey: ["pending-rent", params],
    select: (data) => data.data.data,
  });
};
