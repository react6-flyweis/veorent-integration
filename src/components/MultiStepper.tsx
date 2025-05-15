import {
  createContext,
  useContext,
  useState,
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
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
}>({
  currentStep: 1,
  totalSteps: 1,
  nextStep: () => {},
  prevStep: () => {},
});

// Stepper Provider Component
export function MultiStepper({
  children,
}: {
  children: ReactElement[];
  routeBack?: boolean;
  showCount?: boolean;
}) {
  const [step, setStep] = useState(1);

  // Separate children by type
  const steps = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === MultiStepperStep
  ) as ReactElement[];

  const header = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === MultiStepperHeader
  ) as ReactElement | undefined;

  const indicator = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === MultiStepperIndicator
  ) as ReactElement | undefined;

  const button = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === MultiStepperButton
  ) as ReactElement | undefined;

  const totalSteps = steps.length;

  const nextStep = () => {
    if (step < totalSteps) setStep((s) => s + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  return (
    <StepperContext.Provider
      value={{ currentStep: step, nextStep, prevStep, totalSteps }}
    >
      <div className="space-y-6">
        {/* Step Indicator */}

        {indicator && <> {indicator}</>}

        {/* Header */}
        {header && <>{header}</>}

        {/* Animated Step Panel */}
        <div className="relative min-h-[350px]">
          {steps.map((child, index) =>
            index + 1 === step ? (
              <div key={index}>{cloneElement(child)}</div>
            ) : null
          )}
        </div>

        {/* Navigation Button */}
        {button && <div>{button}</div>}
      </div>
    </StepperContext.Provider>
  );
}

// Step Component
export function MultiStepperStep({ children }: { children: ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}

// Header Component
export function MultiStepperHeader({ children }: { children: ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

// Step Indicator Component
export function MultiStepperIndicator({
  showCount = false,
  routeBack,
}: {
  showCount?: boolean;
  routeBack?: () => void;
}) {
  const { currentStep, totalSteps, prevStep } = useContext(StepperContext);
  const progress = (currentStep / totalSteps) * 100;

  const handleBack = () => {
    if (currentStep > 1) {
      prevStep();
    } else if (routeBack) {
      routeBack();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          type="button"
          onClick={handleBack}
          className={cn(
            "rounded-full size-10",
            !routeBack && currentStep === 1 && "invisible"
          )}
          aria-label="Previous step"
        >
          <ArrowLeft className="size-4" />
        </Button>
        {showCount && (
          <span className="text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </span>
        )}
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
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

// Button Component
export function MultiStepperButton() {
  const { currentStep, totalSteps, nextStep } = useContext(StepperContext);

  return (
    <div className="flex justify-center pt-4">
      <Button
        type={currentStep === totalSteps ? "submit" : "button"}
        size="lg"
        className="w-3/5"
        onClick={() => {
          if (currentStep < totalSteps) {
            nextStep();
          }
        }}
      >
        {currentStep === totalSteps ? "Submit" : "Next"}
      </Button>
    </div>
  );
}
