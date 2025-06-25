import { useTranslation } from "react-i18next";

import supportImg from "@/assets/images/support.jpg";
import { PageTitle } from "@/components/PageTitle";

import { ContactForm } from "./components/ContactForm";

export default function Support() {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <PageTitle title={t("support")} withBack />
      <img
        src={supportImg}
        className="h-52 w-full rounded object-cover"
        alt=""
      />
      <h2 className="text-primary text-xl font-bold">
        {t("inVeorentWeAreHere24x7")}
      </h2>
      <ContactForm />
    </div>
  );
}
