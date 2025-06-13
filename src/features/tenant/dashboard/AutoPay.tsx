import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import rentIconImg from "@/assets/icons/rent.png";
import paymentMethodImg from "@/assets/images/payment-method.png";
import { CurrencyIcon } from "@/components/CurrencyIcon";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/useAlertToast";
import { useGoBack } from "@/hooks/useGoBack";

import { useUpdateCardAutoPayMutation } from "./api/mutations";
import { useGetCardsQuery, useGetPendingRentQuery } from "./api/queries";

export default function AutoPay() {
  const goBack = useGoBack();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    data: cards,
    isLoading: cardsLoading,
    error: cardsError,
  } = useGetCardsQuery();
  const { data: pendingRent, isLoading: rentLoading } =
    useGetPendingRentQuery();
  const { mutateAsync: updateAutoPayAsync, isPending: isUpdating } =
    useUpdateCardAutoPayMutation();

  const [localAutoPayState, setLocalAutoPayState] = useState<boolean>(false);

  // Redirect to add card page if no cards exist
  useEffect(() => {
    if (!cardsLoading && cards && cards.length === 0) {
      navigate("/tenant/add-card");
    }
  }, [cards, cardsLoading, navigate]);

  // Get the default card or first card
  const defaultCard = cards?.find((card) => card.isDefault) || cards?.[0];

  // Get the latest pending rent (sorted by due date, most recent first)
  const latestPendingRent = pendingRent?.sort(
    (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime(),
  )?.[0];

  const handleAutoPayToggle = async (
    enabled: boolean,
    isAutoUpdate = false,
  ) => {
    if (!defaultCard) return;

    // If trying to enable autopay but no pending rent, prevent it
    if (enabled && !latestPendingRent) {
      showToast("Cannot enable Auto Pay: No pending rent found", "error");
      return;
    }

    try {
      setLocalAutoPayState(enabled);
      await updateAutoPayAsync({
        cardId: defaultCard._id,
        autoPayEnabled: enabled,
      });

      if (!isAutoUpdate) {
        showToast(
          `Auto Pay ${enabled ? "enabled" : "disabled"} successfully`,
          "success",
        );
      }
    } catch {
      setLocalAutoPayState(!enabled); // Revert on error
      showToast("Failed to update Auto Pay setting", "error");
    }
  };

  const isLoading = cardsLoading || rentLoading;

  if (isLoading) {
    return (
      <div className="space-y-5">
        <PageTitle title="Rent Payment Method" withBack />
        <div className="flex items-center gap-3">
          <Skeleton className="size-6" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-32 w-full" />
        <div className="flex w-full justify-center">
          <Skeleton className="h-12 w-3/5" />
        </div>
      </div>
    );
  }

  if (cardsError || !cards || cards.length === 0) {
    return (
      <div className="space-y-5">
        <PageTitle title="Rent Payment Method" withBack />
        <div className="py-8 text-center">
          <p className="text-muted-foreground mb-4">
            No payment methods found. Please add a card to continue.
          </p>
          <Button onClick={() => navigate("/tenant/add-card")}>
            Add Card Details
          </Button>
        </div>
      </div>
    );
  }

  const maskedCardNumber = defaultCard?.cardNumber
    ? `**** **** **** ${defaultCard.cardNumber.slice(-4)}`
    : "****";

  return (
    <div className="space-y-5">
      <PageTitle title="Rent Payment Method" withBack />
      <div className="flex items-center gap-3">
        <img className="size-6" src={paymentMethodImg} alt="" />
        <h3 className="text-xl font-semibold">Auto Pay</h3>
      </div>
      <div className="">
        <p className="space-x-1">
          <span>Card Holder Name:</span>
          <span className="text-primary">
            {defaultCard?.cardHolderName || "N/A"}
          </span>
        </p>
        <p className="space-x-1">
          <span>Card Number:</span>
          <span className="text-primary">{maskedCardNumber}</span>
        </p>
      </div>
      <div className="flex gap-1">
        <Label htmlFor="auto-pay" className="checked:text-muted">
          Off
        </Label>
        <Switch
          id="auto-pay"
          checked={localAutoPayState}
          onCheckedChange={handleAutoPayToggle}
          disabled={isUpdating}
        />
        <Label htmlFor="auto-pay">On</Label>
      </div>

      {/* Status message */}
      {!latestPendingRent && (
        <div className="rounded-md border border-yellow-200 bg-yellow-50 p-3">
          <p className="text-sm text-yellow-800">
            No pending rent found. Auto Pay is automatically disabled.
          </p>
        </div>
      )}

      {/* {latestPendingRent && !localAutoPayState && (
        <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
          <p className="text-sm text-blue-800">
            You have pending rent. Enable Auto Pay for automatic payments.
          </p>
        </div>
      )} */}
      <Card className="gap-2 py-2">
        <CardHeader className="flex gap-2 px-2">
          <img className="size-8" src={rentIconImg} alt="" />
          <p className="text-primary text-2xl font-semibold">
            {latestPendingRent ? "Latest Pending Rent" : "No Pending Rent"}
          </p>
        </CardHeader>
        <CardContent className="px-2">
          {latestPendingRent ? (
            <div className="flex justify-between">
              <div className="">
                <div className="">
                  <span>Due Date: </span>
                  <span>
                    {new Date(latestPendingRent.dueDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Amount: </span>
                  <CurrencyIcon size="sm" />
                  <span>{latestPendingRent.amount.toLocaleString()}</span>
                </div>
              </div>
              <div className="">
                <div className="">
                  <span>Status: </span>
                  <span
                    className={`${
                      latestPendingRent.amountStatus === "Paid"
                        ? "text-green-600"
                        : latestPendingRent.amountStatus === "Overdue"
                          ? "text-red-600"
                          : "text-yellow-600"
                    }`}
                  >
                    {latestPendingRent.amountStatus}
                  </span>
                </div>
                {latestPendingRent.lateFee > 0 && (
                  <div className="flex items-center gap-1">
                    <span>Late Fee: </span>
                    <CurrencyIcon size="sm" />
                    <span>{latestPendingRent.lateFee.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="py-4 text-center">
              <p className="text-muted-foreground">
                You have no pending rent payments at this time.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="flex w-full justify-center">
        <Button onClick={goBack} size="lg" className="w-3/5">
          Back
        </Button>
      </div>
    </div>
  );
}
