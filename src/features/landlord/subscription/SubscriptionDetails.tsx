import { Button } from "@/components/ui/button";
import { CurrencyIcon } from "@/components/CurrencyIcon";

import subscriptionDetailsIcon from "./assets/subscription-details.png";
import { BackButton } from "@/components/BackButton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PaymentModeDialog } from "@/features/shared/payments/components/PaymentModeDialog";

export default function SubscriptionDetails() {
  // This would typically come from an API or store
  const subscriptionPlan = {
    title: "Veorent Standard",
    price: "15,000",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
    period: "Monthly",
    features: [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    ],
  };

  return (
    <div className="container max-w-4xl">
      <BackButton />

      <div className="mt-5 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <img
            src={subscriptionDetailsIcon}
            alt="Subscription Details"
            className="max-h-9 max-w-9"
          />
          <h1 className="text-2xl font-bold">{subscriptionPlan.title}</h1>
        </div>

        <p className="text-gray-600">{subscriptionPlan.description}</p>

        <div className="rounded-lg border p-2 shadow">
          <div className="flex items-baseline gap-1">
            <CurrencyIcon />
            <span className="text-3xl font-bold">{subscriptionPlan.price}</span>
            <span className="ml-2 text-xl text-gray-500">
              {subscriptionPlan.period}
            </span>
          </div>
        </div>

        <ul className="space-y-1 rounded-lg border p-3 shadow">
          {subscriptionPlan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-3/5" size="lg">
                Buy Subscription
              </Button>
            </DialogTrigger>
            <DialogContent>
              <PaymentModeDialog amount={subscriptionPlan.price} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
