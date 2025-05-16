import { LoginPage } from "@/features/auth/LoginPage";
import { type RouteObject } from "react-router-dom";

export const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
];
