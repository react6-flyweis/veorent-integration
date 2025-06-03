import { useMutation } from "@tanstack/react-query";
import { axiosLandlord } from "../../api/axios";

export const useCreateLeaseMutation = () => {
  return useMutation({
    mutationFn: (data: ILeaseCreateData) =>
      axiosLandlord.post<IResponse<ILease>>("/lease", data),
  });
};
