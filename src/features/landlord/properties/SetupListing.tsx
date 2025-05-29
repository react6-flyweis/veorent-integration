import { useRef } from "react";
import {
  MultiStepper,
  MultiStepperIndicator,
  MultiStepperStep,
  type MultiStepperRef,
} from "@/components/MultiStepper";
import { useGoBack } from "@/hooks/useGoBack";
import { PropertySizeForm } from "./components/PropertySizeForm";
import { LeasingBasicsForm } from "./components/LeasingBasicsForm";
import { PermissionsForm } from "./components/PermissionsForm";
import { UtilitiesAmenitiesForm } from "./components/UtilitiesAmenitiesForm";
import { ListingDescriptionForm } from "./components/ListingDescriptionForm";
import { PhotosVideosForm } from "./components/PhotosVideosForm";
import { PhoneVerificationForm } from "./components/PhoneVerificationForm";
import { PublishListingForm } from "./components/PublishListingForm";
import { ListingSuccessScreen } from "./components/ListingSuccessScreen";

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

      <MultiStepperStep>
        <ListingDescriptionForm onSuccess={handleSuccess} />
      </MultiStepperStep>

      <MultiStepperStep>
        <PhotosVideosForm onSuccess={handleSuccess} />
      </MultiStepperStep>

      <MultiStepperStep>
        <PhoneVerificationForm onSuccess={handleSuccess} />
      </MultiStepperStep>

      <MultiStepperStep>
        <PublishListingForm onSuccess={handleSuccess} />
      </MultiStepperStep>

      <MultiStepperStep>
        <ListingSuccessScreen />
      </MultiStepperStep>
    </MultiStepper>
  );
}
