import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { BackButton } from "@/components/BackButton";
import { CurrencyIcon } from "@/components/CurrencyIcon";
import { IconRound } from "@/components/IconRound";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetInsurancePlansQuery } from "./api/queries";
import homeInsuranceIcon from "./assets/home-insurance.png";

export const InsurancePlan: React.FC<{ plan: IInsurancePlan }> = ({ plan }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { _id, planName, coverAmount, premium, logo, additionalPlans } = plan;
  const formData = state?.formData || {};

  const handleViewPlanDetails = () => {
    navigate(`/tenant/insurance-plans/${_id}`, {
      state: {
        plan,
        formData,
      },
    });
  };

  return (
    <Card className="mb-4 flex flex-col items-start justify-between p-4 md:flex-row">
      <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
        <div className="">
          <div className="flex gap-2">
            <div className="relative flex h-[40px] min-w-[80px] items-center justify-center rounded bg-gray-50">
              <img
                src={logo || homeInsuranceIcon}
                alt={`${planName} logo`}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = homeInsuranceIcon;
                }}
              />
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">{planName}</h3>
              <button className="flex items-center text-left text-sm text-blue-600">
                {t("viewMorePlans", { count: additionalPlans })}{" "}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">{t("coverLabel")}</p>
            <div className="flex items-center gap-1">
              <CurrencyIcon size="sm" />
              <span className="font-medium">
                {coverAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-end justify-between gap-2 md:mt-0">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleViewPlanDetails}
          >
            {t("viewFeatures")} <ChevronRight className="h-4 w-4" />
          </Button>

          <Button onClick={handleViewPlanDetails}>
            <CurrencyIcon className="text-white" size="sm" />
            <span className="font-medium">
              {premium.monthlyPremium}/{t("perMonth")}
            </span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default function InsurancePlans() {
  const { t } = useTranslation();

  const { state } = useLocation();
  const navigate = useNavigate();
  const { data: plans, isLoading } = useGetInsurancePlansQuery();

  if (!state?.formData) {
    navigate("/tenant/home-insurance");
  }

  return (
    <div className="">
      <BackButton />
      <div className="my-2 flex items-center gap-3">
        <IconRound size="sm" icon={homeInsuranceIcon} />
        <h2 className="text-2xl font-bold">{t("insurancePlansTitle")}</h2>
      </div>
      <p className="mb-6 text-gray-500">{t("insurancePlansDesc")}</p>

      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Card
              key={index}
              className="mb-4 flex flex-col items-start justify-between p-4 md:flex-row"
            >
              <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
                <div className="">
                  <div className="flex gap-2">
                    <Skeleton className="h-[40px] w-[80px] rounded" />
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <Skeleton className="mb-1 h-4 w-16" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="mt-4 flex flex-col items-end justify-between gap-2 md:mt-0">
                  <Skeleton className="h-9 w-32" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            </Card>
          ))
        ) : plans && plans.length > 0 ? (
          plans.map((plan) => <InsurancePlan key={plan._id} plan={plan} />)
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500">{t("noInsurancePlans")}</p>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-center">
        <Link to="/tenant" className="w-4/5 @lg:w-3/5">
          <Button className="w-full">{t("skip")}</Button>
        </Link>
      </div>
    </div>
  );
}
