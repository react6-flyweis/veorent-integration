import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { CreateButton } from "@/components/CreateButton";
import { PageTitle } from "@/components/PageTitle";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/ghost-tabs";

import { ChargesTabContent } from "./components/ChargesTabContent";
import { DepositsTabContent } from "./components/DepositsTabContent";
import { OverviewTabContent } from "./components/OverviewTabContent";

type TabValue = "overview" | "charges" | "deposits";

export default function Payments() {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<TabValue>("overview");

  return (
    <div className="">
      <div className="mb-5 flex items-center justify-between">
        <PageTitle title={t("payments")} className="mb-0" />
        <Link to="/landlord/payments/create-charge">
          <CreateButton label={t("createCharge")} />
        </Link>
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabValue)}
        className="w-full"
      >
        <TabsList className="px-0">
          <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
          <TabsTrigger value="charges">{t("charges")}</TabsTrigger>
          <TabsTrigger value="deposits">{t("deposits")}</TabsTrigger>
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
