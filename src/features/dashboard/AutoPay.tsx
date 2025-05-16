import { PageTitle } from "@/components/PageTitle";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import paymentMethodImg from "@/assets/images/payment-method.png";
import rentIconImg from "@/assets/icons/rent.png";
import { DownloadIcon, EuroIcon } from "lucide-react";

export default function AutoPay() {
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
          <span className="text-primary">Kaiya Lipshutz</span>
        </p>
        <p className="space-x-1">
          <span>Card Number:</span>
          <span className="text-primary">1234 5678 9012 3456</span>
        </p>
      </div>
      <div className="flex gap-1">
        <Label htmlFor="auto-pay" className="checked:text-muted">
          Off
        </Label>
        <Switch id="auto-pay" />
        <Label htmlFor="auto-pay">On</Label>
      </div>
      <Card className="py-2">
        <CardHeader className="flex gap-2 px-2">
          <img className="size-8" src={rentIconImg} alt="" />
          <p className="font-semibold text-2xl text-primary">Rent</p>
        </CardHeader>
        <CardContent className="px-2">
          <div className="flex justify-between">
            <div className="">
              <div className="">
                <span>Date: </span>
                <span>August 1,2004</span>
              </div>
              <div className="flex gap-1 items-center">
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
      <div className="w-full flex justify-center">
        <Button size="lg" className="w-3/5">
          Back
        </Button>
      </div>
    </div>
  );
}
