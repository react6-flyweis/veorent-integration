import { useQuery } from "@tanstack/react-query";
import { axiosLandlord } from "./axios";

export const useGetProperties = () => {
  return useQuery({
    queryFn: () => axiosLandlord.get<IResponse<IProperty[]>>("/properties"),
    queryKey: ["properties"],
    select: (data) => data.data.data,
  });
};

export const useGetPropertyTypes = () => {
  return useQuery({
    queryFn: () =>
      axiosLandlord.get<IResponse<IPropertyType[]>>("/propertyType"),
    queryKey: ["propertyTypes"],
    select: (data) => data.data.data,
  });
};

export const useGetLeases = () => {
  return useQuery({
    queryFn: () => axiosLandlord.get<IResponse<ILease[]>>("/leases"),
    queryKey: ["leases"],
    select: (data) => data.data.data,
  });
};
