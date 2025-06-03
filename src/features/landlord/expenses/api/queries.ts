import { useQuery } from "@tanstack/react-query";
import { axiosLandlord } from "../../api/axios";

export const useGetExpenses = () => {
  return useQuery({
    queryFn: () => axiosLandlord.get<IResponse<IExpense[]>>("/expenses"),
    queryKey: ["expenses"],
    select: (data) => data.data.data,
  });
};
