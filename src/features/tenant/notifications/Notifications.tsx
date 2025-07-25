import { useTranslation } from "react-i18next";

import { PageTitle } from "@/components/PageTitle";

import { useGetNotificationsQuery } from "./api/queries";
import {
  NotificationCard,
  NotificationCardSkeleton,
} from "./components/NotificationCard";

export default function Notifications() {
  const { t } = useTranslation();
  const { data: notifications, isLoading } = useGetNotificationsQuery();

  return (
    <div className="space-y-5">
      <PageTitle title={t("notifications.title")} />
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col space-y-4">
            {[...Array(3)].map((_, index) => (
              <NotificationCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          notifications?.map((note) => (
            <NotificationCard key={note._id} {...note} />
          ))
        )}
      </div>
    </div>
  );
}
