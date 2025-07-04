import { useTranslation } from "react-i18next";

import amexImg from "@/assets/images/amex.png";
import discoverImg from "@/assets/images/discover.png";
import masterImg from "@/assets/images/master.png";
import visaImg from "@/assets/images/visa.png";
import { PageTitle } from "@/components/PageTitle";

import { CardDetailsForm } from "./components/CardDetailsForm";

export default function AddCardDetails() {
  const { t } = useTranslation();
  return (
    <div className="space-y-5">
      <PageTitle title={t("addCardDetailsTitle")} withBack />
      <div className="flex gap-1">
        <img src={amexImg} alt="" className="h-8" />
        <img src={discoverImg} alt="" className="h-8" />
        <img src={visaImg} alt="" className="h-8" />
        <img src={masterImg} alt="" className="h-8" />
      </div>
      <CardDetailsForm />
    </div>
  );
}
