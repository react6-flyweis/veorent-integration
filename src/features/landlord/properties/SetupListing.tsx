import { useRef } from "react";
import {
  MultiStepper,
  MultiStepperButton,
  MultiStepperIndicator,
  MultiStepperStep,
  type MultiStepperRef,
} from "@/components/MultiStepper";
import { useGoBack } from "@/hooks/useGoBack";
import { PropertySizeForm } from "./components/PropertySizeForm";
import { LeasingBasicsForm } from "./components/LeasingBasicsForm";
import { PermissionsForm } from "./components/PermissionsForm";
import { UtilitiesAmenitiesForm } from "./components/UtilitiesAmenitiesForm";

export default function SetupListing() {
  const goBack = useGoBack();

  const stepperRef = useRef<MultiStepperRef>(null);

  const handleSuccess = () => {
    if (stepperRef.current) {
      stepperRef.current.goNext();
    }
  };

  return (
    <MultiStepper ref={stepperRef}>
      <MultiStepperIndicator routeBack={goBack} />

      <MultiStepperStep>
        <PropertySizeForm onSuccess={handleSuccess} />
      </MultiStepperStep>

      <MultiStepperStep>
        <LeasingBasicsForm onSuccess={handleSuccess} />
      </MultiStepperStep>

      <MultiStepperStep>
        <PermissionsForm onSuccess={handleSuccess} />
      </MultiStepperStep>

      <MultiStepperStep>
        <UtilitiesAmenitiesForm onSuccess={handleSuccess} />
      </MultiStepperStep>

      <MultiStepperButton />
    </MultiStepper>
  );
}
