import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosLandlord } from "../../api/axios";

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (data: {
      otp: string;
      newPassword: string;
      confirmPassword: string;
    }) => axiosLandlord.post<IResponse<unknown>>("/changePassword", data),
  });
};

export const useUpdateNotificationPreferencesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: INotificationPreferencesUpdate) =>
      axiosLandlord.post<IResponse<INotificationPreferences>>(
        "/notification/upsertNotificationPreferences",
        data,
      ),
    onSettled: () => {
      // Invalidate the query to ensure fresh data
      queryClient.invalidateQueries({
        queryKey: ["notification-preferences"],
      });
    },
  });
};
