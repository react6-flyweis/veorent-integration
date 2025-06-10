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

export const useGetWalletQuery = () => {
  return useQuery({
    queryFn: () => axiosTenant.get<IResponse<number>>("/wallet/getwallet"),
    queryKey: ["wallet"],
    select: (data) => data.data.data,
  });
};
