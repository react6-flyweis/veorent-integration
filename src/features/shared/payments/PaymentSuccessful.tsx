import { CurrencyIcon } from "@/components/CurrencyIcon";
import { Button } from "@/components/ui/button";
import { useGoBack } from "@/hooks/useGoBack";

import checkIcon from "./assets/check.gif";

export default function PaymentSuccessful() {
  const goBack = useGoBack();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center pb-10 @md:justify-end">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={checkIcon}
          alt="Payment Successful"
          className="border-primary size-28 rounded-full object-cover"
          // loading="lazy"
        />

        <div className="flex items-center gap-5">
          <CurrencyIcon size="xl" className="text-primary" />
          <h3 className="text-6xl font-bold">514</h3>
        </div>
        <p className="text-primary max-w-md text-center text-2xl font-semibold text-wrap @md:text-3xl @lg:text-4xl">
          Payment has completed successfully
        </p>
        <Button size="lg" onClick={() => goBack(-2)} className="w-3/5">
          continue
        </Button>
      </div>
    </div>
  );
}
