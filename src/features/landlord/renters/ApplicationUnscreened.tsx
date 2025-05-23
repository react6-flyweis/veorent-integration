import { PageTitle } from "@/components/PageTitle";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import coinBagIcon from "./assets/coin-bag.png";
import calendarIcon from "./assets/calendar.png";
import formIcon from "./assets/form.png";
import screeningIcon from "./assets/screening.png";

export default function ApplicationUnscreened() {
  return (
    <div className="">
      {/* Header */}
      <div className="mb-6 flex items-center">
        <PageTitle
          title="William Thorne"
          withBack
          className="mb-0 text-2xl md:text-3xl"
        />
        <Link
          to="#"
          className="text-primary ml-2 cursor-pointer text-base font-medium hover:underline"
        >
          (700 H St.)
        </Link>
      </div>

      <div className="mb-5 flex items-center gap-2">
        <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
          <img
            src={formIcon}
            alt="Rental Application"
            className="max-h-5 max-w-5"
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Rental Application
          </h2>
          <p className="text-muted-foreground text-xs">
            COMPLETED ON 08/19/2024
          </p>
        </div>
      </div>

      {/* Rental Application Card */}
      <Card className="mb-5 shadow-lg">
        <CardContent className="">
          <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row">
              {[
                {
                  label: "Desired Move-In",
                  value: "08/17/2024",
                  icon: calendarIcon,
                },
                {
                  label: "Monthly Income",
                  value: "3,000",
                  icon: coinBagIcon,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex h-32 w-44 flex-col items-center justify-center rounded bg-blue-100 p-4 text-gray-500 shadow"
                >
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="mb-2 max-h-12 max-w-12"
                  />
                  <p className="text-xs font-semibold uppercase">
                    {item.label}
                  </p>
                  <p className="text-base font-bold">{item.value}</p>
                </div>
              ))}
            </div>

            {/* View Full Application Button */}
            <div className="mt-4 flex-shrink-0">
              <Button className="w-full font-semibold md:w-auto" asChild>
                <Link to="/landlord/renters/application/_id_">
                  View Full Application
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Screening Report Card */}
      <Card className="gap-4 py-3 shadow-lg">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
            <img
              src={screeningIcon}
              alt="Screening Report"
              className="max-h-5 max-w-5"
            />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            Screening Report
          </h2>
        </CardHeader>
        <CardContent className="">
          <h3 className="mb-1 text-base font-semibold text-gray-900">
            Waiting on Applicant
          </h3>
          <p className="text-muted-foreground text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularized in the 1960s
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
