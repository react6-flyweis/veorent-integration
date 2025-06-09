import axios from "axios";

import { API_URL } from "@/constants/api";

export const axiosClient = axios.create({
  baseURL: API_URL,
});
