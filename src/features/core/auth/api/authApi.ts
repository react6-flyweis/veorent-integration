import { axiosClient } from "@/api/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserPreferenceStore } from "@/store/useUserPreferenceStore";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<string> {
  const response = await axiosClient.post<IResponse<ILoginResponse>>(
    useUserPreferenceStore.getState().userType === "landlord"
      ? "/partner/loginWithPhone"
      : "/user/loginWithPhone",
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
  const response = await axiosClient.get<
    IResponse<IUser | { memberSince: string; user: IUser }>
  >(
    useUserPreferenceStore.getState().userType === "landlord"
      ? "/partner/profile"
      : "/user/profile",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (response.status === 200) {
    return "memberSince" in response.data.data
      ? response.data.data.user
      : response.data.data;
  } else {
    throw new Error("Failed to fetch profile");
  }
}
