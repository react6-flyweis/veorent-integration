import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";

import { BackButton } from "@/components/BackButton";

import { useGetPropertyByIdQuery } from "./api/queries";
import { LeasingBasicsForm } from "./components/LeasingBasicsForm";

export default function EditPropertyBasics() {
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
      <LeasingBasicsForm
        defaultValues={data?.leasingBasics}
        propertyName={propertyAddress}
        onSuccess={() => navigate(`/landlord/properties/${id}/edit`)}
      />
    </div>
  );
}
