import {
  createContext,
  useContext,
  useState,
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
  type PropsWithChildren,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
} from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// Stepper Context
const StepperContext = createContext<{
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  currentStepValidator?: () => boolean | Promise<boolean>; // Added
}>({
  currentStep: 1,
  totalSteps: 1,
  nextStep: () => {},
  prevStep: () => {},
  currentStepValidator: undefined, // Added
});

export type MultiStepperRef = {
  goNext: () => void;
  goPrev: () => void;
  currentStep: number;
  validateAndGoNext: (
    validator: () => boolean | Promise<boolean>,
  ) => Promise<void>;
};

export const MultiStepper = forwardRef<
  MultiStepperRef,
  {
    children: ReactElement | ReactElement[];
    routeBack?: boolean;
    showCount?: boolean;
  }
>(({ children }, ref) => {
  const [step, setStep] = useState(1);

  const steps = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === MultiStepperStep,
  ) as ReactElement[];

  const header = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === MultiStepperHeader,
  ) as ReactElement | undefined;

  const indicator = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === MultiStepperIndicator,
  ) as ReactElement | undefined;

  const button = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === MultiStepperButton,
  ) as ReactElement | undefined;

  const totalSteps = steps.length;

  const currentStepElement = steps[step - 1] as
    | ReactElement<MultiStepperStepProps>
    | undefined;
  const currentStepValidator = currentStepElement?.props.onValidate;
  const hideCurrentStepButton = currentStepElement?.props.hideButton;

  const nextStep = useCallback(() => {
    if (step < totalSteps) setStep((s) => s + 1);
  }, [step, totalSteps]);

  const prevStep = useCallback(() => {
    if (step > 1) setStep((s) => s - 1);
  }, [step]);

  const validateAndGoNext = useCallback(
    async (validator: () => boolean | Promise<boolean>) => {
      const isValid = await validator();
      if (isValid) {
        nextStep();
      }
    },
    [nextStep],
  );

  // 👇 Expose methods via ref
  useImperativeHandle(
    ref,
    () => ({
      goNext: nextStep,
      goPrev: prevStep,
      currentStep: step,
      validateAndGoNext,
    }),
    [nextStep, prevStep, step, validateAndGoNext],
  );

  return (
    <StepperContext.Provider
      value={{
        currentStep: step,
        nextStep,
        prevStep,
        totalSteps,
        currentStepValidator, // Added
      }}
    >
      <div className="space-y-6">
        {indicator && <> {indicator}</>}
        {header && <>{header}</>}

        <div>
          {steps.map((child, index) =>
            index + 1 === step ? (
              <div key={index}>{cloneElement(child)}</div>
            ) : null,
          )}
        </div>

        {button && !hideCurrentStepButton && <div>{button}</div>}
      </div>
    </StepperContext.Provider>
  );
});

MultiStepper.displayName = "MultiStepper";

// Step Component
export interface MultiStepperStepProps {
  children: ReactNode;
  onValidate?: () => boolean | Promise<boolean>;
  hideButton?: boolean;
}

export function MultiStepperStep({ children }: MultiStepperStepProps) {
  return <div className="space-y-4">{children}</div>;
}

// Header Component
export function MultiStepperHeader({ children }: { children: ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

export function MultiStepperBackButton({
  routeBack,
}: {
  routeBack?: () => void;
}) {
  const { currentStep, prevStep } = useContext(StepperContext);

  const handleBack = () => {
    if (currentStep > 1) {
      prevStep();
    } else if (routeBack) {
      routeBack();
    }
  };
  return (
    <Button
      variant="outline"
      size="icon"
      type="button"
      onClick={handleBack}
      className={cn(
        "size-10 rounded-full",
        !routeBack && currentStep === 1 && "invisible",
      )}
      aria-label="Previous step"
    >
      <ArrowLeft className="size-4" />
    </Button>
  );
}

// Step Indicator Component
export function MultiStepperIndicator({
  showCount = false,
  showBackButton = true,
  routeBack,
}: {
  showCount?: boolean;
  showBackButton?: boolean;
  routeBack?: () => void;
}) {
  const { currentStep, totalSteps } = useContext(StepperContext);
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        {showBackButton && <MultiStepperBackButton routeBack={routeBack} />}

        {showCount && (
          <span className="text-muted-foreground text-sm">
            Step {currentStep} of {totalSteps}
          </span>
        )}
      </div>
      <div className="bg-secondary h-2 w-full overflow-hidden rounded-full">
        <div
          className="bg-primary h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        />
      </div>
    </div>
  );
}

export function MultiStepperButton({ children }: PropsWithChildren) {
  const { currentStep, totalSteps, nextStep, currentStepValidator } =
    useContext(StepperContext);

  const isLastStep = useMemo(
    () => currentStep === totalSteps,
    [currentStep, totalSteps],
  );

  const handleNextClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Always prevent default to avoid unwanted form submission
    e.preventDefault();

    if (!isLastStep) {
      if (currentStepValidator) {
        const isValid = await currentStepValidator();
        if (isValid) {
          nextStep();
        }
      } else {
        nextStep();
      }
    } else {
      // On last step, validate if needed then submit the form
      if (currentStepValidator) {
        const isValid = await currentStepValidator();
        if (isValid) {
          // Find the closest form and submit it
          const form = (e.target as HTMLElement).closest("form");
          if (form) {
            form.requestSubmit();
          }
        }
      } else {
        // No validation needed, submit the form
        const form = (e.target as HTMLElement).closest("form");
        if (form) {
          form.requestSubmit();
        }
      }
    }
  };

  if (isLastStep && children) {
    // If we have custom children for last step, render them
    return <div className="flex justify-center pt-4">{children}</div>;
  }

  return (
    <div className="flex justify-center pt-4">
      <Button
        type="button"
        size="lg"
        className="w-4/5 @lg:w-3/5"
        onClick={handleNextClick}
      >
        {isLastStep ? "Submit" : "Next"}
      </Button>
    </div>
  );
}
