import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import { BackButton } from "@/components/BackButton";
import { CurrencyIcon } from "@/components/CurrencyIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { PaymentModeDialog } from "@/features/shared/payments/components/PaymentModeDialog";

import {
  useBuyInsuranceMutation,
  useUpdateInsuranceMutation,
} from "./api/mutations";
import { useGetInsurancePlanQuery } from "./api/queries";
import homeInsuranceIcon from "./assets/home-insurance.png";

export default function PlanDetails() {
  const { t } = useTranslation();
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [purchaseId, setPurchaseId] = useState<string | null>(null);
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutateAsync } = useBuyInsuranceMutation();
  const { mutateAsync: updateInsurance } = useUpdateInsuranceMutation();

  // Try to get plan from state first, fallback to API call
  const planFromState = state?.plan;
  const {
    data: planFromApi,
    isLoading,
    error,
  } = useGetInsurancePlanQuery(id || "");

  const plan = (planFromState || planFromApi) as IInsurancePlan;

  const handleProceedToBuy = async () => {
    const dataToSubmit: IInsurancePurchase = {
      insurancePlanId: plan._id,
      firstName: state?.formData?.firstName || "",
      lastName: state?.formData?.lastName || "",
      email: state?.formData?.email || "",
      phone: state?.formData?.phone || "",
      propertyTypeId: state?.formData?.propertyType || "",
      propertyDetails: state?.formData?.propertyDetails,
      startDate: state.formData?.startDate || new Date().toISOString(),
      // endDate: state.formData?.endDate || new Date().toISOString(),
      premiumPaymentMode: "Annual",
      // totalPremiumPaid: plan.premium.monthlyPremium,
      policyNumber: `POL${Math.floor(Math.random() * 1000000)}`,
      status: "Active",
      paymentStatus: "Pending",
    };

    try {
      const response = await mutateAsync(dataToSubmit);
      const purchaseRecord = response.data.data as IInsurancePurchase & {
        _id: string;
      };
      setPurchaseId(purchaseRecord._id);
      setIsPaymentDialogOpen(true);
    } catch (error) {
      console.error("Failed to create insurance purchase:", error);
    }
  };
  const handlePaymentSuccess = async () => {
    if (purchaseId) {
      try {
        await updateInsurance({
          id: purchaseId,
          data: { paymentStatus: "Completed" },
        });
        // Redirect to payment successful page
        navigate("/tenant/payment/success", {
          state: {
            amount: plan.premium.annualPremium,
            redirectUrl: "/tenant/dashboard",
          },
        });
      } catch (error) {
        console.error("Failed to update payment status:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div>
        <BackButton />
        <Card className="my-6 flex-col justify-between pb-6 md:flex-row">
          <CardContent className="flex w-full justify-between">
            <div className="mb-4 flex items-center gap-4 md:mb-0">
              <Skeleton className="h-[50px] w-[100px] rounded" />
              <div>
                <Skeleton className="mb-2 h-6 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="flex flex-col items-end">
              <Skeleton className="mb-1 h-4 w-20" />
              <Skeleton className="mb-1 h-5 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </CardContent>
        </Card>
        <Skeleton className="mb-4 h-20 w-full" />
        <Card className="mb-4 py-3">
          <CardContent>
            <Skeleton className="h-6 w-40" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div>
        <BackButton />
        <div className="mt-8 text-center">
          <p className="text-red-500">{t("planInfoNotFound")}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BackButton />

      <Card className="my-6 flex-col justify-between pb-6 md:flex-row">
        <CardContent className="flex w-full justify-between">
          <div className="mb-4 flex items-center gap-4 md:mb-0">
            <div className="relative flex h-[50px] min-w-[100px] items-center justify-center rounded bg-gray-50">
              <img
                src={plan.logo || homeInsuranceIcon}
                alt={`${plan.planName} logo`}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = homeInsuranceIcon;
                }}
              />
            </div>

            <div>
              <h3 className="text-xl font-bold">{t("planDetailsTitle")}</h3>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm text-gray-500">{t("coverLabel")}</span>
                <CurrencyIcon size="sm" />
                <span className="text-lg font-medium">
                  {plan.coverAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex flex-col">
              <span className="text-sm">{plan.planName}</span>
              <div className="flex items-center gap-2">
                <CurrencyIcon size="sm" />
                <span className="font-medium">
                  ${plan.premium.monthlyPremium}/{t("perMonth")}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <CurrencyIcon size="xs" />
                <span className="text-sm">
                  {plan.premium.annualPremium} {t("paidAnnually")}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="mb-4">{plan.description || t("planDetailsDesc")}</p>

      <Card className="mb-4 py-3">
        <CardContent>
          <h4 className="text-lg font-semibold">{t("whatsCovered")}</h4>
        </CardContent>
      </Card>

      <Card className="mb-4 py-3">
        <CardContent>
          <ul className="list-disc pl-5">
            {plan.coverageDetails && plan.coverageDetails.length > 0
              ? plan.coverageDetails.map(
                  (
                    coverage: {
                      coverageType: string;
                      isCovered: boolean;
                      _id: string;
                    },
                    index: number,
                  ) =>
                    coverage.isCovered && (
                      <li key={coverage._id || index} className="mb-1">
                        {coverage.coverageType}
                      </li>
                    ),
                )
              : new Array(7).fill(t("dummyCoverage")).map((detail, index) => (
                  <li key={index} className="mb-1">
                    {detail}
                  </li>
                ))}
          </ul>
        </CardContent>
      </Card>

      <p className="mb-6 text-sm text-gray-500">{t("planDetailsFooter")}</p>

      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <PaymentModeDialog
            amount={plan.premium.annualPremium}
            onSuccess={handlePaymentSuccess}
          />
        </DialogContent>
      </Dialog>

      <div className="mt-6 flex items-center justify-center">
        <Button
          size="lg"
          className="w-4/5 @lg:w-3/5"
          onClick={handleProceedToBuy}
        >
          {t("proceedToBuy")}
        </Button>
      </div>
    </div>
  );
}
