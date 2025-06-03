import { useQuery } from "@tanstack/react-query";
import { axiosLandlord } from "./axios";

export const useGetProperties = () => {
  return useQuery({
    queryFn: () => axiosLandlord.get<IResponse<IProperty[]>>("/properties"),
    queryKey: ["properties"],
    select: (data) => data.data.data,
  });
};
