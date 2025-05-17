import { Route, Routes, type RouteObject } from "react-router";
import { routes } from "./routes/Routes";
import { authRoutes } from "./routes/auth.routes";
import { DashboardLayout } from "./components/Layouts/DashboardLayout";
import AuthLayout from "./features/auth/AuthLayout";

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {routes.map((route: RouteObject) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
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
