import { Button } from "@/components/ui/button";
import { SwissFrancIcon } from "lucide-react";
import { useNavigate } from "react-router";

export default function PaymentSuccessful() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-col items-center justify-end pb-10">
      <div className="space-y-4 flex flex-col items-center">
        <div className="flex items-center gap-5">
          <SwissFrancIcon className="size-12 text-primary" />
          <h3 className="text-6xl font-bold">514</h3>
        </div>
        <p className="text-4xl font-semibold text-primary text-wrap max-w-md text-center">
          Payment has completed successfully
        </p>
        <Button onClick={() => navigate("/")} className="w-3/5" size="lg">
          continue
        </Button>
      </div>
    </div>
  );
}
