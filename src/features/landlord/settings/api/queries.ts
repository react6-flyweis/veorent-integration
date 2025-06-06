import { useQuery } from "@tanstack/react-query";
import { axiosLandlord } from "../../api/axios";

export const useGetProfileQuery = () => {
  return useQuery({
    queryFn: () => axiosLandlord.get<IResponse<IUserFullDetails>>("/profile"),
    queryKey: ["profile"],
    select: (data) => data.data.data,
  });
};

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
