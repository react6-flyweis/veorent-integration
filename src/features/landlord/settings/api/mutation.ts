import { useMutation } from "@tanstack/react-query";
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
