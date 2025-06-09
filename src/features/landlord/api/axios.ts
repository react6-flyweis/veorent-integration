import { axiosClient } from "@/api/axios";
import { API_URL } from "@/constants/api";
import { useAuthStore } from "@/store/useAuthStore";

const token = useAuthStore.getState().token;
export const axiosLandlord = axiosClient.create({
  baseURL: `${API_URL}/partner`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
