import { axiosClint } from "@/api/axios";
import { API_URL } from "@/constants/api";
import { useAuthStore } from "@/store/useAuthStore";

const token = useAuthStore.getState().token;
if (!token) {
  throw new Error("No authentication token found");
}
export const axiosLandlord = axiosClint.create({
  baseURL: API_URL + "/partner",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
