import { Route, Routes, type RouteObject } from "react-router";
import { DashboardLayout } from "@/features/shared/layouts/DashboardLayout";
import { AuthLayout } from "@/features/core/auth/AuthLayout";
import { dashRoutes } from "@/features/tenant/routes/dash.routes";
import { authRoutes } from "@/features/core/routes/auth.routes";
import { mainRoutes } from "@/features/core/routes/main.routes";
import { FullLayout } from "@/features/shared/layouts/FullLayout";
import { landlordRoutes } from "@/features/landlord/routes/landlord.routes";
import { AuthWrapper } from "@/features/core/auth/AuthWrapper";

// Helper function to ensure paths are relative
const getRelativePath = (path?: string) => {
  if (!path) return "";
  return path.startsWith("/") ? path.slice(1) : path;
};

function App() {
  return (
    <Routes>
      <Route path="tenant">
        <Route
          element={
            <AuthWrapper allowedUserType="tenant">
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
            <AuthWrapper allowedUserType="tenant">
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
            <AuthWrapper allowedUserType="landlord">
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
  );
}

export default App;
