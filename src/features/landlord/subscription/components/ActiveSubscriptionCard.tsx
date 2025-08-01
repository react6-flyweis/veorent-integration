import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LoadingButton } from "@/components/ui/loading-button";
import { formatDate } from "@/utils/formatDate";

import { useCancelSubscriptionMutation } from "../api/mutations";
import premiumImage from "../assets/premium.png";

export function ActiveSubscriptionCard({
  active,
}: {
  active: IActiveSubscription;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const cancelMutation = useCancelSubscriptionMutation();

  const handleCancel = async () => {
    await cancelMutation.mutateAsync(active.subscription._id);
    setOpen(false);
  };
  return (
    <Card className="border-primary relative flex h-full flex-col gap-2 border-2 py-3 shadow-xl">
      {/* Premium marker */}
      {active.subscription.name.toLowerCase().includes("premium") && (
        <img
          src={premiumImage}
          alt={t("subscription.premiumPlan")}
          className="absolute top-0 right-2 max-h-12 max-w-12"
          title={t("subscription.premiumPlan")}
        />
      )}
      <CardHeader>
        <h3 className="text-primary text-lg font-semibold">
          {t("subscription.activePlan")}
        </h3>
        <div className="mt-2">
          <span className="text-3xl font-bold">{active.subscription.name}</span>
          {active.subscription.billingCycle && (
            <span className="text-muted-foreground text-sm">
              {" "}
              / {active.subscription.billingCycle}
            </span>
          )}
        </div>
        <div className="mt-1 text-sm text-gray-500">
          {t("subscription.activeStart")}: {formatDate(active.startDate)}
        </div>
      </CardHeader>
      <CardContent>
        <ul>
          {active.subscription.features.map((feature, idx) => (
            <li key={idx} className="flex items-center">
              <span className="mr-2">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {t("subscription.activeUntil")} {formatDate(active.endDate)}
          </div>
          <Button
            variant="destructive"
            size="sm"
            className="rounded"
            onClick={() => setOpen(true)}
            disabled={cancelMutation.isPending}
          >
            {t("subscription.cancelSubscription")}
          </Button>
        </div>
      </CardContent>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("subscription.cancelTitle")}</DialogTitle>
            <DialogDescription>
              {t("subscription.cancelConfirm")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={cancelMutation.isPending}
            >
              {t("subscription.action.no")}
            </Button>
            <LoadingButton
              variant="destructive"
              onClick={handleCancel}
              isLoading={cancelMutation.isPending}
            >
              {t("subscription.action.yesCancel")}
            </LoadingButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
