import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import premiumImage from "../assets/premium.png";

interface SubscriptionPlan {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  isPremium?: string;
}

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
}

export function SubscriptionCard({ plan }: SubscriptionCardProps) {
  return (
    <Card className="relative flex h-full flex-col gap-2 py-3 shadow-xl">
      {plan.isPremium && (
        <img
          src={premiumImage}
          alt="Premium Plan"
          className="absolute top-0 right-2 max-h-12 max-w-12"
          title="Premium Plan"
        />
      )}
      <CardHeader>
        <h3 className="text-lg font-semibold">{plan.title}</h3>
        <div className="mt-2">
          <span className="text-3xl font-bold">{plan.price}</span>

          <span className="text-muted-foreground text-sm"> / Monthly</span>
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
          Learn More
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full rounded-full">{plan.buttonText}</Button>
      </CardFooter>
    </Card>
  );
}
