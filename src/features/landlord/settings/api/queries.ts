import { useQuery } from "@tanstack/react-query";

import { axiosLandlord } from "../../api/axios";

// /notification/getNotificationPreferences
export const useGetNotificationPreferencesQuery = () => {
  return useQuery({
    queryFn: () =>
      axiosLandlord.get<IResponse<INotificationPreferences>>(
        "/notification/getNotificationPreferences",
      ),
    queryKey: ["notification-preferences"],
    select: (data) => data.data.data,
  });
};
