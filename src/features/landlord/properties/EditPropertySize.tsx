import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";

import { BackButton } from "@/components/BackButton";

import { useGetPropertyByIdQuery } from "./api/queries";
import { PropertySizeForm } from "./components/PropertySizeForm";

export default function EditPropertySize() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetPropertyByIdQuery(id || "");

  return (
    <div>
      <div className="border-primary mb-5 border-b-6 pb-3">
        <BackButton />
      </div>
      <PropertySizeForm
        defaultValues={data?.propertySize}
        propertyName={
          data?.propertyDetails?.streetAddress || data?.name || t("properties")
        }
        onSuccess={() => navigate(`/landlord/properties/${id}/edit`)}
      />
    </div>
  );
}
