import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosTenant } from "../../api/axios";

export const useUpdateBookingMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<IBooking>) =>
      axiosTenant.put<IResponse<IBooking>>(`/bookings/${id}`, data),
    onSuccess: () => {
      // Invalidate and refetch the booking data
      queryClient.invalidateQueries({ queryKey: ["booking", id] });
    },
  });
};
