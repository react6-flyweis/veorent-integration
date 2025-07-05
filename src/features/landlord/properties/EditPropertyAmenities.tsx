import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";

import { BackButton } from "@/components/BackButton";

import { useGetPropertyByIdQuery } from "./api/queries";
import { AmenitiesForm } from "./components/AmenitiesForm";

export default function EditPropertyAmenities() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetPropertyByIdQuery(id || "");

  const propertyAddress =
    data?.propertyDetails?.streetAddress || t("propertyAddress");

  return (
    <div>
      <div className="border-primary mb-5 border-b-6 pb-3">
        <BackButton />
      </div>
      <AmenitiesForm
        defaultValues={data?.amenities}
        propertyName={propertyAddress}
        onSuccess={() => navigate(`/landlord/properties/${id}/edit`)}
      />
    </div>
  );
}
