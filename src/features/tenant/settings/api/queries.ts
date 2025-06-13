import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/store/useAuthStore";

import { axiosTenant } from "../../api/axios";

export const useGetProfileQuery = () => {
  const updateUser = useAuthStore((state) => state.updateUser);

  const query = useQuery({
    queryFn: () =>
      axiosTenant.get<IResponse<{ memberSince: string; user: IUser }>>(
        "/profile",
      ),
    queryKey: ["user", "profile"],
    select: (data) => data.data.data.user,
  });

  useEffect(() => {
    if (query.data) {
      updateUser(query.data);
    }
  }, [query.data, updateUser]);

  return query;
};
