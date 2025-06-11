import { useQuery } from "@tanstack/react-query";

import { axiosTenant } from "../../api/axios";

export const useGetBookingQuery = (id: string) => {
  return useQuery({
    queryFn: () => axiosTenant.get<IResponse<IBooking>>(`/bookings/${id}`),
    queryKey: ["booking", id],
    select: (data) => data.data.data,
  });
};
