import type { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationItem } from "./NotificationItem";

export const NotificationPreferences: FC = () => {
  const notificationItems = [
    {
      title: "Platform Updates",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      title: "Platform",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      title: "The Key Weekly Newsletter",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      title: "Webinars & Networking Events",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ];

  return (
    <div>
      <Tabs defaultValue="updates" className="w-full">
        <TabsList className="mb-6 h-14">
          <TabsTrigger value="updates">UPDATES & OFFERS</TabsTrigger>
          <TabsTrigger value="account">ACCOUNT</TabsTrigger>
        </TabsList>

        <TabsContent value="updates">
          {notificationItems.map((item, index) => (
            <NotificationItem
              key={index}
              title={item.title}
              description={item.description}
            />
          ))}
        </TabsContent>

        <TabsContent value="account">
          <NotificationItem
            title="Messages from Renters"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          />
          <NotificationItem
            title="Property"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          />
          <NotificationItem
            title="Leads"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          />
          <NotificationItem
            title="Applicants"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          />
          <NotificationItem
            title="Leases"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          />
          <NotificationItem
            title="Payments"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          />
          <NotificationItem
            title="Check-ins & Maintenance Feedback"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
