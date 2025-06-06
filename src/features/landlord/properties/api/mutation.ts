import { useMutation } from "@tanstack/react-query";
import { axiosLandlord } from "../../api/axios";

export const useCreatePropertyMutation = () => {
  return useMutation({
    mutationFn: (data: IPropertyCreateData) =>
      axiosLandlord.post<IResponse<IProperty>>("/properties", data),
  });
};

export const  useUpdatePropertyMutation = (id : string) => {
  return useMutation({
    mutationFn: (data: IPropertyUpdateData) =>
      axiosLandlord.put<IResponse<IProperty>>(`/properties/${id}`, data),
  });
}