import { useTranslation } from "react-i18next";

import customerServiceImg from "@/assets/images/customer-service.png";
import questionMarkImg from "@/assets/images/question-mark.png";
import { IconCard } from "@/components/IconCard";
import { PageTitle } from "@/components/PageTitle";


export default function Help() {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <PageTitle title={t("help")} />
      <div className="grid gap-5 @lg:grid-cols-2">
        <IconCard
          title={t("questionsAboutRental")}
          description={t("questionsAboutRentalDescription")}
          icon={questionMarkImg}
          actionText={t("messageLandlord")}
          url="/tenant/messages"
        />
        <IconCard
          title={t("veorentQuestions")}
          description={t("veorentQuestionsDescription")}
          icon={customerServiceImg}
          actionText={t("veorentSupport")}
          url="/tenant/support"
        />
      </div>
    </div>
  );
}
