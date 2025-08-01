import { useGetActiveSubscriptionQuery } from "./api/queries";
import { ActiveSubscriptionCard } from "./components/ActiveSubscriptionCard";
import { AllSubscriptions } from "./components/AllSubscriptions";

export default function Subscription() {
  const { data: activeSubscription, isLoading } =
    useGetActiveSubscriptionQuery();

  console.log("Active Subscription Data:", activeSubscription);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  if (activeSubscription) {
    return (
      <div className="container mx-auto mt-8 max-w-xl">
        <ActiveSubscriptionCard active={activeSubscription} />
      </div>
    );
  }

  return <AllSubscriptions />;
}
