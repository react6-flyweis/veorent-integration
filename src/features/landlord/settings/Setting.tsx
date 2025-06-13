import { Navigate } from "react-router";

import { PageTitle } from "@/components/PageTitle";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/ghost-tabs";
import { useGetProfileQuery } from "@/features/core/auth/api/queries";

import { AccountForm } from "./components/AccountForm";
import { NotificationPreferences } from "./components/NotificationPreferences";

export default function Setting() {
  const { data, isLoading } = useGetProfileQuery();

  return (
    <div>
      <PageTitle title="Settings" />

      <Tabs defaultValue="account" className="mt-6">
        <TabsList className="mb-5 flex px-0 @lg:max-w-2xl @lg:gap-10">
          <TabsTrigger value="account">ACCOUNT</TabsTrigger>
          <TabsTrigger value="notifications">
            NOTIFICATION PREFERENCES
          </TabsTrigger>
          <TabsTrigger value="payment">PAYMENT</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          {isLoading ? (
            <div className="flex h-96 items-center justify-center">
              <p className="text-gray-500">Loading account information...</p>
            </div>
          ) : data ? (
            <AccountForm data={data as IUserFullDetails} />
          ) : (
            <div className="flex h-96 items-center justify-center">
              <p className="text-gray-500">Loading account information...</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationPreferences />
        </TabsContent>

        <TabsContent value="payment">
          <Navigate to="/landlord/payments" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
