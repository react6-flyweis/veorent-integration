import { useRef, useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router";

import {
  MultiStepper,
  MultiStepperBackButton,
  MultiStepperHeader,
  MultiStepperIndicator,
  MultiStepperStep,
  type MultiStepperRef,
} from "@/components/MultiStepper";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGoBack } from "@/hooks/useGoBack";

import { useGetBookingQuery } from "./api/query";
import { ApplicationSavedDialog } from "./components/ApplicationSavedDialog";
import { ApplicationInfo } from "./components/FormSteps/ApplicationInfo";
import { BackgroundInfo } from "./components/FormSteps/Background";
import { EmploymentDetails } from "./components/FormSteps/Employment";
import { GeneralInfo } from "./components/FormSteps/GeneralInfo";
import { OtherIncome } from "./components/FormSteps/OtherIncome";
import EmergencyContactForm from "./components/FormSteps/OtherInfo";
import { PaymentFee } from "./components/FormSteps/PaymentFee";
import { ResidentialHistory } from "./components/FormSteps/ResidentialHistory";
import UploadDocumentsForm from "./components/FormSteps/UploadDocuments";
import { SaveAndFinishDialog } from "./components/SaveAndFinishDialog";

export default function ApplicationProcess() {
  const { id } = useParams<{ id: string }>();
  const { data: bookingData, isLoading, error } = useGetBookingQuery(id || "");
  const goBack = useGoBack();
  const stepperRef = useRef<MultiStepperRef>(null);
  const [isApplicationSavedOpen, setIsApplicationSavedOpen] = useState(false);
  const navigate = useNavigate();

  // Redirect if payment is already completed
  useEffect(() => {
    if (bookingData?.paymentStatus === "Paid") {
      navigate("/tenant/dashboard", { replace: true });
    }
  }, [bookingData, navigate]);

  // Function to determine the current step based on form completion status
  const getCurrentStep = useCallback(() => {
    if (!bookingData) return 1;

    // Check each step in order and return the first incomplete step
    if (!bookingData.applicationInfo) return 1; // ApplicationInfo
    if (!bookingData.currentAddress) return 2; // ResidentialHistory
    if (!bookingData.employment) return 3; // EmploymentDetails
    if (!bookingData.otherIncome) return 4; // OtherIncome
    if (!bookingData.generalInformation) return 5; // GeneralInfo
    if (!bookingData.background) return 6; // BackgroundInfo
    if (!bookingData.emergencyContact) return 7; // EmergencyContact
    if (!bookingData.document) return 8; // UploadDocuments

    // If everything is complete, go to the payment step
    return 9; // PaymentFee
  }, [bookingData]);

  // Navigate to the appropriate step when data loads
  useEffect(() => {
    if (bookingData && stepperRef.current) {
      const targetStep = getCurrentStep();
      if (targetStep > 1) {
        stepperRef.current.goToStep(targetStep);
      }
    }
  }, [bookingData, getCurrentStep]);

  const showSavedDialog = () => {
    setIsApplicationSavedOpen(true);
    setTimeout(() => {
      setIsApplicationSavedOpen(false);
    }, 3000); // Auto-close after 3 seconds
  };

  const handleExternalNext = () => {
    stepperRef.current?.goNext();
  };

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-6 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  // Show error state if fetching failed
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <h2 className="mb-2 text-xl font-semibold text-red-600">
          Error Loading Application
        </h2>
        <p className="mb-4 text-gray-600">
          Unable to load your application data. Please try again.
        </p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  // Show not found state if no booking data
  if (!bookingData) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <h2 className="mb-2 text-xl font-semibold text-gray-600">
          Application Not Found
        </h2>
        <p className="mb-4 text-gray-600">
          The application you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={goBack}>Go Back</Button>
      </div>
    );
  }

  return (
    <MultiStepper ref={stepperRef}>
      <MultiStepperHeader>
        <div className="flex items-center justify-between">
          <MultiStepperBackButton routeBack={goBack} />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost">
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
        <ApplicationInfo
          bookingData={bookingData}
          onSuccess={handleExternalNext}
        />
      </MultiStepperStep>
      <MultiStepperStep>
        <ResidentialHistory
          bookingData={bookingData}
          onSuccess={handleExternalNext}
        />
      </MultiStepperStep>
      <MultiStepperStep>
        <EmploymentDetails
          bookingData={bookingData}
          onSuccess={handleExternalNext}
        />
      </MultiStepperStep>
      <MultiStepperStep>
        <OtherIncome bookingData={bookingData} onSuccess={handleExternalNext} />
      </MultiStepperStep>
      <MultiStepperStep>
        <GeneralInfo bookingData={bookingData} onSuccess={handleExternalNext} />
      </MultiStepperStep>
      <MultiStepperStep>
        <BackgroundInfo
          bookingData={bookingData}
          onSuccess={handleExternalNext}
        />
      </MultiStepperStep>
      <MultiStepperStep>
        <EmergencyContactForm
          bookingData={bookingData}
          onSuccess={handleExternalNext}
        />
      </MultiStepperStep>
      <MultiStepperStep>
        <UploadDocumentsForm
          bookingData={bookingData}
          onSuccess={handleExternalNext}
        />
      </MultiStepperStep>
      <MultiStepperStep>
        <PaymentFee />
      </MultiStepperStep>
    </MultiStepper>
  );
}
