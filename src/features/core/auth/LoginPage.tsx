import { Button } from "@/components/ui/button";
import { LoginForm } from "./components/LoginForm";
import facebookIcon from "@/assets/icons/facebook.png";
import googleIcon from "@/assets/icons/google.png";

export function LoginPage() {
  return (
    <div className="">
      <img src="/logo-dark.png" alt="Veorent Logo" className="h-8 mb-6" />

      <h2 className="text-2xl font-semibold mb-6">Login to Veorent</h2>

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

        <LoginForm />
      </div>
    </div>
  );
}
