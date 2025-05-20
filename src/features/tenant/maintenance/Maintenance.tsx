import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/ghost-tabs";
import { PlusIcon } from "lucide-react";
import RequestHistory from "./components/RequestHistory";
import { Link } from "react-router";

function Maintenance() {
  return (
    <div className="flex-1 flex flex-col gap-4">
      <PageTitle title="Maintenance" />
      <Tabs defaultValue="open" className="flex-1">
        <TabsList>
          <TabsTrigger value="open">Open Requests</TabsTrigger>
          <TabsTrigger value="all">All Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="open">
          <div className="relative h-full flex justify-center items-center">
            You don&apos;t have any open maintenance request at this time. Add
            one by clicking on the “+” button!
            <Button
              className="absolute bottom-1 right-1 size-11 rounded-full"
              asChild
            >
              <Link to="/create-maintenance-request">
                <PlusIcon className="size-6! stroke-3" />
              </Link>
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="all">
          <RequestHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Maintenance;
