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
