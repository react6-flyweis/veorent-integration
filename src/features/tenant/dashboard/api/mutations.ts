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
