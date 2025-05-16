import { Route, Routes, type RouteObject } from "react-router";
import MainLayout from "./components/Layout";
import { routes } from "./routes/Routes";
import AuthLayout from "./features/auth/AuthLayout";
import { authRoutes } from "./routes/auth.routes";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
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
