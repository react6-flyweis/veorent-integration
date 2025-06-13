import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/store/useAuthStore";

import { axiosTenant } from "../../api/axios";

export const useGetProfileQuery = () => {
  const updateUser = useAuthStore((state) => state.updateUser);

  return useQuery({
    queryFn: () =>
      axiosTenant.get<IResponse<{ memberSince: string; user: IUser }>>(
        "/profile",
      ),
    queryKey: ["user", "profile"],
    select: (data) => {
      const user = data.data.data.user;
      updateUser(user);
      return user;
    },
  });
};
