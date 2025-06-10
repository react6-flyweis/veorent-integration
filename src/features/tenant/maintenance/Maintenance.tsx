import { useMemo, useState } from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/ghost-tabs";

import { useGetMaintenanceRequests } from "./api/queries";

export default function Maintenance() {
  const { data } = useGetMaintenanceRequests();
  const [activeTab, setActiveTab] = useState("open");

  const filteredAndGroupedData = useMemo(() => {
    if (!data) return [];

    const filteredRequests = data.filter((req) =>
      activeTab === "open"
        ? req.status !== "Completed"
        : req.status === "Completed",
    );

    const groupedByDate = filteredRequests.reduce(
      (acc, req) => {
        const date = new Date(req.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });

        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(req);
        return acc;
      },
      {} as Record<string, IMaintenanceRequest[]>,
    );

    return Object.entries(groupedByDate)
      .map(
        ([date, requests]) =>
          [
            date,
            requests.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            ),
          ] as [string, IMaintenanceRequest[]],
      )
      .sort(([dateA], [dateB]) => {
        const parseDate = (dateStr: string) =>
          new Date(dateStr.split(" ").reverse().join(" "));
        return parseDate(dateB).getTime() - parseDate(dateA).getTime();
      });
  }, [activeTab, data]);

  return (
    <div className="flex flex-1 flex-col">
      <PageTitle title="Maintenance" />
      <Tabs defaultValue="open" className="flex-1" onValueChange={setActiveTab}>
        <TabsList className="px-0">
          <TabsTrigger className="pl-0" value="open">
            Open Requests
          </TabsTrigger>
          <TabsTrigger value="all">All Requests</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="">
          {filteredAndGroupedData.length > 0 ? (
            <div className="space-y-6">
              {filteredAndGroupedData.map(([date, requests]) => (
                <div key={date}>
                  <div className="bg-accent text-primary px-4 py-2 text-lg font-semibold">
                    {date}
                  </div>
                  {requests.map((req) => (
                    <Card key={req._id} className="mt-1 border py-0">
                      <CardContent className="flex items-center justify-between p-3!">
                        <div>
                          <p className="text-lg font-bold text-[#001D6E]">
                            REQUEST #{req._id}
                          </p>
                          <p className="text-muted-foreground">
                            {req.issueTitle} - {req.category}
                          </p>
                        </div>
                        <p className="text-muted-foreground">{req.status}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="relative flex h-full items-center justify-center">
              You don&apos;t have any{" "}
              {activeTab === "open"
                ? `open maintenance request at this time. Add one by clicking on the "+"
              button!`
                : "completed maintenance requests at this time."}
            </div>
          )}
          {activeTab === "open" && (
            <Button
              className="fixed right-5 bottom-5 size-11 rounded-full"
              asChild
            >
              <Link to="/tenant/create-maintenance-request">
                <PlusIcon className="size-6! stroke-3" />
              </Link>
            </Button>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
