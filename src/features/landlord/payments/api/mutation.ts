import { useMutation } from "@tanstack/react-query";
import { axiosLandlord } from "../../api/axios";

export const useCreateChargeMutation = () => {
  return useMutation({
    mutationFn: (data: IMonthlyChargeCreate | IOneTimeChargeCreate) =>
      axiosLandlord.post<IResponse<ICharge>>("/charge", data),
  });
};
