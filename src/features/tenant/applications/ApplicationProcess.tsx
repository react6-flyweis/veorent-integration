import { Link, useNavigate } from "react-router";
import {
  MultiStepper,
  MultiStepperBackButton,
  MultiStepperHeader,
  MultiStepperIndicator,
  MultiStepperStep,
  type MultiStepperRef,
} from "@/components/MultiStepper";
import { Button } from "@/components/ui/button";
import { ApplicationInfo } from "./components/FormSteps/ApplicationInfo";
import { ResidentialHistory } from "./components/FormSteps/ResidentialHistory";
import { EmploymentDetails } from "./components/FormSteps/Employment";
import { OtherIncome } from "./components/FormSteps/OtherIncome";
import { GeneralInfo } from "./components/FormSteps/GeneralInfo";
import { BackgroundInfo } from "./components/FormSteps/Background";
import EmergencyContactForm from "./components/FormSteps/OtherInfo";
import UploadDocumentsForm from "./components/FormSteps/UploadDocuments";
import { PaymentFee } from "./components/FormSteps/PaymentFee";
import { useRef } from "react";

export default function ApplicationProcess() {
  const navigate = useNavigate();
  const stepperRef = useRef<MultiStepperRef>(null);

  const handleExternalNext = () => {
    stepperRef.current?.goNext();
  };
  return (
    <MultiStepper ref={stepperRef}>
      <MultiStepperHeader>
        <div className="flex justify-between items-center">
          <MultiStepperBackButton routeBack={() => navigate(-1)} />
          <Button variant="ghost" asChild>
            <Link to="/">
              <span>Save & Finish Later</span>
            </Link>
          </Button>
        </div>
        <MultiStepperIndicator showBackButton={false} />
      </MultiStepperHeader>
      <MultiStepperStep>
        <ApplicationInfo onSuccess={handleExternalNext} />
      </MultiStepperStep>
      <MultiStepperStep>
        <ResidentialHistory onSuccess={handleExternalNext} />
      </MultiStepperStep>
      <MultiStepperStep>
        <EmploymentDetails onSuccess={handleExternalNext} />
      </MultiStepperStep>
      <MultiStepperStep>
        <OtherIncome onSuccess={handleExternalNext} />
      </MultiStepperStep>
      <MultiStepperStep>
        <GeneralInfo onSuccess={handleExternalNext} />
      </MultiStepperStep>
      <MultiStepperStep>
        <BackgroundInfo onSuccess={handleExternalNext} />
      </MultiStepperStep>
      <MultiStepperStep>
        <EmergencyContactForm onSuccess={handleExternalNext} />
      </MultiStepperStep>
      <MultiStepperStep>
        <UploadDocumentsForm onSuccess={handleExternalNext} />
      </MultiStepperStep>
      <MultiStepperStep>
        <PaymentFee />
      </MultiStepperStep>
    </MultiStepper>
  );
}
