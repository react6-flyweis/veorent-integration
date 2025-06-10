import { useQuery } from "@tanstack/react-query";

import { axiosTenant } from "../../api/axios";

export const useGetNotificationsQuery = () => {
  return useQuery({
    queryFn: () =>
      axiosTenant.get<IResponse<INotification[]>>("/notifications/user"),
    queryKey: ["notifications"],
    select: (data) => data.data.data,
  });
};
