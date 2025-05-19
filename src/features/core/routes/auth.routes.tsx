import { LoginPage } from "@/features/core/auth/LoginPage";
import { type RouteObject } from "react-router-dom";

import { ForgotPasswordPage } from "@/features/core/auth/ForgotPassword";
import { SingUpPage } from "@/features/core/auth/SignUp";
import { ResetPasswordPage } from "@/features/core/auth/ResetPassword";
import Personalize from "@/features/core/auth/Personalize";
import { Navigate } from "react-router-dom";
import { AuthWrapper } from "@/features/core/auth/AuthWrapper";

export const authRoutes: RouteObject[] = [
  // Redirect from root to personalize if no user preference has been set
  {
    path: "/",
    element: (
      <AuthWrapper requireAuth={false}>
        <Navigate to="/choose" replace />
      </AuthWrapper>
    ),
  },
  {
    path: "/choose",
    element: <Personalize />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SingUpPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
];
