import { useId, type ComponentProps } from "react";
import { usePaymentInputs } from "react-payment-inputs";
import { CreditCardIcon, LockIcon, CalendarIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const CardNumberInput = ({
  className,
  onChange,
  onBlur,
  ...props
}: ComponentProps<typeof Input>) => {
  const id = useId();
  const { getCardNumberProps } = usePaymentInputs();

  return (
    <div className="relative">
      <Input
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
};

export const CardCvcInput = ({
  className,
  onChange,
  onBlur,
  ...props
}: ComponentProps<typeof Input>) => {
  const id = useId();
  const { getCVCProps } = usePaymentInputs();
  const cvcProps = getCVCProps({ onChange, onBlur });

  return (
    <div className="relative">
      <Input
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
};

export const CardExpiryInput = ({
  className,
  onChange,
  onBlur,
  ...props
}: ComponentProps<typeof Input>) => {
  const id = useId();
  const { getExpiryDateProps } = usePaymentInputs();
  const expiryProps = getExpiryDateProps({ onChange, onBlur });

  return (
    <div className="relative">
      <Input
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
};
