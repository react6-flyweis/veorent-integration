import { Suspense, lazy } from "react";
import { Route, Routes, type RouteObject } from "react-router";

import { LoadingScreen } from "@/components/LoadingScreen";
import { AuthWrapper } from "@/features/core/auth/AuthWrapper";
import { authRoutes } from "@/features/core/routes/auth.routes";
import { mainRoutes } from "@/features/core/routes/main.routes";
import { landlordRoutes } from "@/features/landlord/routes/landlord.routes";
import { dashRoutes } from "@/features/tenant/routes/dash.routes";

// Lazy imports for layouts
const AuthLayout = lazy(() => import("@/features/core/auth/AuthLayout"));
const DashboardLayout = lazy(
  () => import("@/features/shared/layouts/DashboardLayout"),
);
const FullLayout = lazy(() => import("@/features/shared/layouts/FullLayout"));

// Helper function to ensure paths are relative
const getRelativePath = (path?: string) => {
  if (!path) return "";
  return path.startsWith("/") ? path.slice(1) : path;
};

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="tenant">
          <Route
            element={
              <AuthWrapper>
                <DashboardLayout />
              </AuthWrapper>
            }
          >
            {dashRoutes.map((route: RouteObject) => (
              <Route
                key={route.path}
                path={getRelativePath(route.path)}
                element={route.element}
              />
            ))}
          </Route>
          <Route
            element={
              <AuthWrapper>
                <FullLayout />
              </AuthWrapper>
            }
          >
            {mainRoutes.map((route: RouteObject) => (
              <Route
                key={route.path}
                path={getRelativePath(route.path)}
                element={route.element}
              />
            ))}
          </Route>
        </Route>
        <Route path="landlord">
          <Route
            element={
              <AuthWrapper>
                <DashboardLayout />
              </AuthWrapper>
            }
          >
            {landlordRoutes.map((route: RouteObject) => (
              <Route
                key={route.path}
                path={getRelativePath(route.path)}
                element={route.element}
              />
            ))}
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          {authRoutes.map((route: RouteObject) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
