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
  return (
    <div className="flex h-full flex-col">
      <PageTitle title="Payments" />
      <Tabs className="flex-1" defaultValue="balance">
        <TabsList>
          <TabsTrigger value="balance">Balance details</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="account">Payment Account</TabsTrigger>
        </TabsList>

        <TabsContent value="balance" className="flex flex-col gap-3">
          <SectionHeader title="Account balance" />
          <BalanceDisplay />
          <Transactions />
        </TabsContent>

        <TabsContent value="activity" className="flex flex-col gap-3">
          <SectionHeader title="Account Activity" />
          <BalanceDisplay />
          <RecentActivity />
        </TabsContent>

        <TabsContent
          value="account"
          className="flex flex-1 flex-col items-center justify-center gap-3 text-center"
        >
          <InfoIcon className="size-28 stroke-1" />
          <h3 className="text-3xl">Important Information</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
