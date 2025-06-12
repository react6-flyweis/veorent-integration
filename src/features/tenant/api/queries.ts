import { useQuery } from "@tanstack/react-query";

import { axiosTenant } from "./axios";

export const useGetLandlordsForUserQuery = () => {
  return useQuery({
    queryFn: () =>
      axiosTenant.get<IResponse<IUserFullDetails[]>>("/getLandlordsForUser"),
    queryKey: ["landlords"],
    select: (data) => data.data.data,
  });
};
