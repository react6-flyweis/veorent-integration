import { Button } from "@/components/ui/button";
import facebookIcon from "@/assets/icons/facebook.png";
import googleIcon from "@/assets/icons/google.png";
import { SignUpForm } from "./components/SignUpForm";

export function SingUpPage() {
  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <img src="/logo-dark.png" alt="Veorent Logo" className="h-8" />
        <div className="rounded border border-primary flex justify-center items-center px-3 py-2">
          <span className="text-2xl font-semibold">Tenant Login</span>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-6">Signup for Veorent</h2>

      <div className="space-y-3">
        <div className="flex gap-2">
          <Button className="rounded-full bg-blue-500 flex-1 flex items-center justify-center gap-2">
            <img src={googleIcon} alt="Google" width={20} height={20} />
            Continue with Google
          </Button>
          <Button className="rounded-full bg-blue-600 flex-1  flex items-center justify-center gap-2">
            <img src={facebookIcon} alt="Facebook" width={20} height={20} />
            Continue with Facebook
          </Button>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
