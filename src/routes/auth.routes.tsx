import { LoginPage } from "@/features/auth/LoginPage";
import { type RouteObject } from "react-router-dom";

import { ForgotPasswordPage } from "@/features/auth/ForgotPassword";
import { SingUpPage } from "@/features/auth/SignUp";
import { ResetPasswordPage } from "@/features/auth/ResetPassword";

export const authRoutes: RouteObject[] = [
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
