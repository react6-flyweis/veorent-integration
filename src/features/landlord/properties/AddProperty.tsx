import {
  MultiStepper,
  MultiStepperStep,
  type MultiStepperRef,
} from "@/components/MultiStepper";
import { PropertyType } from "./PropertyType";
import { PropertyAddress } from "./PropertyAddress";
import { PropertyDetails } from "./PropertyDetails";
import { useRef } from "react";

export default function AddProperty() {
  const stepperRef = useRef<MultiStepperRef>(null);
  const handleSuccess = () => {
    if (stepperRef.current) {
      stepperRef.current.goNext();
    }
  };
  return (
    <div>
      <MultiStepper ref={stepperRef}>
        <MultiStepperStep>
          <PropertyType onSuccess={handleSuccess} />
        </MultiStepperStep>
        <MultiStepperStep>
          <PropertyAddress onSuccess={handleSuccess} />
        </MultiStepperStep>
        <MultiStepperStep>
          <PropertyDetails />
        </MultiStepperStep>
      </MultiStepper>
    </div>
  );
}
