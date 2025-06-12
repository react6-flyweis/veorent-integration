import { useQuery } from "@tanstack/react-query";

import { axiosTenant } from "../../api/axios";

export const useGetCardsQuery = () => {
  return useQuery({
    queryFn: () => axiosTenant.get<IResponse<ICard[]>>("/card-details"),
    queryKey: ["cards"],
    select: (data) => data.data.data,
  });
};

export const useGetCardQuery = (id: string) => {
  return useQuery({
    queryFn: () => axiosTenant.get<IResponse<ICard>>(`/card-details/${id}`),
    queryKey: ["card", id],
    select: (data) => data.data.data,
    enabled: !!id,
  });
};

export const useGetInsurancePlansQuery = () => {
  return useQuery({
    queryFn: () =>
      axiosTenant.get<IResponse<IInsurancePlan[]>>("/insurance-plans"),
    queryKey: ["insurance-plans"],
    select: (data) => data.data.data,
  });
};

export const useGetInsurancePlanQuery = (id: string) => {
  return useQuery({
    queryFn: () =>
      axiosTenant.get<IResponse<IInsurancePlan>>(`/insurance-plans/${id}`),
    queryKey: ["insurance-plan", id],
    select: (data) => data.data.data,
    enabled: !!id,
  });
};

// /pending-rent
export const useGetPendingRentQuery = () => {
  return useQuery({
    queryFn: () => axiosTenant.get<IResponse<IPendingRent[]>>("/pending-rent"),
    queryKey: ["pending-rent"],
    select: (data) => data.data.data,
  });
};

// Get all bookings
export const useGetBookingsQuery = () => {
  return useQuery({
    queryFn: () => axiosTenant.get<IResponse<IBooking[]>>("/bookings"),
    queryKey: ["bookings"],
    select: (data) => {
      // Sort by creation date descending to get the latest first
      const sortedBookings = data.data.data;
      // .sort(
      //   (a, b) =>
      //     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      // );
      return sortedBookings;
    },
  });
};
