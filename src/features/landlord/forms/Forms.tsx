import { useTranslation } from "react-i18next";

import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";

import { DownloadableFormCard } from "./components/DownloadableFormCard";
import { FormCard } from "./components/FormCard";

export default function Forms() {
  const { t } = useTranslation();

  return (
    <div className="">
      <PageTitle title={t("forms")} />

      <div className="mt-2 mb-6">
        <span className="text-sm font-medium text-blue-500 uppercase">
          {t("interactiveForms")}
        </span>
        <h2 className="mt-1 text-xl font-bold">{t("buildYourOwnForms")}</h2>
        <p className="mt-2 max-w-3xl text-gray-700">{t("formsDescription")}</p>
      </div>

      <div className="mt-6 space-y-4">
        <FormCard
          title={t("stateSpecificLeaseAgreement")}
          description={t("stateSpecificLeaseDescription")}
          buttonText={t("startLease")}
          url="/landlord/lease-agreement"
        />

        <FormCard
          title={t("leaseAgreementAddendum")}
          description={t("leaseAddendumDescription")}
          buttonText={t("startAddendum")}
          url="/landlord/lease-addendum"
        />

        <FormCard
          title={t("customizableConditionReport")}
          description={t("conditionReportDescription")}
          buttonText={t("startReport")}
        />
      </div>

      {/* Downloadable Forms Section */}
      <div className="mt-16 mb-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col justify-between @md:flex-row">
            <span className="text-lg font-medium text-blue-500 uppercase">
              {t("downloadableForms")}
            </span>
            <Button>{t("getTheFormsPack")}</Button>
          </div>
          <h2 className="mt-1 text-xl font-bold">
            {t("essentialFormsYouNeed")}
          </h2>
          <p className="mt-2 max-w-3xl text-gray-700">
            {t("formsDescription")}
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-sm bg-orange-400"></div>
              <span>{t("formsDescription")}</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-sm bg-orange-400"></div>
              <span>{t("formsDescription")}</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-sm bg-orange-400"></div>
              <span>{t("formsDescription")}</span>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold">
            {t("previewTheFormsPack")}
          </h3>
          <div className="grid grid-cols-1 gap-5">
            <DownloadableFormCard title={t("forms.leaseAgreementAddendum")} />
            <DownloadableFormCard title={t("forms.coSignerAgreement")} />
            <DownloadableFormCard title={t("forms.petAddendum")} />
            <DownloadableFormCard
              title={t("forms.securityDepositClosingStatement")}
            />
            <DownloadableFormCard title={t("forms.rentIncreaseNotice")} />
            <DownloadableFormCard title={t("forms.noticeToPayRentOrQuit")} />
            <DownloadableFormCard title={t("forms.cleaningRequiredNotice")} />
            <DownloadableFormCard title={t("forms.noiseComplaintLetter")} />
            <DownloadableFormCard title={t("forms.noticeOfReturnedCheck")} />
            <DownloadableFormCard title={t("forms.operatingBudgetWorksheet")} />
            <DownloadableFormCard
              title={t("forms.preventativeMaintenanceSchedule")}
            />
            <DownloadableFormCard
              title={t("forms.propertyMakeReadyChecklist")}
            />
            <DownloadableFormCard
              title={t("forms.tenantsNoticeOfTermination")}
            />
            <DownloadableFormCard
              title={t("forms.tenantEstoppelCertificate")}
            />
            <DownloadableFormCard
              title={t("forms.propertyRulesAndRegulations")}
            />
            <DownloadableFormCard title={t("forms.trustAccountLedger")} />
            <DownloadableFormCard title={t("forms.welcomeLetter")} />
            <DownloadableFormCard
              title={t("forms.twentyFourHourNoticeToEnter")}
            />
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-10 rounded-lg bg-blue-200 p-4">
        <h4 className="font-semibold">{t("disclaimer")}</h4>
        <p className="text-sm">{t("disclaimerText")}</p>
      </div>
    </div>
  );
}
