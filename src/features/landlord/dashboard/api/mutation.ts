import { useMutation } from "@tanstack/react-query";
import { axiosLandlord } from "../../api/axios";

export const useInviteTenantMutation = () => {
  return useMutation({
    mutationFn: (data: unknown) =>
      axiosLandlord.post<IResponse<unknown>>("/ReferralTenants", data),
  });
};

export const useInviteRenterMutation = () => {
  return useMutation({
    mutationFn: (data: unknown) =>
      axiosLandlord.post<IResponse<unknown>>("/referralRentals", data),
  });
};
