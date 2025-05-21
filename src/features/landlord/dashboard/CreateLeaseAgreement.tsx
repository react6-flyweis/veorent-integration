import { IconRound } from "@/components/IconRound";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import lockIcon from "./assets/lock.png";
import { AgreementBuilder } from "./components/AgreementBuilder";
import { PageTitle } from "@/components/PageTitle";

export default function CreateLeaseAgreement() {
  return (
    <div className="flex h-full flex-col space-y-6">
      <PageTitle title=" Create Your Colorado Lease Agreement" withBack />

      <Tabs defaultValue="builder" className="h-full">
        <div className="flex items-center gap-5">
          <h2 className="text-2xl">Complete Each Section</h2>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="builder">Builder</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Editor</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="builder">
          <AgreementBuilder />
        </TabsContent>
        <TabsContent className="h-full" value="advanced">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <Card className="w-1/2 bg-blue-100 py-5 @lg:w-2/5">
              <CardContent className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
                  <IconRound className="bg-blue-50" icon={lockIcon} />
                </div>
                <CardTitle className="text-xl font-bold">
                  Advanced Editor Locked
                </CardTitle>
                <CardDescription>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
