import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { PageTitle } from "@/components/PageTitle";

import { SubscriptionCard } from "./SubscriptionCard";
import { useGetSubscriptionPlansQuery } from "../api/queries";

export function AllSubscriptions() {
  const { t } = useTranslation();

  const { data: subscriptionPlans = [], isLoading } =
    useGetSubscriptionPlansQuery();

  return (
    <div className="container">
      <PageTitle title={t("sidebar.subscription")} />
      <div className="grid grid-cols-1 gap-10 @md:grid-cols-2 @xl:grid-cols-3 @2xl:gap-14 @3xl:gap-20">
        {isLoading ? (
          <div className="col-span-1 @md:col-span-2 @xl:col-span-3">
            <p className="text-muted-foreground text-center">
              {t("subscription.loading")}
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
              {t("subscription.noPlans")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
