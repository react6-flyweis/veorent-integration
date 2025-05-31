import { API_URL } from "@/constants/api";
import axios from "axios";

export const axiosClint = axios.create({
  baseURL: API_URL,
});
