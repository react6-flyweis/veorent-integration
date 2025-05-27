import { PageTitle } from "@/components/PageTitle";
import { SubscriptionCard } from "./components/SubscriptionCard";
import { Link } from "react-router";

export default function Subscription() {
  const subscriptionPlans = [
    {
      title: "Veorent Free",
      price: "Free",
      features: [
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
      ],
      buttonText: "Start Your Trial",
    },
    {
      title: "Veorent Standard",
      price: "$15,000",
      features: [
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
      ],
      buttonText: "Buy Now",
    },
    {
      title: "Veorent Premium",
      price: "$30,000",
      features: [
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
      ],
      buttonText: "Buy Now",
      isPremium: "true",
    },
  ];

  return (
    <div className="container">
      <PageTitle title="Subscription" />
      <div className="grid grid-cols-1 gap-10 @md:grid-cols-2 @xl:grid-cols-3 @2xl:gap-14 @3xl:gap-20">
        {subscriptionPlans.map((plan) => (
          <Link to="/landlord/subscription/details" key={plan.title}>
            <SubscriptionCard plan={plan} />
          </Link>
        ))}
      </div>
    </div>
  );
}
