import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import premiumImage from "../assets/premium.png";

export function SubscriptionCard({ plan }: { plan: ISubscription }) {
  const { t } = useTranslation();
  return (
    <Card className="relative flex h-full flex-col gap-2 py-3 shadow-xl">
      {plan.name.toLowerCase().includes("premium") && (
        <img
          src={premiumImage}
          alt={t("subscription.premiumPlan")}
          className="absolute top-0 right-2 max-h-12 max-w-12"
          title={t("subscription.premiumPlan")}
        />
      )}
      <CardHeader>
        <h3 className="text-lg font-semibold">{plan.name}</h3>
        <div className="mt-2">
          <span className="text-3xl font-bold">{plan.price}</span>

          {plan.billingCycle && (
            <span className="text-muted-foreground text-sm">
              {" "}
              / {plan.billingCycle}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="mr-2">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 cursor-pointer text-sm text-blue-500 hover:underline">
          {t("subscription.learnMore")}
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full rounded-full">
          {t("subscription.getNow")}
        </Button>
      </CardFooter>
    </Card>
  );
}
