import { CopyIcon } from "lucide-react";
import { PageTitle } from "@/components/PageTitle";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

import verifiedIcon from "./assets/verified.png";
import applicantIcon from "./assets/applicant.png";
import screeningIcon from "./assets/screening.png";
import formIcon from "./assets/form.png";
import { useState } from "react";

export default function ApplicationScreened() {
  const [isFetching] = useState(false);
  return (
    <div className="">
      {/* Header */}
      <div className="mb-4 flex items-center">
        <PageTitle title="Ella Anderson" withBack className="mb-0" />
        <span className="text-primary ml-2 cursor-pointer text-base font-medium underline">
          (700 H St.)
        </span>
      </div>

      {/* Screening Report Card */}
      <Card className="mb-4 gap-3">
        <CardHeader className="flex flex-row items-center gap-3 pb-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <img src={screeningIcon} alt="Form" className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-semibold">Screening Report</h2>
        </CardHeader>
        <CardContent>
          <div>
            {isFetching && (
              <p className="text-primary text-xl">
                Pulling the screening report ......
              </p>
            )}
            <p className="text-muted-foreground mt-2 text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries,
            </p>
          </div>
        </CardContent>
        {!isFetching && (
          <CardFooter className="flex flex-col">
            <Button className="w-52 font-semibold" asChild>
              <Link to="/landlord/renters/screening-report-soon">
                See the Report
              </Link>
            </Button>
            <div className="mt-2 flex items-center justify-center gap-1 text-sm font-medium text-green-600">
              <img
                src={verifiedIcon}
                alt="Verified"
                className="max-h-3 max-w-3"
              />
              TransUnion verified their identity
            </div>
          </CardFooter>
        )}
      </Card>

      {/* Applicant Info Card */}
      <Card className="mb-4 gap-3 py-4">
        <CardHeader className="flex flex-row items-center gap-3 pb-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <img src={applicantIcon} alt="Applicant" className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-semibold">Applicant Info</h2>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-base">
            <span>(303) 902 - 3574</span>
            <Link
              to="tel:3039023574"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              <CopyIcon className="ml-1 inline h-4 w-4" />
            </Link>
          </div>
          <div className="flex items-center gap-2 text-base">
            <span>sara.capre+19223321@veorent.com</span>
            <Link
              to="mailto:sara.capre+19223321@veorent.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              <CopyIcon className="ml-1 inline h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Rental Application Card */}
      <Card className="gap-3 py-4">
        <CardHeader className="flex flex-row items-center gap-3 pb-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <img src={formIcon} alt="Screening" className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-semibold">Rental Application</h2>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mt-2 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
