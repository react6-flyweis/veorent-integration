import { PageTitle } from "@/components/PageTitle";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/ghost-tabs";
import { AccountForm } from "./components/AccountForm";
import { NotificationPreferences } from "./components/NotificationPreferences";

export default function Setting() {
  return (
    <div>
      <PageTitle title="Settings" />

      <Tabs defaultValue="account" className="mt-6">
        <TabsList className="mb-5 flex max-w-2xl px-0 @lg:gap-10">
          <TabsTrigger value="account">ACCOUNT</TabsTrigger>
          <TabsTrigger value="notifications">
            NOTIFICATION PREFERENCES
          </TabsTrigger>
          <TabsTrigger value="payment">PAYMENT</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <AccountForm />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationPreferences />
        </TabsContent>

        <TabsContent value="payment">
          <div>
            <h2 className="mb-4 text-xl font-bold">Payment Settings</h2>
            {/* Payment settings content */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
