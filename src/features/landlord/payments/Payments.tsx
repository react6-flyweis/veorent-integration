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

type TabValue = "overview" | "charges" | "deposits";

export default function Payments() {
  const [activeTab, setActiveTab] = useState<TabValue>("overview");

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <PageTitle title="Payments" />
        <CreateButton label="Create Charges" />
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

        <TabsContent value="charges">
          <div className="p-4">
            <h2>Charges content will go here</h2>
            {/* Charges specific content */}
          </div>
        </TabsContent>

        <TabsContent value="deposits">
          <div className="p-4">
            <h2>Deposits content will go here</h2>
            {/* Deposits specific content */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
