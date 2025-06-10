import { axiosClient } from "@/api/axios";
import { API_URL } from "@/constants/api";
import { useAuthStore } from "@/store/useAuthStore";

const token = useAuthStore.getState().token;
export const axiosTenant = axiosClient.create({
  baseURL: `${API_URL}/user`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
