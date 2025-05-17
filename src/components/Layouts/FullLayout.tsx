import { Outlet } from "react-router";

export function FullLayout() {
  return (
    <main className="p-10 h-full flex flex-col">
      <Outlet />
    </main>
  );
}
