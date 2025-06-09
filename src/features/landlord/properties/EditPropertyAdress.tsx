import { useNavigate, useParams } from "react-router";

import { BackButton } from "@/components/BackButton";
import { IconRound } from "@/components/IconRound";

import { useGetPropertyByIdQuery } from "./api/queries";
import houseIcon from "./assets/house.png";
import { PropertyAddressForm } from "./components/PropertyAddressForm";

export default function EditPropertyAddress() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetPropertyByIdQuery(id || "");

  const propertyAddress =
    data?.propertyDetails?.streetAddress || "Property Address";

  return (
    <div>
      <div className="border-primary mb-5 border-b-6 pb-3">
        <BackButton />
      </div>
      <div className="mb-1 flex items-center gap-2">
        <IconRound icon={houseIcon} size="sm" />
        <h2 className="text-2xl font-bold">Property Address & Units</h2>
      </div>
      <PropertyAddressForm
        defaultValues={data?.propertyDetails}
        propertyName={propertyAddress}
        onSuccess={() => navigate(`/landlord/properties/${id}/edit`)}
      />
    </div>
  );
}
