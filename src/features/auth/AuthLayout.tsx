import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div className="flex h-screen w-full">
      {/* Left Form Panel */}
      <div className="flex-1 flex justify-center items-center">
        <div>
          <Outlet />
        </div>
      </div>

      {/* Right Image Panel */}
      <div className="hidden  md:block w-2/5 overflow-hidden">
        <img src="/scene.jpg" alt="Interior" className="object-cover" />
      </div>
    </div>
  );
}
