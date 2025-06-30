import { useTranslation } from "react-i18next";

import { IconRound } from "@/components/IconRound";
import { PageTitle } from "@/components/PageTitle";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import lockIcon from "./assets/lock.png";
import { AgreementBuilder } from "./components/AgreementBuilder";

export default function CreateLeaseAgreement() {
  const { t } = useTranslation();
  return (
    <div className="flex h-full flex-col space-y-6">
      <PageTitle title={t("createLeaseAgreement.title")} withBack />

      <Tabs defaultValue="builder" className="h-full">
        <div className="flex flex-col @md:flex-row @md:items-center @md:gap-5">
          <h2 className="text-2xl">
            {t("createLeaseAgreement.completeEachSection")}
          </h2>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="builder">
              {t("createLeaseAgreement.tabBuilder")}
            </TabsTrigger>
            <TabsTrigger value="advanced">
              {t("createLeaseAgreement.tabAdvanced")}
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="builder">
          <AgreementBuilder />
        </TabsContent>
        <TabsContent className="h-full" value="advanced">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <Card className="w-full bg-blue-100 py-5 @lg:w-2/5">
              <CardContent className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
                  <IconRound className="bg-blue-50" icon={lockIcon} />
                </div>
                <CardTitle className="text-xl font-bold">
                  {t("createLeaseAgreement.advancedEditorLocked")}
                </CardTitle>
                <CardDescription>
                  {t("createLeaseAgreement.advancedEditorDescription")}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
