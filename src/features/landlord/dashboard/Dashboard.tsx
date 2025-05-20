import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  UserPlus,
  FileText,
  PenTool,
  ClipboardSignature,
  FileInput,
  ReceiptText,
  ChevronLeftIcon,
} from "lucide-react";

import houseIcon from "./assets/house.png";
import appIcon from "./assets/application.png";
import recruitIcon from "./assets/recruitment.png";
import { Link } from "react-router";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Top Summary Cards */}
      <div className="flex flex-col gap-2 md:col-span-2">
        <div className="grid grid-cols-3 gap-2">
          <Card className="bg-blue-100">
            <CardContent className="flex flex-col justify-center items-center">
              <img src={houseIcon} className="size-10" />
              <h3 className="text-cl font-medium">MARKETING</h3>
              <div className="text-lg font-bold">1</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-100">
            <CardContent className="flex flex-col justify-center items-center">
              <img src={recruitIcon} className="size-10" />
              <h3 className="text-xl font-medium">LEADS</h3>
              <div className="text-lg font-bold">3</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-100">
            <CardContent className="flex flex-col justify-center items-center">
              <img src={appIcon} className="size-10" />
              <h3 className="text-xl font-medium">APPLICANTS</h3>
              <div className="text-lg font-bold">2</div>
            </CardContent>
          </Card>
        </div>

        {/* Landlord Tools */}
        <div className="grid grid-cols-1 gap-3 mt-4">
          {[
            {
              icon: <ClipboardSignature className="w-4 h-4 mr-2" />,
              label: "Screen a Tenant",
            },
            {
              icon: <UserPlus className="w-4 h-4 mr-2" />,
              label: "Invite to Apply",
              path: "/invite",
            },
            {
              icon: <FileText className="w-4 h-4 mr-2" />,
              label: "Get a Lease Agreement",
            },
            {
              icon: <PenTool className="w-4 h-4 mr-2" />,
              label: "Build a Lease Addendum",
            },
            {
              icon: <ClipboardSignature className="w-4 h-4 mr-2" />,
              label: "E-Sign a Document",
            },
            {
              icon: <FileInput className="w-4 h-4 mr-2" />,
              label: "Get Landlord Forms",
            },
            {
              icon: <ReceiptText className="w-4 h-4 mr-2" />,
              label: "Record an Expense",
            },
          ].map((tool, index) => {
            const button = (
              <Button
                key={index}
                className="rounded-lg justify-between bg-blue-100 text-foreground hover:text-accent py-3 w-full"
              >
                <div className="flex ">
                  {tool.icon}
                  {tool.label}
                </div>
                <ChevronLeftIcon className="rotate-180" />
              </Button>
            );
            return tool.path ? (
              <Link
                to={"/landlord" + tool.path}
                key={index}
                style={{ textDecoration: "none" }}
              >
                {button}
              </Link>
            ) : (
              button
            );
          })}
        </div>
      </div>

      {/* Right Side Panel */}
      <div className="flex flex-col gap-4">
        <Card className="bg-blue-100 p-3">
          <CardContent className="p-3 text-center">
            <div className="font-medium mb-2">Have a question?</div>
            <div className="text-sm text-muted-foreground mb-2">
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
            <div className="font-medium mb-2">Are you enjoying Voerent?</div>
            <div className="flex justify-center gap-2">
              <Button
                variant="outlinePrimary"
                className="rounded-lg bg-transparent"
              >
                Needs Work
              </Button>
              <Button className="rounded-lg ">It’s Great!</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-100 p-3">
          <CardContent className="p-3 text-center">
            <Badge className="mb-2 size-15 bg-purple-600 rounded-full">
              STEADILY
            </Badge>
            <div className="font-medium mb-2">
              Are you covered as a landlord?
            </div>
            <div className="text-sm text-muted-foreground mb-2">
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
