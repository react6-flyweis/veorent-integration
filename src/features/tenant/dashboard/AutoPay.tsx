import { useEffect } from "react";
import { useNavigate } from "react-router";
import { DownloadIcon, EuroIcon } from "lucide-react";

import rentIconImg from "@/assets/icons/rent.png";
import paymentMethodImg from "@/assets/images/payment-method.png";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useGoBack } from "@/hooks/useGoBack";

import { useGetCardsQuery } from "./api/queries";

export default function AutoPay() {
  const goBack = useGoBack();
  const navigate = useNavigate();
  const { data: cards, isLoading, error } = useGetCardsQuery();

  // Redirect to add card page if no cards exist
  useEffect(() => {
    if (!isLoading && cards && cards.length === 0) {
      navigate("/tenant/add-card");
    }
  }, [cards, isLoading, navigate]);

  // Get the default card or first card
  const defaultCard = cards?.find((card) => card.isDefault) || cards?.[0];

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

  if (error || !cards || cards.length === 0) {
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
        <Switch id="auto-pay" />
        <Label htmlFor="auto-pay">On</Label>
      </div>
      <Card className="gap-2 py-2">
        <CardHeader className="flex gap-2 px-2">
          <img className="size-8" src={rentIconImg} alt="" />
          <p className="text-primary text-2xl font-semibold">Rent</p>
        </CardHeader>
        <CardContent className="px-2">
          <div className="flex justify-between">
            <div className="">
              <div className="">
                <span>Date: </span>
                <span>August 1,2004</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Rent: </span>
                <EuroIcon className="size-3" />
                <span>2,000</span>
              </div>
            </div>
            <div className="">
              <div className="">
                <span>Status: </span>
                <span>paid</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Receipt: </span>
                <DownloadIcon className="size-4" />
              </div>
            </div>
          </div>
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
