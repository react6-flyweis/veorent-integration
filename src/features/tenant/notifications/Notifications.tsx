import { PageTitle } from "@/components/PageTitle";
import { NotificationCard } from "./components/NotificationCard";

const notifications = [
  {
    id: 1,
    title: "New Maintenance Request",
    time: "8:53 PM",
    message:
      "Your request for plumbing repair has been received. A technician will reach out shortly to confirm the appointment.",
    icon: "Wrench",
  },
  {
    id: 2,
    title: "Lease Expiration Reminder",
    time: "4:20 PM",
    message:
      "Your lease is set to expire on June 30, 2025. Please renew or contact the leasing office for details.",
    icon: "CalendarClock",
  },
  {
    id: 3,
    title: "Package Delivered",
    time: "1:05 PM",
    message:
      "A package has been delivered to the mail room for Unit 203. Please pick it up during office hours.",
    icon: "PackageCheck",
  },
];

export default function Notifications() {
  return (
    <div className="space-y-5">
      <PageTitle title="Notifications" />
      <div className="space-y-4">
        {notifications.map((note) => (
          <NotificationCard key={note.id} {...note} />
        ))}
      </div>
    </div>
  );
}
