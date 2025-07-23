import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosTenant } from "../../api/axios";

export const useCreateCardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICardCreateData) =>
      axiosTenant.post<IResponse<ICard>>("/card-details/add", data),
    onSuccess: () => {
      // Invalidate and refetch cards data
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });
};

export const useUpdateCardMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<ICardCreateData>) =>
      axiosTenant.put<IResponse<ICard>>(`/card-details/${id}`, data),
    onSuccess: () => {
      // Invalidate and refetch cards data
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      queryClient.invalidateQueries({ queryKey: ["card", id] });
    },
  });
};

export const useUpdateCardAutoPayMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { cardId: string; autoPayEnabled: boolean }) =>
      axiosTenant.put<IResponse<ICard>>(`/card-details/${data.cardId}`, {
        autoPayEnabled: data.autoPayEnabled,
      }),
    onSuccess: () => {
      // Invalidate and refetch cards data
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });
};

export const useDeleteCardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      axiosTenant.delete<IResponse<unknown>>(`/card-details/${id}`),
    onSuccess: () => {
      // Invalidate and refetch cards data
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });
};

export const useCreateMoveRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IMoveIn) =>
      axiosTenant.post<IResponse<IMoveIn>>("/move-requests", data),
    onSuccess: () => {
      // Invalidate and refetch move requests data
      queryClient.invalidateQueries({ queryKey: ["moveRequests"] });
    },
  });
};

// buy-insurance
export const useBuyInsuranceMutation = () => {
  return useMutation({
    mutationFn: (data: IInsurancePurchase) =>
      axiosTenant.post<IResponse<IInsurancePurchase>>("/buy-insurance", data),
  });
};

// update-insurance
export const useUpdateInsuranceMutation = () => {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<IInsurancePurchase>;
    }) =>
      axiosTenant.put<IResponse<IInsurancePurchase>>(
        `/buy-insurance/${id}`,
        data,
      ),
  });
};

export const useCreatePendingRentPaymentIntentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { pendingRentIds: string[] }) =>
      axiosTenant.post<
        IResponse<null> & { clientSecret: string; totalAmount: number }
      >("/pending-rent/bulk-payment", data),
    onSuccess: () => {
      // Invalidate and refetch pending rents data
      queryClient.invalidateQueries({ queryKey: ["pending-rents"] });
    },
  });
};

// update pending rent status
export const useUpdatePendingRentStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      pendingRentIds: string[];
      updateFields: Partial<IPendingRent>;
    }) => axiosTenant.put<IResponse<null>>("/pending-rent/multiple/data", data),
    onSuccess: () => {
      // Invalidate and refetch pending rents data
      queryClient.invalidateQueries({ queryKey: ["pending-rents"] });
    },
  });
};
