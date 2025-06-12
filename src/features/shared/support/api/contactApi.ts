import { axiosClient } from "@/api/axios";
import { useAuthStore } from "@/store/useAuthStore";

export interface ContactFormRequest {
  fullName: string;
  email: string;
  mobileNumber: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
}
export const contactApi = {
  // For regular users
  submitUserContact: async (
    data: ContactFormRequest,
  ): Promise<ContactFormResponse> => {
    const response = await axiosClient.post<ContactFormResponse>(
      "/user/contact/us",
      data,
      {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
      },
    );
    return response.data;
  },

  // For partners/landlords
  submitPartnerContact: async (
    data: ContactFormRequest,
  ): Promise<ContactFormResponse> => {
    const response = await axiosClient.post<ContactFormResponse>(
      "/partner/contact/us",
      data,
      {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
      },
    );
    return response.data;
  },
};
