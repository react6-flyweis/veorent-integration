import { Outlet } from "react-router";

export default function FullLayout() {
  return (
    <main className="@container flex h-full flex-col p-5 md:p-10">
      <Outlet />
    </main>
  );
}
