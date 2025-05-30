import { BackButton } from "@/components/BackButton";
import { useNavigate } from "react-router";
import { PropertyAddressForm } from "./components/PropertyAddressForm";
import { IconRound } from "@/components/IconRound";

import houseIcon from "./assets/house.png";

export default function EditPropertyAddress() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="border-primary mb-5 border-b-6 pb-3">
        <BackButton />
      </div>
      <div className="mb-1 flex items-center gap-2">
        <IconRound icon={houseIcon} size="sm" />
        <h2 className="text-2xl font-bold">Property Address & Units</h2>
      </div>
      <h3 className="text-primary mb-3 text-xl">123 Main St.</h3>
      <PropertyAddressForm
        onSuccess={() => navigate("/landlord/properties/1/edit")}
      />
    </div>
  );
}
