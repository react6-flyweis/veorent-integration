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
import { ListingDescriptionForm } from "./components/ListingDescriptionForm";
import { PhotosVideosForm } from "./components/PhotosVideosForm";
import { PhoneVerificationForm } from "./components/PhoneVerificationForm";
import { PublishListingForm } from "./components/PublishListingForm";
import { ListingSuccessScreen } from "./components/ListingSuccessScreen";
import { UtilitiesForm } from "./components/UtilitiesForm";
import { AmenitiesForm } from "./components/AmenitiesForm";
import { useGetPropertyByIdQuery } from "./api/queries";
import { useParams } from "react-router";

export default function SetupListing() {
  const goBack = useGoBack();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetPropertyByIdQuery(id || "");

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
        <PropertySizeForm
          defaultValues={data?.propertySize}
          onSuccess={handleSuccess}
        />
      </MultiStepperStep>

      <MultiStepperStep>
        <LeasingBasicsForm onSuccess={handleSuccess} />
      </MultiStepperStep>

      <MultiStepperStep>
        <PermissionsForm onSuccess={handleSuccess} />
      </MultiStepperStep>

      <MultiStepperStep>
        <UtilitiesForm onSuccess={handleSuccess} />
      </MultiStepperStep>

      <MultiStepperStep>
        <AmenitiesForm onSuccess={handleSuccess} />
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
