import { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/ghost-tabs";
import { CreateButton } from "@/components/CreateButton";
import { PageTitle } from "@/components/PageTitle";
import { OverviewTabContent } from "./components/OverviewTabContent";
import { ChargesTabContent } from "./components/ChargesTabContent";
import { DepositsTabContent } from "./components/DepositsTabContent";
import { Link } from "react-router";

type TabValue = "overview" | "charges" | "deposits";

export default function Payments() {
  const [activeTab, setActiveTab] = useState<TabValue>("overview");

  return (
    <div className="">
      <div className="mb-5 flex items-center justify-between">
        <PageTitle title="Payments" className="mb-0" />
        <Link to="/landlord/payments/create-charge">
          <CreateButton label="Create Charge" />
        </Link>
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabValue)}
        className="w-full"
      >
        <TabsList className="px-0">
          <TabsTrigger value="overview">OVERVIEW</TabsTrigger>
          <TabsTrigger value="charges">CHARGES</TabsTrigger>
          <TabsTrigger value="deposits">DEPOSITS</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <OverviewTabContent />
        </TabsContent>

        <TabsContent value="charges" className="mt-0">
          <ChargesTabContent />
        </TabsContent>

        <TabsContent value="deposits" className="mt-0">
          <DepositsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
