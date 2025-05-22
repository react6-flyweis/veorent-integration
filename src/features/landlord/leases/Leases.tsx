import { CreateButton } from "@/components/CreateButton";
import { PageTitle } from "@/components/PageTitle";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router";
import { TabsContent } from "@/components/ui/ghost-tabs";
import { useState } from "react";

const upcomingLeases = [
  {
    id: "1",
    propertyName: "123 Main St.",
    address: "123 Main St.",
    rent: 1200,
    unpaidCharges: 100,
    term: {
      start: "08/19/2024",
      end: "08/19/2025",
    },
  },
  {
    id: "2",
    propertyName: "Ft. Collins Lease",
    address: "700 H St.",
    rent: 900,
    unpaidCharges: 600,
    term: {
      start: "08/19/2024",
      end: "08/19/2025",
    },
  },
];

export default function Leases() {
  const [activeTab, setActiveTab] = useState("active");
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
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
            Active
          </TabsTrigger>
          <TabsTrigger value="past" className="text-lg font-semibold">
            Past
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="space-y-4">
            {upcomingLeases.map((lease) => (
              <Card key={lease.id} className="gap-0 py-3">
                <CardHeader className="px-3">
                  <p className="text-sm text-gray-500 uppercase">
                    UPCOMING LEASE
                  </p>
                  <h2 className="text-lg font-bold">{lease.propertyName}</h2>
                  <p className="text-gray-600">{lease.address}</p>
                </CardHeader>
                <CardContent className="px-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500 uppercase">RENT</span>
                    <span className="font-semibold">
                      ${lease.rent.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500 uppercase">
                      UNPAID CHARGES
                    </span>
                    <span className="font-semibold">
                      ${lease.unpaidCharges.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500 uppercase">LEASE TERM</span>
                    <span className="font-semibold">
                      {lease.term.start} - {lease.term.end}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
