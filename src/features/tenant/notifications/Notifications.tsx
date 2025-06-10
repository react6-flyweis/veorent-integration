import { PageTitle } from "@/components/PageTitle";

import { useGetNotificationsQuery } from "./api/queries";
import { NotificationCard } from "./components/NotificationCard";

export default function Notifications() {
  const { data: notifications, isLoading } = useGetNotificationsQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-5">
      <PageTitle title="Notifications" />
      <div className="space-y-4">
        {notifications?.map((note) => (
          <NotificationCard key={note._id} {...note} />
        ))}
      </div>
    </div>
  );
}
