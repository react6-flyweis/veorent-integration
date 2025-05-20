import { BackButton } from "@/components/BackButton";
import { IconRound } from "@/components/IconRound";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import lockIcon from "./assets/lock.png";

export default function CreateLeaseAgreement() {
  return (
    <div className="flex flex-col space-y-6 h-full">
      <div className="mb-6">
        <Link
          to="/landlord/lease-agreement"
          className="flex items-center gap-5"
        >
          <BackButton />
          <h2 className="text-2xl font-semibold">
            Create Your Colorado Lease Agreement
          </h2>
        </Link>
      </div>

      <Tabs defaultValue="builder" className="h-full">
        <div className="flex items-center gap-5">
          <h2 className="text-2xl">Complete Each Section</h2>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="builder">Builder</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Editor</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="builder">
          <div className="p-5">
            <p>Builder content will go here</p>
            {/* Add builder form components here */}
          </div>
        </TabsContent>
        <TabsContent className="h-full" value="advanced">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <Card className="w-1/2 @lg:w-2/5 py-5 bg-blue-100">
              <CardContent className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <IconRound className="bg-blue-50" icon={lockIcon} />
                </div>
                <CardTitle className="font-bold text-xl">
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
