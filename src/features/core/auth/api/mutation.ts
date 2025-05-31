import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login, getProfile } from "./authApi";
import { useAuthStore } from "@/store/useAuthStore";

export function useLoginMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { login: loginToStore } = useAuthStore();

  return useMutation({
    mutationFn: login,
    onSuccess: async (token) => {
      try {
        // 1. Store token immediately
        useAuthStore.getState().setToken(token);

        // 2. Fetch user profile data using the token
        const userProfile = await getProfile();

        // 3. Store user data and complete login
        loginToStore(token, userProfile);

        // 4. Invalidate related queries to refetch fresh data
        await queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
        await queryClient.invalidateQueries({ queryKey: ["auth"] });

        // 5. Redirect based on user type
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
