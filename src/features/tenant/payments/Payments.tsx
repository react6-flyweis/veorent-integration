import { useTranslation } from "react-i18next";
import { InfoIcon } from "lucide-react";

import balanceImg from "@/assets/images/balance.png";
import { IconRound } from "@/components/IconRound";
import { PageTitle } from "@/components/PageTitle";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/ghost-tabs";

import { BalanceDisplay } from "./components/BalanceDisplay";
import { RecentActivity } from "./components/RecentActivity";
import { Transactions } from "./components/Transactions";

// Extracted components for DRY principle
interface SectionHeaderProps {
  title: string;
}

function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <IconRound icon={balanceImg} size="xs" />
      <p className="text-primary text-2xl">{title}</p>
    </div>
  );
}

export default function Payments() {
  const { t } = useTranslation();

  return (
    <div className="flex h-full flex-col">
      <PageTitle title={t("payments")} />
      <Tabs className="flex-1" defaultValue="balance">
        <TabsList>
          <TabsTrigger value="balance">{t("balanceDetails")}</TabsTrigger>
          <TabsTrigger value="activity">{t("recentActivity")}</TabsTrigger>
          <TabsTrigger value="account">{t("paymentAccount")}</TabsTrigger>
        </TabsList>

        <TabsContent value="balance" className="flex flex-col gap-3">
          <SectionHeader title={t("accountBalance")} />
          <BalanceDisplay />
          <Transactions />
        </TabsContent>

        <TabsContent value="activity" className="flex flex-col gap-3">
          <SectionHeader title={t("accountActivity")} />
          <BalanceDisplay />
          <RecentActivity />
        </TabsContent>

        <TabsContent
          value="account"
          className="flex flex-1 flex-col items-center justify-center gap-3 text-center"
        >
          <InfoIcon className="size-28 stroke-1" />
          <h3 className="text-3xl">{t("importantInformation")}</h3>
          <p>{t("paymentAccountDescription")}</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
