import { Navigate, Outlet } from "react-router";

import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/store/useAuthStore";

export function AuthLayout() {
  const user = useAuthStore((state) => state.user);
  if (user) {
    // If user is already authenticated, redirect to the dashboard
    const url = user?.userType === "PARTNER" ? "/landlord" : "/tenant";
    return <Navigate to={url} replace />;
  }

  return (
    <div className="flex h-screen w-full">
      {/* Left Form Panel */}
      <div className="@container relative flex flex-1 items-center justify-center p-5">
        <Outlet />
      </div>

      {/* Right Image Panel */}
      <div className="hidden w-2/5 overflow-hidden md:block">
        <img src="/scene.jpg" alt="Interior" className="object-cover" />
      </div>
      <Toaster />
    </div>
  );
}
