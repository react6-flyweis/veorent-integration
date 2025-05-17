import { Route, Routes, type RouteObject } from "react-router";
import { DashboardLayout } from "@/components/Layouts/DashboardLayout";
import { AuthLayout } from "@/features/auth/AuthLayout";
import { dashRoutes } from "@/routes/dash.routes";
import { authRoutes } from "@/routes/auth.routes";
import { mainRoutes } from "./routes/main.routes";
import { FullLayout } from "./components/Layouts/FullLayout";

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {dashRoutes.map((route: RouteObject) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route element={<AuthLayout />}>
        {authRoutes.map((route: RouteObject) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route element={<FullLayout />}>
        {mainRoutes.map((route: RouteObject) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
