import { useQuery } from "@tanstack/react-query";

import { axiosTenant } from "../../api/axios";

export const useGetCardsQuery = () => {
  return useQuery({
    queryFn: () => axiosTenant.get<IResponse<ICard[]>>("/card-details"),
    queryKey: ["cards"],
    select: (data) => data.data.data,
  });
};

export const useGetCardQuery = (id: string) => {
  return useQuery({
    queryFn: () => axiosTenant.get<IResponse<ICard>>(`/card-details/${id}`),
    queryKey: ["card", id],
    select: (data) => data.data.data,
    enabled: !!id,
  });
};
