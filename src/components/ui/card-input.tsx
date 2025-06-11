import { useId, type ComponentProps, forwardRef } from "react";
import { usePaymentInputs } from "react-payment-inputs";
import { CreditCardIcon, LockIcon, CalendarIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CardInputNumberProps
  extends Omit<ComponentProps<typeof Input>, "id"> {
  error?: boolean;
}

interface CardCvcProps extends Omit<ComponentProps<typeof Input>, "id"> {
  error?: boolean;
}

interface CardExpiryProps extends Omit<ComponentProps<typeof Input>, "id"> {
  error?: boolean;
}

export const CardNumberInput = forwardRef<
  HTMLInputElement,
  CardInputNumberProps
>(({ className, error, onChange, onBlur, ...props }, ref) => {
  const id = useId();
  const { getCardNumberProps, meta } = usePaymentInputs();

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     // Remove all non-digits
  //     const digits = e.target.value.replace(/\D/g, "");

  //     // Limit to 16 digits
  //     if (digits.length > 16) {
  //       return;
  //     }

  //     // Format with spaces every 4 digits
  //     const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");

  //     // Create a new event with the formatted value
  //     const formattedEvent = {
  //       ...e,
  //       target: {
  //         ...e.target,
  //         value: formatted,
  //       },
  //     };

  //     if (onChange) {
  //       onChange(formattedEvent as React.ChangeEvent<HTMLInputElement>);
  //     }
  //   };

  return (
    <div className="relative">
      <Input
        ref={ref}
        {...props}
        {...getCardNumberProps({ onChange, onBlur })}
        id={`card-number-${id}`}
        className={cn(
          "peer ps-9 [direction:inherit]",
          error && "border-destructive focus-visible:border-destructive",
          className,
        )}
        aria-invalid={error}
        aria-describedby={error ? `${id}-error` : undefined}
        placeholder="1234 5678 9012 3456"
      />
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
        <CreditCardIcon size={16} aria-hidden="true" />
      </div>
      {error && (
        <div
          id={`${id}-error`}
          className="text-destructive mt-1 text-sm"
          role="alert"
        >
          {meta.error}
        </div>
      )}
    </div>
  );
});

CardNumberInput.displayName = "CardNumberInput";

export const CardCvcInput = forwardRef<HTMLInputElement, CardCvcProps>(
  ({ className, error, onChange, onBlur, ...props }) => {
    const id = useId();
    const { getCVCProps, meta } = usePaymentInputs();
    const cvcProps = getCVCProps({ onChange, onBlur });

    return (
      <div className="relative">
        <Input
          //   ref={ref}
          {...props}
          {...cvcProps}
          id={`card-cvc-${id}`}
          className={cn(
            "peer ps-9 [direction:inherit]",
            error && "border-destructive focus-visible:border-destructive",
            className,
          )}
          aria-invalid={error}
          aria-describedby={error ? `${id}-error` : undefined}
          placeholder="123"
          inputMode="numeric"
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <LockIcon size={16} aria-hidden="true" />
        </div>
        {error && (
          <div
            id={`${id}-error`}
            className="text-destructive mt-1 text-sm"
            role="alert"
          >
            {meta.error}
          </div>
        )}
      </div>
    );
  },
);

CardCvcInput.displayName = "CardCvcInput";

export const CardExpiryInput = forwardRef<HTMLInputElement, CardExpiryProps>(
  ({ className, error, onChange, onBlur, ...props }) => {
    const id = useId();
    const { getExpiryDateProps, meta } = usePaymentInputs();
    const expiryProps = getExpiryDateProps({ onChange, onBlur });

    return (
      <div className="relative">
        <Input
          //   ref={ref}
          {...props}
          {...expiryProps}
          id={`card-expiry-${id}`}
          className={cn(
            "peer ps-9 [direction:inherit]",
            error && "border-destructive focus-visible:border-destructive",
            className,
          )}
          aria-invalid={error}
          aria-describedby={error ? `${id}-error` : undefined}
          placeholder="MM/YY"
          inputMode="numeric"
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <CalendarIcon size={16} aria-hidden="true" />
        </div>
        {error && (
          <div
            id={`${id}-error`}
            className="text-destructive mt-1 text-sm"
            role="alert"
          >
            {meta.error}
          </div>
        )}
      </div>
    );
  },
);

CardExpiryInput.displayName = "CardExpiryInput";
