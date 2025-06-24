import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { CreateButton } from "@/components/CreateButton";
import { CurrencyIcon } from "@/components/CurrencyIcon";
import { PageTitle } from "@/components/PageTitle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/ghost-tabs";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useGetLeases } from "../api/queries";

// const upcomingLeases = [
//   {
//     id: "1",
//     propertyName: "123 Main St.",
//     address: "123 Main St.",
//     rent: 1200,
//     unpaidCharges: 100,
//     term: {
//       start: "08/19/2024",
//       end: "08/19/2025",
//     },
//   },
//   {
//     id: "2",
//     propertyName: "Ft. Collins Lease",
//     address: "700 H St.",
//     rent: 900,
//     unpaidCharges: 600,
//     term: {
//       start: "08/19/2024",
//       end: "08/19/2025",
//     },
//   },
// ];

export default function Leases() {
  const { t } = useTranslation();

  const { data: leases, isLoading } = useGetLeases();
  const [activeTab, setActiveTab] = useState("active");
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const currentLeases = useMemo(() => {
    if (!leases) return [];

    const today = new Date();

    return leases.filter((lease) => {
      const startDate = new Date(lease.startDate);
      const endDate = new Date(lease.endDate);

      if (activeTab === "active") {
        return startDate <= today && endDate >= today;
      } else {
        return startDate > today;
      }
    });
  }, [leases, activeTab]);

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <PageTitle title="Leases" className="mb-0" />
        <Link to="create">
          <CreateButton label="Create Lease" />
        </Link>
      </div>

      <Tabs defaultValue="active" onValueChange={handleTabChange}>
        <TabsList className="grid h-14 w-48 grid-cols-2">
          <TabsTrigger value="active" className="text-lg font-semibold">
            {t("active")}
          </TabsTrigger>
          <TabsTrigger value="past" className="text-lg font-semibold">
            Past
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <p className="text-gray-500">{t("loading")}</p>
              </div>
            ) : currentLeases.length ? (
              currentLeases.map((lease) => (
                <Card key={lease._id} className="gap-0 py-3">
                  <CardHeader className="px-3">
                    <p className="text-sm text-gray-500">
                      <span>
                        {" "}
                        {new Date(lease.startDate) > new Date()
                          ? "Upcoming Lease"
                          : "Active Lease"}
                      </span>
                      {/* <span className="text-gray-400">
                        {" - since " +
                          new Date(lease.createdAt).toLocaleDateString()}
                      </span> */}
                    </p>
                    <h2 className="text-lg font-bold">{lease.leaseNickname}</h2>
                    {lease.rentalProperty && (
                      <p className="text-gray-600">
                        {lease.rentalProperty?.name},
                        {lease.rentalProperty?.addressDetails?.streetAddress}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="px-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500 uppercase">RENT</span>
                      <span className="flex items-center gap-1 font-semibold">
                        <CurrencyIcon size="sm" />
                        {lease.rentalProperty?.rentalDetails?.targetRent.toLocaleString()}
                      </span>
                    </div>
                    {/* 
                  <div className="flex justify-between">
                    <span className="text-gray-500 uppercase">
                      UNPAID CHARGES
                    </span>
                    <span className="font-semibold">
                      ${lease.unpaidCharges.toLocaleString()}
                    </span>
                  </div> */}

                    <div className="flex justify-between">
                      <span className="text-gray-500 uppercase">
                        LEASE TERM
                      </span>
                      <span className="font-semibold">
                        {new Date(lease.startDate).toLocaleDateString()} -{" "}
                        {new Date(lease.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center text-gray-500">No leases found.</div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
