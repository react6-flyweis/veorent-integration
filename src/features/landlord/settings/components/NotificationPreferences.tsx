import type { FC } from "react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationItem } from "./NotificationItem";
import { useGetNotificationPreferencesQuery } from "../api/queries";

const notificationData = [
  {
    type: "updates",
    key: "platformUpdates",
    title: "Platform Updates",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    type: "updates",
    key: "promotions",
    title: "Promotions",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    type: "updates",
    key: "weeklyNewsletter",
    title: "The Key Weekly Newsletter",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    type: "updates",
    key: "webinarsAndEvents",
    title: "Webinars & Networking Events",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  // {
  //   type: "updates",
  //   title: "Message for renters",
  //   description:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  // },

  {
    type: "account",
    key: "messagesFromRenters",
    title: "Messages from Renters",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    type: "account",
    key: "property",
    title: "Property",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    type: "account",
    key: "leads",
    title: "Leads",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    type: "account",
    key: "applicants",
    title: "Applicants",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    type: "account",
    key: "leases",
    title: "Leases",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    type: "account",
    key: "payments",
    title: "Payments",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    type: "account",
    key: "feedback",
    title: "Check-ins & Maintenance Feedback",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

export const NotificationPreferences: FC = () => {
  const [activeTab, setActiveTab] = useState("updates");
  const { data } = useGetNotificationPreferencesQuery();

  const currentNotifications = notificationData.filter(
    (item) => item.type === activeTab,
  );

  return (
    <div>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
        className="w-full"
      >
        <TabsList className="mb-6 h-14">
          <TabsTrigger value="updates">UPDATES & OFFERS</TabsTrigger>
          <TabsTrigger value="account">ACCOUNT</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {currentNotifications.map((item) => (
            <NotificationItem
              key={item.key}
              itemKey={item.key as keyof typeof data}
              title={item.title}
              description={item.description}
              channels={
                data?.[item.key as keyof typeof data] as
                  | INotificationChannel
                  | undefined
              }
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};
