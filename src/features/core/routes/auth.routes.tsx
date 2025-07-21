import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { type RouteObject } from "react-router-dom";

import { AuthWrapper } from "@/features/core/auth/AuthWrapper";

// Lazy imports for code splitting
const LoginPage = lazy(() =>
  import("@/features/core/auth/LoginPage").then((module) => ({
    default: module.LoginPage,
  })),
);
const ForgotPasswordPage = lazy(() =>
  import("@/features/core/auth/ForgotPassword").then((module) => ({
    default: module.ForgotPasswordPage,
  })),
);
const SingUpPage = lazy(() =>
  import("@/features/core/auth/SignUp").then((module) => ({
    default: module.SingUpPage,
  })),
);
const ResetPasswordPage = lazy(() =>
  import("@/features/core/auth/ResetPassword").then((module) => ({
    default: module.ResetPasswordPage,
  })),
);
const Personalize = lazy(() => import("@/features/core/auth/Personalize"));
const SingUpLandlord = lazy(() => import("../auth/SignUpLandlord"));

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
    path: "/signup-landlord",
    element: <SingUpLandlord />,
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
