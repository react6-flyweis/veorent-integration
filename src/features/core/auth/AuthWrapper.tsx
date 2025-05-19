import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUserPreferenceStore } from "@/store/useUserPreferenceStore";

interface AuthWrapperProps {
  children: ReactNode;
  requireAuth?: boolean;
  allowedUserType?: "tenant" | "landlord" | null;
}

export const AuthWrapper = ({
  children,
  requireAuth = true,
  allowedUserType = null,
}: AuthWrapperProps) => {
  // In a real app, you would check for authentication status as well
  const isAuthenticated = true; // This should come from your auth system
  const { userType } = useUserPreferenceStore();

  // If we're requiring authentication and the user isn't authenticated, redirect to login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If there's a specific user type required for this route
  if (allowedUserType && userType !== allowedUserType) {
    // Redirect to their preferred section if they're trying to access the wrong area
    if (userType) {
      return <Navigate to={`/${userType}`} replace />;
    }

    // If we don't know their preference yet, go to personalize
    return <Navigate to="/choose" replace />;
  }

  return <>{children}</>;
};
