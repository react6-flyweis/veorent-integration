"use client";

import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex h-screen w-full">
      {/* Left Form Panel */}
      <div className="flex-1 p-10 flex justify-center items-center">
        <div className="max-w-lg">
          <img src="/logo-dark.png" alt="Veorent Logo" className="mb-6 h-10" />
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
