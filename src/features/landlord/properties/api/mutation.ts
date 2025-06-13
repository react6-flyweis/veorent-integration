import { useMutation } from "@tanstack/react-query";

import { axiosLandlord } from "../../api/axios";

export const useCreatePropertyMutation = () => {
  return useMutation({
    mutationFn: (data: IPropertyCreateData) =>
      axiosLandlord.post<IResponse<IProperty>>("/properties", data),
  });
};

export const useUpdatePropertyMutation = (id: string) => {
  return useMutation({
    mutationFn: (data: IPropertyUpdateData) =>
      axiosLandlord.put<IResponse<IProperty>>(`/properties/${id}`, data),
  });
};

export const useSendOtpMutation = (id: string) => {
  return useMutation({
    mutationFn: (data: { mobileNumber: string }) =>
      axiosLandlord.post<IResponse<unknown>>(
        `/properties/${id}/send-otp`,
        data,
      ),
  });
};

export const useResendOtpMutation = (id: string) => {
  return useMutation({
    mutationFn: () =>
      axiosLandlord.post<IResponse<unknown>>(`/properties/${id}/resend-otp`),
  });
};

export const useVerifyOtpMutation = (id: string) => {
  return useMutation({
    mutationFn: (data: { otp: string }) =>
      axiosLandlord.post<IResponse<unknown>>(
        `/properties/${id}/verify-otp`,
        data,
      ),
  });
};
