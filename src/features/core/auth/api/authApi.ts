import { axiosClint } from "@/api/axios";
import { useAuthStore } from "@/store/useAuthStore";
import type { IUser } from "@/types/user";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<string> {
  const response = await axiosClint.post<IResponse<ILoginResponse>>(
    "/partner/loginWithPhone",
    {
      email,
      password,
    },
  );
  if (response.status === 200) {
    return response.data.data.token;
  } else {
    throw new Error("Login failed");
  }
}

export async function getProfile(): Promise<IUser> {
  const token = useAuthStore.getState().token;
  const response = await axiosClint.get<IResponse<IUser>>("/partner/profile", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data.data;
  } else {
    throw new Error("Failed to fetch profile");
  }
}
