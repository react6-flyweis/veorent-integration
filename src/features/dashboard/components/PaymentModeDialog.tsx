import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

import mtnImg from "@/assets/images/mtn.png";
import orangeMoneyImg from "@/assets/images/orange-money.png";
import cardImg from "@/assets/images/card.png";

const paymentOptions = [
  {
    id: "card",
    label: "Card",
    icon: cardImg,
  },
  {
    id: "mtn",
    label: "MTN money",
    icon: mtnImg,
  },
  {
    id: "orange",
    label: "Orange money",
    icon: orangeMoneyImg,
  },
];

export function PaymentModeDialog({ amount }: { amount: string }) {
  const [selected, setSelected] = useState("orange");

  return (
    <div className="">
      <div className="text-left text-xl font-bold">Payment Mode</div>

      <div className="space-y-4">
        {paymentOptions.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between rounded-md"
          >
            <div className="flex items-center gap-3">
              <img
                src={method.icon}
                alt={method.label}
                className="rounded-full size-9"
              />
              <span className="font-medium">{method.label}</span>
            </div>
            <Button
              size="sm"
              variant={selected === method.id ? "default" : "outline"}
              className={cn(
                "rounded-full text-xs",
                selected === method.id && "bg-green-500"
              )}
              onClick={() => setSelected(method.id)}
            >
              {selected === method.id ? "Selected" : "Select"}
            </Button>
          </div>
        ))}
      </div>

      <div className="pt-6">
        <Button className="w-full bg-[#001F4D] text-white text-base font-bold py-6">
          CONFIRM &rsaquo;
          <span className="block text-sm font-normal text-white ml-2">
            Pay ${amount} using{" "}
            {paymentOptions.find((p) => p.id === selected)?.label}
          </span>
        </Button>
      </div>
    </div>
  );
}
