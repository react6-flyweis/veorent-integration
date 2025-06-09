import { useQuery } from "@tanstack/react-query";

import { axiosLandlord } from "../../api/axios";

export const useGetPropertyByIdQuery = (
  id: string,
  queryOptions?: { skip: boolean },
) => {
  return useQuery({
    queryFn: () =>
      axiosLandlord.get<IResponse<IProperty>>(`/properties/byId/${id}`),
    queryKey: ["properties", id],
    select: (data) => data.data.data,
    ...queryOptions,
  });
};
