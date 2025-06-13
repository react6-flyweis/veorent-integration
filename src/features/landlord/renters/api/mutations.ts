import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosLandlord } from "../../api/axios";

// Function to fetch user by email
export const fetchUserByEmail = async (email: string): Promise<IUser> => {
  const response = await axiosLandlord.get<IResponse<IUser>>(
    `/profile/filter?email=${email}`,
  );
  return response.data.data;
};

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

export const useCreateTenantMutation = () => {
  return useMutation({
    mutationFn: (data: ITenantCreateData) =>
      axiosLandlord.post<IResponse<ITenant>>("/tenants", data),
  });
};
