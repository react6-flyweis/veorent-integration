import { useRef, useEffect, useCallback } from "react";
import { useParams } from "react-router";

import {
  MultiStepper,
  MultiStepperIndicator,
  MultiStepperStep,
  type MultiStepperRef,
} from "@/components/MultiStepper";
import { useGoBack } from "@/hooks/useGoBack";

import { useGetPropertyByIdQuery } from "./api/queries";
import { AmenitiesForm } from "./components/AmenitiesForm";
import { LeasingBasicsForm } from "./components/LeasingBasicsForm";
import { ListingDescriptionForm } from "./components/ListingDescriptionForm";
import { ListingSuccessScreen } from "./components/ListingSuccessScreen";
import { PermissionsForm } from "./components/PermissionsForm";
import { PhoneVerificationForm } from "./components/PhoneVerificationForm";
import { PhotosVideosForm } from "./components/PhotosVideosForm";
import { PropertySizeForm } from "./components/PropertySizeForm";
import { UtilitiesForm } from "./components/UtilitiesForm";

export default function SetupListing() {
  const goBack = useGoBack();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetPropertyByIdQuery(id || "");

  const stepperRef = useRef<MultiStepperRef>(null);

  // Function to determine the current step based on form completion status
  const getCurrentStep = useCallback(() => {
    if (!data?.formCompletionStatus) return 1;

    const completionStatus = data.formCompletionStatus;

    // Check each step in order and return the first incomplete step
    if (!completionStatus.propertySize) return 1; // PropertySizeForm
    if (!completionStatus.leasingBasics) return 2; // LeasingBasicsForm
    if (!completionStatus.permission) return 3; // PermissionsForm
    if (!completionStatus.amenities) return 4; // UtilitiesForm (uses amenities data)
    if (!completionStatus.amenities) return 5; // AmenitiesForm

    // For steps not tracked in formCompletionStatus, check if data exists
    if (!data.name || !data.description) return 6; // ListingDescriptionForm
    if (!data.image || data.image.length === 0) return 7; // PhotosVideosForm

    // If everything is complete, go to the last step (success screen)
    return 8; // ListingSuccessScreen
  }, [data]);

  // Navigate to the appropriate step when data loads
  useEffect(() => {
    if (data && stepperRef.current) {
      const targetStep = getCurrentStep();
      if (targetStep > 1) {
        stepperRef.current.goToStep(targetStep);
      }
    }
  }, [data, getCurrentStep]);

  const handleSuccess = () => {
    if (stepperRef.current) {
      stepperRef.current.goNext();
    }
  };

  return (
    <MultiStepper ref={stepperRef}>
      <MultiStepperIndicator routeBack={goBack} />

      <MultiStepperStep>
        <PropertySizeForm
          defaultValues={data?.propertySize}
          propertyName={data?.name}
          onSuccess={handleSuccess}
        />
      </MultiStepperStep>

      <MultiStepperStep>
        <LeasingBasicsForm
          defaultValues={data?.leasingBasics}
          propertyName={data?.name}
          onSuccess={handleSuccess}
        />
      </MultiStepperStep>

      <MultiStepperStep>
        <PermissionsForm
          defaultValues={data?.permission}
          propertyName={data?.name}
          onSuccess={handleSuccess}
        />
      </MultiStepperStep>

      <MultiStepperStep>
        <UtilitiesForm
          defaultValues={data?.amenities}
          propertyName={data?.name}
          onSuccess={handleSuccess}
        />
      </MultiStepperStep>

      <MultiStepperStep>
        <AmenitiesForm
          defaultValues={data?.amenities}
          propertyName={data?.name}
          onSuccess={handleSuccess}
        />
      </MultiStepperStep>

      <MultiStepperStep>
        <ListingDescriptionForm
          defaultValues={{
            title: data?.name,
            description: data?.description,
          }}
          propertyName={data?.name}
          onSuccess={handleSuccess}
        />
      </MultiStepperStep>

      <MultiStepperStep>
        <PhotosVideosForm
          defaultValues={{
            photos: data?.image,
            videos: data?.video,
          }}
          propertyName={data?.name}
          onSuccess={handleSuccess}
        />
      </MultiStepperStep>

      <MultiStepperStep>
        <PhoneVerificationForm
          defaultValues={{
            phone: "", // These properties don't exist in IProperty
            phoneVerified: false,
          }}
          propertyName={data?.name}
          onSuccess={handleSuccess}
        />
      </MultiStepperStep>

      <MultiStepperStep>
        <ListingSuccessScreen propertyName={data?.name} />
      </MultiStepperStep>
    </MultiStepper>
  );
}
