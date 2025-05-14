import { Route, Routes, type RouteObject } from "react-router";
import MainLayout from "./components/Layout";
import { routes } from "./routes/Routes";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {routes.map((route: RouteObject) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
