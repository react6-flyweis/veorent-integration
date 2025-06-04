import { useQuery } from "@tanstack/react-query";
import { axiosLandlord } from "../../api/axios";

export const useGetLeadsQuery = () => {
  return useQuery({
    queryFn: () => axiosLandlord.get<ILeadsResponse>("/leads"),
    queryKey: ["leads"],
    select: (data) => data.data.leads,
  });
};

export const useGetLeadDetailsQuery = (leadId: string) => {
  return useQuery({
    queryFn: () => axiosLandlord.get<ILeadResponse>(`/leads/${leadId}`),
    queryKey: ["lead", leadId],
    select: (data) => data.data.lead,
  });
};

export const useGetApplicantsQuery = () => {
  return useQuery({
    queryFn: () => axiosLandlord.get<IResponse<IApplicant[]>>("/move-requests"),
    queryKey: ["applicants"],
    select: (data) => data.data.data,
  });
};
