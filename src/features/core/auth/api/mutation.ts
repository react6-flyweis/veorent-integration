import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosClient } from "@/api/axios";
import { useAuthStore } from "@/store/useAuthStore";

import { login, getProfile } from "./authApi";

export function useLoginMutation() {
  const navigate = useNavigate();
  const setToken = useAuthStore((store) => store.setToken);
  const queryClient = useQueryClient();
  const { login: loginToStore } = useAuthStore();

  return useMutation({
    mutationFn: login,
    onSuccess: async (token) => {
      try {
        // 1. Store token immediately
        setToken(token);

        // 2. Fetch user profile data using React Query and cache it
        const userProfile = await queryClient.fetchQuery({
          queryKey: ["user", "profile"],
          queryFn: getProfile,
        });

        // 3. Store user data and complete login
        loginToStore(token, userProfile);

        // 4. Redirect based on user type
        const redirectPath =
          userProfile.userType === "USER" ? "/tenant" : "/landlord";
        navigate(redirectPath);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        // Handle profile fetch error but keep token
        // You might want to show a toast notification here
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
      // Clear any partial authentication state
      useAuthStore.getState().logout();
    },
    retry: 1, // Retry once on failure
  });
}

export function useRegisterLandlordMutation() {
  const navigate = useNavigate();
  const setToken = useAuthStore((store) => store.setToken);
  const queryClient = useQueryClient();
  const { login: loginToStore } = useAuthStore();

  return useMutation({
    mutationFn: async (data: INewLandlordUser) =>
      await axiosClient.post<IResponse<IRegisterResponse>>(
        "/partner/signup",
        data,
      ),
    onSuccess: async (response, variables) => {
      try {
        // After successful registration, automatically sign in the user
        const loginData = {
          email: variables.email,
          password: variables.password,
        };

        // Call login function to get token
        const token = await login(loginData);

        // Store token immediately
        setToken(token);

        // Fetch user profile data using React Query and cache it
        const userProfile = await queryClient.fetchQuery({
          queryKey: ["user", "profile"],
          queryFn: getProfile,
        });

        // Store user data and complete login
        loginToStore(token, userProfile);

        // Redirect to landlord dashboard
        navigate("/landlord");
      } catch (error) {
        console.error("Failed to auto-login after registration:", error);
        // If auto-login fails, redirect to login page
        navigate("/login");
      }
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
}

export function useRegisterTenantMutation() {
  const navigate = useNavigate();
  const setToken = useAuthStore((store) => store.setToken);
  const queryClient = useQueryClient();
  const { login: loginToStore } = useAuthStore();

  return useMutation({
    mutationFn: async (data: INewTenantUser) =>
      await axiosClient.post<IResponse<IRegisterResponse>>(
        "/user/signup",
        data,
      ),
    onSuccess: async (response, variables) => {
      try {
        // After successful registration, automatically sign in the user
        const loginData = {
          email: variables.email,
          password: variables.password,
        };

        // Call login function to get token
        const token = await login(loginData);

        // Store token immediately
        setToken(token);

        // Fetch user profile data using React Query and cache it
        const userProfile = await queryClient.fetchQuery({
          queryKey: ["user", "profile"],
          queryFn: getProfile,
        });

        // Store user data and complete login
        loginToStore(token, userProfile);

        // Redirect to tenant dashboard
        navigate("/tenant");
      } catch (error) {
        console.error("Failed to auto-login after registration:", error);
        // If auto-login fails, redirect to login page
        navigate("/login");
      }
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
}
