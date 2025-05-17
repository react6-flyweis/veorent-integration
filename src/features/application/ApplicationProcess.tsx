import { useNavigate } from "react-router";
import {
  MultiStepper,
  MultiStepperBackButton,
  MultiStepperHeader,
  MultiStepperIndicator,
  MultiStepperStep,
} from "@/components/MultiStepper";
import { Button } from "@/components/ui/button";
import { ApplicationInfo } from "./components/FormSteps/ApplicationInfo";
import { ResidentialHistory } from "./components/FormSteps/ResidentialHistory";
import { Employment } from "./components/FormSteps/Employment";
import { OtherIncome } from "./components/FormSteps/OtherIncome";
import { GeneralInfo } from "./components/FormSteps/GeneralInfo";
import { BackgroundInfo } from "./components/FormSteps/Background";
import EmergencyContactForm from "./components/FormSteps/OtherInfo";
import UploadDocumentsForm from "./components/FormSteps/UploadDocuments";
import { PaymentFee } from "./components/FormSteps/PaymentFee";

export default function ApplicationProcess() {
  const navigate = useNavigate();
  return (
    <MultiStepper>
      <MultiStepperHeader>
        <div className="flex justify-between items-center">
          <MultiStepperBackButton routeBack={() => navigate(-1)} />
          <Button variant="ghost">
            <span>Save & Finish Later</span>
          </Button>
        </div>
        <MultiStepperIndicator showBackButton={false} />
      </MultiStepperHeader>
      <MultiStepperStep>
        <ApplicationInfo />
      </MultiStepperStep>
      <MultiStepperStep>
        <ResidentialHistory />
      </MultiStepperStep>
      <MultiStepperStep>
        <Employment />
      </MultiStepperStep>
      <MultiStepperStep>
        <OtherIncome />
      </MultiStepperStep>
      <MultiStepperStep>
        <GeneralInfo />
      </MultiStepperStep>
      <MultiStepperStep>
        <BackgroundInfo />
      </MultiStepperStep>
      <MultiStepperStep>
        <EmergencyContactForm />
      </MultiStepperStep>
      <MultiStepperStep>
        <UploadDocumentsForm />
      </MultiStepperStep>
      <MultiStepperStep>
        <PaymentFee />
      </MultiStepperStep>
    </MultiStepper>
  );
}
