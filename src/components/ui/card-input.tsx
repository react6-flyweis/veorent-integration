import { useId, type ComponentProps, forwardRef } from "react";
import { usePaymentInputs } from "react-payment-inputs";
import { CreditCardIcon, LockIcon, CalendarIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const CardNumberInput = forwardRef<
  HTMLInputElement,
  ComponentProps<typeof Input>
>(({ className, onChange, onBlur, ...props }, ref) => {
  const id = useId();
  const { getCardNumberProps } = usePaymentInputs();

  return (
    <div className="relative">
      <Input
        ref={ref}
        {...props}
        {...getCardNumberProps({ onChange, onBlur })}
        id={`card-number-${id}`}
        className={cn("peer ps-9 [direction:inherit]", className)}
        placeholder="1234 5678 9012 3456"
      />
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
        <CreditCardIcon size={16} aria-hidden="true" />
      </div>
    </div>
  );
});

CardNumberInput.displayName = "CardNumberInput";

export const CardCvcInput = forwardRef<
  HTMLInputElement,
  ComponentProps<typeof Input>
>(({ className, onChange, onBlur, ...props }) => {
  const id = useId();
  const { getCVCProps } = usePaymentInputs();
  const cvcProps = getCVCProps({ onChange, onBlur });

  return (
    <div className="relative">
      <Input
        //   ref={ref}
        {...props}
        {...cvcProps}
        id={`card-cvc-${id}`}
        className={cn("peer ps-9 [direction:inherit]", className)}
        placeholder="123"
      />
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
        <LockIcon size={16} aria-hidden="true" />
      </div>
    </div>
  );
});

CardCvcInput.displayName = "CardCvcInput";

export const CardExpiryInput = forwardRef<
  HTMLInputElement,
  ComponentProps<typeof Input>
>(({ className, onChange, onBlur, ...props }) => {
  const id = useId();
  const { getExpiryDateProps } = usePaymentInputs();
  const expiryProps = getExpiryDateProps({ onChange, onBlur });

  return (
    <div className="relative">
      <Input
        //   ref={ref}
        {...props}
        {...expiryProps}
        id={`card-expiry-${id}`}
        className={cn("peer ps-9 [direction:inherit]", className)}
        placeholder="MM/YY"
      />
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
        <CalendarIcon size={16} aria-hidden="true" />
      </div>
    </div>
  );
});

CardExpiryInput.displayName = "CardExpiryInput";
