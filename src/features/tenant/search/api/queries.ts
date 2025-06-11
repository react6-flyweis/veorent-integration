import { useQuery } from "@tanstack/react-query";

import { axiosTenant } from "../../api/axios";

const buildQueryString = (filters: IPropertyFilters): string => {
  const params = new URLSearchParams();

  // Check if there are any actual filters (excluding page/limit)
  const hasActualFilters = Object.entries(filters).some(
    ([key, value]) =>
      key !== "page" &&
      key !== "limit" &&
      value !== undefined &&
      value !== null &&
      value !== "",
  );

  // If there are filters but no propertyType, add default property types
  const filtersToUse = { ...filters };
  if (hasActualFilters && !filtersToUse.propertyType) {
    filtersToUse.propertyType = "condo";
  }

  Object.entries(filtersToUse).forEach(([key, value]) => {
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
