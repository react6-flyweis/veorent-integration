import { useQuery } from "@tanstack/react-query";

import { axiosTenant } from "../../api/axios";

export const useGetPropertiesQuery = () => {
  return useQuery({
    queryFn: () => axiosTenant.get<IResponse<IProperty[]>>("/properties"),
    queryKey: ["properties"],
    select: (data) => data.data.data,
  });
};
