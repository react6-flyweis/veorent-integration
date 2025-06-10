import { useQuery } from "@tanstack/react-query";

import { axiosTenant } from "../../api/axios";

export const useGetTransactionsQuery = () => {
  return useQuery({
    queryFn: () =>
      axiosTenant.get<IResponse<ITransaction[]>>("/allTransactionUser"),
    queryKey: ["transactions"],
    select: (data) => data.data.data,
  });
};
