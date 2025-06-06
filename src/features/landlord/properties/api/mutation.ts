import { useMutation } from "@tanstack/react-query";
import { axiosLandlord } from "../../api/axios";

export const useCreatePropertyMutation = () => {
  return useMutation({
    mutationFn: (data: IPropertyCreateData) =>
      axiosLandlord.post<IResponse<IProperty>>("/properties", data),
  });
};
