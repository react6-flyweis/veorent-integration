import { useMutation } from "@tanstack/react-query";

import { axiosTenant } from "../../api/axios";

export const useCreateBookingMutation = () => {
  return useMutation({
    mutationFn: (data: IBookingCreateData) =>
      axiosTenant.post<IResponse<IBooking>>("/bookings", data),
  });
};
