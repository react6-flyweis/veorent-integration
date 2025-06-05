import { useMutation } from "@tanstack/react-query";
import { axiosLandlord } from "../../api/axios";

export const useInviteByEmailMutation = () => {
  return useMutation({
    mutationFn: (data: { email: string; desc: string }) =>
      axiosLandlord.post<IResponse<unknown>>("/InviteModel", data),
  });
};
