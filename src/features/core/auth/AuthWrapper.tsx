import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

interface AuthWrapperProps {
  children: ReactNode;
  requireAuth?: boolean;
}

export const AuthWrapper = ({
  children,
  requireAuth = true,
}: AuthWrapperProps) => {
  // In a real app, you would check for authentication status as well
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  // const user = useAuthStore((state) => state.user);

  // If we're requiring authentication and the user isn't authenticated, redirect to login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to their preferred section if they're trying to access the wrong area
  // if (user?.userType ) {
  //   return (
  //     <Navigate
  //       to={`/${user.userType === "USER" ? "tenant" : "landlord"}`}
  //       replace
  //     />
  //   );
  // }

  // If we don't know their preference yet, go to personalize
  // return <Navigate to="/choose" replace />;
  return <>{children}</>;
};
