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
    </MultiStepper>
  );
}
