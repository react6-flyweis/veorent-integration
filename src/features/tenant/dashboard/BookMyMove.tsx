import { useNavigate } from "react-router";

import { PageTitle } from "@/components/PageTitle";

import { BookMyMoveForm } from "./components/BookMoveForm";

export default function BookMyMove() {
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      <PageTitle title="Book My Move" withBack />
      <BookMyMoveForm
        onNext={(data) => {
          const dataToSend = {
            currentProperty: {
              streetAddress: data.currentStreet,
              unitNumber: data.currentUnit,
              city: data.currentCity,
              region: data.currentRegion,
              zipCode: data.currentZip,
            },
            currentPropertyLeaseTerm: {
              termType: data.leaseType,
              startDate: data.leaseStart,
              endDate: data.leaseEnd,
            },
            destinationProperty: {
              streetAddress: data.newStreet,
              unitNumber: data.newUnit,
              city: data.newCity,
              region: data.newRegion,
              zipCode: data.newZip,
            },
            destinationPropertyLeaseTerm: {
              termType: data.newLeaseType,
              startDate: data.newLeaseStart,
              endDate: data.newLeaseEnd,
            },
            moveDate: data.moveStart,
            moveTime: data.moveStartTime,

            moveEnd: data.moveEnd,
            moveEndTime: data.moveEndTime,

            flexibleTimings: data.isFlexible,
            flexibleTimingsData: data.flexibilityDuration,
          };
          navigate("/tenant/move-in-process", {
            state: { data: dataToSend },
          });
        }}
      />
    </div>
  );
}
