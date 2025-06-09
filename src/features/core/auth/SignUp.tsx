import { Link } from "react-router";

import facebookIcon from "@/assets/icons/facebook.png";
import googleIcon from "@/assets/icons/google.png";
import { Button } from "@/components/ui/button";
import { useUserPreferenceStore } from "@/store/useUserPreferenceStore";

import { SignUpForm } from "./components/SignUpForm";

export function SingUpPage() {
  const { userType } = useUserPreferenceStore();

  return (
    <div className="">
      <div className="mb-6 flex items-center justify-between">
        <img src="/logo-dark.png" alt="Veorent Logo" className="h-8" />
        <Link to="/login">
          <div className="border-primary flex items-center justify-center rounded border px-3 py-2">
            <span className="text-2xl font-semibold">
              {userType === "landlord" ? "Landlord" : "Tenant"} Login
            </span>
          </div>
        </Link>
      </div>
      <h2 className="mb-6 text-2xl font-semibold">Signup for Veorent</h2>

      <div className="space-y-3">
        <div className="flex gap-2">
          <Button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-500">
            <img src={googleIcon} alt="Google" width={20} height={20} />
            Continue with Google
          </Button>
          <Button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-600">
            <img src={facebookIcon} alt="Facebook" width={20} height={20} />
            Continue with Facebook
          </Button>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
