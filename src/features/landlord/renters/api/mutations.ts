import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosLandlord } from "../../api/axios";

export interface IUpdateMoveRequestData {
  currentProperty: IPropertyShortDetail;
  currentPropertyLeaseTerm: ILeaseTerm;
  destinationProperty: IPropertyShortDetail;
  destinationPropertyLeaseTerm: ILeaseTerm;
  moveDate: string;
  moveTime: string;
  flexibleTimings: boolean;
  availableUnit?: string;
  allocateUnit?: string;
  otherApplicants:
    | "Deny-And-Send-A-Notification"
    | "Keep-As-An-Active-Applicant";
  status: "Pending" | "In Progress" | "Completed" | "Canceled";
  lease: string;
}

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

export const useUpdateMoveRequestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateMoveRequestData }) =>
      axiosLandlord.put<IResponse<IApplicant>>(`/move-requests/${id}`, data),
    onSuccess: () => {
      // invalidate the applicants query to refresh the list
      queryClient.invalidateQueries({
        queryKey: ["applicants"],
      });
    },
  });
};
