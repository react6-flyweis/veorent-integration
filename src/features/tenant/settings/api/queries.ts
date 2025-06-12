import { useQuery } from "@tanstack/react-query";

import { axiosTenant } from "../../api/axios";

export const useGetProfileQuery = () => {
  return useQuery({
    queryFn: () =>
      axiosTenant.get<IResponse<{ memberSince: string; user: IUser }>>(
        "/profile",
      ),
    queryKey: ["profile"],
    select: (data) => data.data.data.user,
  });
};
