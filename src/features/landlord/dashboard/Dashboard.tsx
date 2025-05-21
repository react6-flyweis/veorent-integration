import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import houseIcon from "./assets/house.png";
import appIcon from "./assets/application.png";
import recruitIcon from "./assets/recruitment.png";
import { Link } from "react-router";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ScreenMethodDialog } from "./components/ScreenMethodDialog";

import screenIcon from "./assets/screen.png";
import applyIcon from "./assets/apply.png";
import agreementIcon from "./assets/agreement.png";
import addendumIcon from "./assets/addendum.png";
import formsIcon from "./assets/forms.png";
import expenseIcon from "./assets/expense.png";
import signIcon from "./assets/sign.png";
import { ActionButton } from "./components/ActionButton";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 gap-4 @lg:grid-cols-2 @xl:grid-cols-3">
      {/* Top Summary Cards */}
      <div className="@container flex flex-col gap-2 @xl:col-span-2">
        <div className="grid grid-cols-1 gap-2 @sm:grid-cols-2 @md:grid-cols-3">
          <Card className="bg-blue-100">
            <CardContent className="flex flex-col items-center justify-center">
              <img src={houseIcon} className="size-10" />
              <h3 className="text-lg font-medium @lg:text-xl">MARKETING</h3>
              <div className="text-lg font-bold">1</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-100">
            <CardContent className="flex flex-col items-center justify-center">
              <img src={recruitIcon} className="size-10" />
              <h3 className="text-lg font-medium @lg:text-xl">LEADS</h3>
              <div className="text-lg font-bold">3</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-100">
            <CardContent className="flex flex-col items-center justify-center">
              <img src={appIcon} className="size-10" />
              <h3 className="text-lg font-medium @lg:text-xl">APPLICANTS</h3>
              <div className="text-lg font-bold">2</div>
            </CardContent>
          </Card>
        </div>

        {/* Landlord Tools */}
        <div className="mt-4 grid grid-cols-1 gap-3">
          <Dialog>
            <DialogTrigger>
              <ActionButton icon={screenIcon} label="Screen a Tenant" />
            </DialogTrigger>
            <ScreenMethodDialog />
          </Dialog>

          {[
            {
              icon: applyIcon,
              label: "Invite to Apply",
              path: "/invite",
            },
            {
              icon: formsIcon,
              label: "Get a Lease Agreement",
              path: "/lease-agreement",
            },
            {
              icon: addendumIcon,
              label: "Build a Lease Addendum",
              path: "/lease-addendum",
            },
            {
              icon: signIcon,
              label: "E-Sign a Document",
              path: "#",
            },
            {
              icon: agreementIcon,
              label: "Get Landlord Forms",
              path: "#",
            },
            {
              icon: expenseIcon,
              label: "Record an Expense",
              path: "#",
            },
          ].map((tool, index) => (
            <Link
              to={"/landlord" + tool.path}
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
            <div className="mb-2 font-medium">Have a question?</div>
            <div className="text-muted-foreground mb-2 text-sm">
              We&apos;re here for you 7 days a week.
            </div>
            <Button
              variant="outlinePrimary"
              className="rounded-lg bg-transparent"
            >
              Get Help
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-blue-100 p-3">
          <CardContent className="p-3 text-center">
            <div className="mb-2 font-medium">Are you enjoying Voerent?</div>
            <div className="flex flex-col justify-center gap-2 @sm:flex-row">
              <Button
                variant="outlinePrimary"
                className="rounded-lg bg-transparent"
              >
                Needs Work
              </Button>
              <Button className="rounded-lg">It’s Great!</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-100 p-3">
          <CardContent className="p-3 text-center">
            <Badge className="mb-2 size-15 rounded-full bg-purple-600">
              STEADILY
            </Badge>
            <div className="mb-2 font-medium">
              Are you covered as a landlord?
            </div>
            <div className="text-muted-foreground mb-2 text-sm">
              Landlord insurance that is specifically designed for you.
            </div>
            <Button
              variant="outlinePrimary"
              className="rounded-lg bg-transparent"
            >
              Get a Quote
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
