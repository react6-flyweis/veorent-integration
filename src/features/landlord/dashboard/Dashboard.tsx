import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { useGetDashboardCounts } from "./api/queries";
import addendumIcon from "./assets/addendum.png";
import agreementIcon from "./assets/agreement.png";
import appIcon from "./assets/application.png";
import applyIcon from "./assets/apply.png";
import expenseIcon from "./assets/expense.png";
import formsIcon from "./assets/forms.png";
import houseIcon from "./assets/house.png";
import recruitIcon from "./assets/recruitment.png";
import screenIcon from "./assets/screen.png";
import signIcon from "./assets/sign.png";
import { ActionButton } from "./components/ActionButton";
import { Greeting } from "./components/Greeting";
import { ScreenMethodDialog } from "./components/ScreenMethodDialog";

export default function Dashboard() {
  const { data } = useGetDashboardCounts();
  const { t } = useTranslation();

  return (
    <div className="">
      <Greeting />
      <div className="grid grid-cols-1 gap-4 @xl:grid-cols-3">
        {/* Top Summary Cards */}
        <div className="flex flex-col gap-2 @xl:col-span-2">
          <div className="grid grid-cols-1 gap-2 @md:grid-cols-2 @xl:grid-cols-3">
            <Card className="bg-blue-100">
              <CardContent className="flex flex-col items-center justify-center">
                <img src={houseIcon} className="size-10" />
                <h3 className="text-lg font-medium @lg:text-xl">
                  {t("marketing")}
                </h3>
                <div className="text-lg font-bold">{data?.marketing}</div>
              </CardContent>
            </Card>
            <Link to="/landlord/renters">
              <Card className="bg-blue-100">
                <CardContent className="flex flex-col items-center justify-center">
                  <img src={recruitIcon} className="size-10" />
                  <h3 className="text-lg font-medium @lg:text-xl">
                    {t("leads")}
                  </h3>
                  <div className="text-lg font-bold">{data?.leads}</div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/landlord/renters/applicants">
              <Card className="bg-blue-100">
                <CardContent className="flex flex-col items-center justify-center">
                  <img src={appIcon} className="size-10" />
                  <h3 className="text-lg font-medium @lg:text-xl">
                    {t("applicants")}
                  </h3>
                  <div className="text-lg font-bold">{data?.applicants}</div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Landlord Tools */}
          <div className="mt-4 grid grid-cols-1 gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <ActionButton icon={screenIcon} label={t("screenTenant")} />
              </DialogTrigger>
              <ScreenMethodDialog />
            </Dialog>

            {[
              {
                icon: applyIcon,
                label: t("inviteToApply"),
                path: "/invite",
              },
              {
                icon: formsIcon,
                label: t("getLeaseAgreement"),
                path: "/lease-agreement",
              },
              {
                icon: addendumIcon,
                label: t("buildLeaseAddendum"),
                path: "/lease-addendum",
              },
              {
                icon: signIcon,
                label: t("eSignDocument"),
                path: "/e-sign",
              },
              {
                icon: agreementIcon,
                label: t("getLandlordForms"),
                path: "/forms",
              },
              {
                icon: expenseIcon,
                label: t("recordExpense"),
                path: "/expenses",
              },
            ].map((tool, index) => (
              <Link
                to={`/landlord${tool.path}`}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <ActionButton icon={tool.icon} label={tool.label} />
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side Panel */}
        <div className="@container flex flex-col gap-4">
          <Card className="bg-blue-100 p-3">
            <CardContent className="p-3 text-center">
              <div className="mb-2 font-medium">{t("haveQuestion")}</div>
              <div className="text-muted-foreground mb-2 text-sm">
                {t("hereForYou")}
              </div>
              <Link to="/landlord/help">
                <Button
                  variant="outlinePrimary"
                  className="rounded-lg bg-transparent"
                >
                  {t("getHelp")}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-blue-100 p-3">
            <CardContent className="p-3 text-center">
              <div className="mb-2 font-medium">{t("enjoyingVeorent")}</div>
              <div className="flex flex-col justify-center gap-2 @sm:flex-row">
                <Link
                  to="/landlord/needs-work"
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="outlinePrimary"
                    className="w-full rounded-lg bg-transparent"
                  >
                    {t("needsWork.title")}
                  </Button>
                </Link>
                <Button className="rounded-lg">{t("itsGreat")}</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-100 p-3">
            <CardContent className="p-3 text-center">
              <Badge className="mb-2 size-15 rounded-full bg-purple-600">
                {t("steadily")}
              </Badge>
              <div className="mb-2 font-medium">{t("coveredAsLandlord")}</div>
              <div className="text-muted-foreground mb-2 text-sm">
                {t("landlordInsurance")}
              </div>
              <Button
                variant="outlinePrimary"
                className="rounded-lg bg-transparent"
              >
                {t("getQuote")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
