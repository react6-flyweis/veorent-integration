import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosTenant } from "../../api/axios";

interface IEditProfileData {
  fullName: string;
  mobileNumber: string;
  email: string;
}

interface IForgetPasswordData {
  email: string;
}

interface IChangePasswordData {
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

export const useEditProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IEditProfileData) =>
      axiosTenant.post<IResponse<IUser>>("/registration", data),
    onSettled: () => {
      // Invalidate and refetch profile data
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },
  });
};

export const useUpdateNotificationPreferenceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { notificationPreference: boolean }) =>
      axiosTenant.post<IResponse<IUser>>("/registration", data),
    onSettled: () => {
      // Invalidate and refetch profile data
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },
  });
};

export const useForgetPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: IForgetPasswordData) =>
      axiosTenant.post<IResponse<unknown>>("/forget/Password", data),
  });
};

export const useChangePasswordMutation = (id: string) => {
  return useMutation({
    mutationFn: (data: IChangePasswordData) =>
      axiosTenant.post<IResponse<unknown>>(`/changePassword/${id}`, data),
  });
};

export const useUploadProfilePictureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) =>
      axiosTenant.post<IResponse<IUser>>("/upload-profile-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      // Invalidate and refetch profile data
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },
  });
};
