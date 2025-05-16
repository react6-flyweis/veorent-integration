import { LoginPage } from "@/features/auth/LoginPage";
import { type RouteObject } from "react-router-dom";
import { ForgotPasswordPage } from "@/features/auth/ForgotPassword";

export const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
];
