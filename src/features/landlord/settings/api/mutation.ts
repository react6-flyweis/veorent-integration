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

interface IUpdateProfileData {
  fullName?: string;
  mobileNumber?: string;
  email?: string;
  password?: string;
  addressDetails?: {
    houseNumber: string;
    streetAddress: string;
    city: string;
    region: string;
    zipCode: string;
  };
}

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IUpdateProfileData) =>
      axiosLandlord.post<IResponse<IUser>>("/registration", data),
    onSettled: () => {
      // Invalidate the query to ensure fresh data
      queryClient.invalidateQueries({
        queryKey: ["user", "profile"],
      });
    },
  });
};

export const useUploadProfilePictureMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) =>
      axiosLandlord.put<IResponse<{ imageUrl: string }>>(
        "/upload-profile-picture",
        data,
      ),
    onSettled: () => {
      // Invalidate the query to ensure fresh data
      queryClient.invalidateQueries({
        queryKey: ["user", "profile"],
      });
    },
  });
};
