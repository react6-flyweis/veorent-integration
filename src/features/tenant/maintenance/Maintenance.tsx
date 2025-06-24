import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
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
import { Skeleton } from "@/components/ui/skeleton";

import { useGetMaintenanceRequests } from "./api/queries";

export default function Maintenance() {
  const { t } = useTranslation();

  const { data, isLoading } = useGetMaintenanceRequests();
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
      <PageTitle title={t("maintenance")} />
      <Tabs defaultValue="open" className="flex-1" onValueChange={setActiveTab}>
        <TabsList className="px-0">
          <TabsTrigger className="pl-0" value="open">
            {t("openRequests")}
          </TabsTrigger>
          <TabsTrigger value="all">{t("allRequests")}</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="">
          {isLoading ? (
            <div className="space-y-6">
              {/* Date header skeleton */}
              <Skeleton className="h-12 w-full" />

              {/* Request cards skeleton */}
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="mt-1 border py-0">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-64" />
                      </div>
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredAndGroupedData.length > 0 ? (
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
                            {t("request")} #{req._id}
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
              {t("youDontHaveAny")}{" "}
              {activeTab === "open"
                ? t("noOpenMaintenanceRequests")
                : t("noCompletedMaintenanceRequests")}
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
