import { Navigate } from "react-router";

import facebookIcon from "@/assets/icons/facebook.png";
import googleIcon from "@/assets/icons/google.png";
import { Button } from "@/components/ui/button";
import { useUserPreferenceStore } from "@/store/useUserPreferenceStore";

import { LoginForm } from "./components/LoginForm";

export function LoginPage() {
  const userType = useUserPreferenceStore((state) => state.userType);
  if (!userType) {
    return <Navigate to="/choose" replace />;
  }
  return (
    <div className="w-full max-w-lg">
      <img src="/logo-dark.png" alt="Veorent Logo" className="mb-6 h-8" />

      <h2 className="mb-6 text-2xl font-semibold">Login to Veorent</h2>

      <div className="space-y-3">
        <div className="flex flex-col gap-2 @md:flex-row">
          <Button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-500">
            <img src={googleIcon} alt="Google" width={20} height={20} />
            Continue with Google
          </Button>
          <Button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-600">
            <img src={facebookIcon} alt="Facebook" width={20} height={20} />
            Continue with Facebook
          </Button>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
