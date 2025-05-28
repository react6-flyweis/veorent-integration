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
import { useRef, useState } from "react";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { SaveAndFinishDialog } from "./components/SaveAndFinishDialog";
import { ApplicationSavedDialog } from "./components/ApplicationSavedDialog";
import { useGoBack } from "@/hooks/useGoBack";

export default function ApplicationProcess() {
  const goBack = useGoBack();
  const stepperRef = useRef<MultiStepperRef>(null);
  const [isApplicationSavedOpen, setIsApplicationSavedOpen] = useState(false);

  const showSavedDialog = () => {
    setIsApplicationSavedOpen(true);
    setTimeout(() => {
      setIsApplicationSavedOpen(false);
    }, 3000); // Auto-close after 3 seconds
  };

  const handleExternalNext = () => {
    stepperRef.current?.goNext();
  };
  return (
    <MultiStepper ref={stepperRef}>
      <MultiStepperHeader>
        <div className="flex items-center justify-between">
          <MultiStepperBackButton routeBack={goBack} />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" asChild>
                <span>Save & Finish Later</span>
              </Button>
            </AlertDialogTrigger>
            <SaveAndFinishDialog onSuccess={showSavedDialog} />
          </AlertDialog>

          <ApplicationSavedDialog
            open={isApplicationSavedOpen}
            onOpenChange={setIsApplicationSavedOpen}
          />
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
