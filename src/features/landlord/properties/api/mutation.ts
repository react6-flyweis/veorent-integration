import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosLandlord } from "../../api/axios";

export const useCreatePropertyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IPropertyCreateData) =>
      axiosLandlord.post<IResponse<IProperty>>("/properties", data),
    onSuccess: () => {
      // Invalidate properties list
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
};

export const useUpdatePropertyMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IPropertyUpdateData) =>
      axiosLandlord.put<IResponse<IProperty>>(`/properties/${id}`, data),
    onSuccess: () => {
      // Invalidate the specific property query
      queryClient.invalidateQueries({ queryKey: ["properties", id] });
    },
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
