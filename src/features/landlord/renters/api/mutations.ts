import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosLandlord } from "../../api/axios";

export const useCreateLeadMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ILeadCreateData) =>
      axiosLandlord.post<ILeadResponse>("/leads", data),
    onSuccess: (Response) => {
      // invalidate the leads query to refresh the list
      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });
      return Response.data;
    },
  });
};
