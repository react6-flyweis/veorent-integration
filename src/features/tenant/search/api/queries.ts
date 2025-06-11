import { useQuery } from "@tanstack/react-query";

import { axiosTenant } from "../../api/axios";

const buildQueryString = (filters: IPropertyFilters): string => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });

  return params.toString();
};

export const useGetPropertiesQuery = (filters?: IPropertyFilters) => {
  const queryString = filters ? buildQueryString(filters) : "";
  const endpoint = queryString
    ? `/properties/filter?${queryString}`
    : "/properties";

  return useQuery({
    queryFn: () => axiosTenant.get<IResponse<IProperty[]>>(endpoint),
    queryKey: ["properties", filters],
    select: (data) => data.data.data,
  });
};
