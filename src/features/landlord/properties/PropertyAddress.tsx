import { PageTitle } from "@/components/PageTitle";

import mapPinIcon from "./assets/map-pin.png";
import { PropertyAddressForm } from "./components/PropertyAddressForm";

export function PropertyAddress({ onSuccess }: { onSuccess: () => void }) {
  return (
    <div className="">
      <PageTitle title="Add Property Address" withBack />
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <img src={mapPinIcon} alt="" className="max-h-7 max-w-7" />
          <h2 className="text-2xl font-bold">Property Address</h2>
        </div>

        <PropertyAddressForm onSuccess={onSuccess} />
      </div>
    </div>
  );
}
