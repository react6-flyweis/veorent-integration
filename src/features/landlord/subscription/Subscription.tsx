import { PageTitle } from "@/components/PageTitle";
import { SubscriptionCard } from "./components/SubscriptionCard";
import { Link } from "react-router";
import { useGetSubscriptionPlansQuery } from "./api/queries";

// const subscriptionPlans = [
//   {
//     title: "Veorent Free",
//     price: "Free",
//     features: [
//       "Lorem ipsum",
//       "Lorem ipsum",
//       "Lorem ipsum",
//       "Lorem ipsum",
//       "Lorem ipsum",
//     ],
//     buttonText: "Start Your Trial",
//   },
//   {
//     title: "Veorent Standard",
//     price: "$15,000",
//     features: [
//       "Lorem ipsum",
//       "Lorem ipsum",
//       "Lorem ipsum",
//       "Lorem ipsum",
//       "Lorem ipsum",
//     ],
//     buttonText: "Buy Now",
//   },
//   {
//     title: "Veorent Premium",
//     price: "$30,000",
//     features: [
//       "Lorem ipsum",
//       "Lorem ipsum",
//       "Lorem ipsum",
//       "Lorem ipsum",
//       "Lorem ipsum",
//     ],
//     buttonText: "Buy Now",
//     isPremium: "true",
//   },
// ];
export default function Subscription() {
  const { data: subscriptionPlans = [], isLoading } =
    useGetSubscriptionPlansQuery();

  return (
    <div className="container">
      <PageTitle title="Subscription" />
      <div className="grid grid-cols-1 gap-10 @md:grid-cols-2 @xl:grid-cols-3 @2xl:gap-14 @3xl:gap-20">
        {isLoading ? (
          <div className="col-span-1 @md:col-span-2 @xl:col-span-3">
            <p className="text-muted-foreground text-center">
              Loading subscription plans...
            </p>
          </div>
        ) : subscriptionPlans?.length ? (
          subscriptionPlans.map((plan) => (
            <Link to={`/landlord/subscription/${plan._id}`} key={plan.name}>
              <SubscriptionCard plan={plan} />
            </Link>
          ))
        ) : (
          <div className="col-span-1 @md:col-span-2 @xl:col-span-3">
            <p className="text-muted-foreground text-center">
              No subscription plans available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
