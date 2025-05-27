import { CurrencyIcon } from "@/components/CurrencyIcon";
import { Button } from "@/components/ui/button";
import { useGoBack } from "@/hooks/useGoBack";

export default function PaymentSuccessful() {
  const goBack = useGoBack();
  return (
    <div className="flex h-full w-full flex-col items-center justify-end pb-10">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center gap-5">
          <CurrencyIcon size="xl" className="text-primary" />
          <h3 className="text-6xl font-bold">514</h3>
        </div>
        <p className="text-primary max-w-md text-center text-4xl font-semibold text-wrap">
          Payment has completed successfully
        </p>
        <Button onClick={() => goBack(-2)} className="w-3/5" size="lg">
          continue
        </Button>
      </div>
    </div>
  );
}
