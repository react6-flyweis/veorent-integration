import { useNavigate, useParams } from "react-router";

import { BackButton } from "@/components/BackButton";

import { useGetPropertyByIdQuery } from "./api/queries";
import { UtilitiesForm } from "./components/UtilitiesForm";

export default function EditPropertyUtilities() {
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
      <UtilitiesForm
        defaultValues={data?.amenities}
        propertyName={propertyAddress}
        onSuccess={() => navigate(`/landlord/properties/${id}/edit`)}
      />
    </div>
  );
}
