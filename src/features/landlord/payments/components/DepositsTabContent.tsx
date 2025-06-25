import { useTranslation } from "react-i18next";

import depositsIcon from "../assets/deposits.png";

export const DepositsTabContent = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <img src={depositsIcon} alt="No deposits" className="max-h-20 max-w-20" />

      <h2 className="mb-2 text-center text-2xl font-bold">
        {t("noDepositsYet")}
      </h2>
      <p className="max-w-xl text-center text-gray-600">
        {t("depositsDescription")}
      </p>
    </div>
  );
};
