import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { PageTitle } from "@/components/PageTitle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// import verifiedIcon from "./assets/verified.png";

import { formatDate } from "@/utils/formatDate";
import { getFullName, getInitial } from "@/utils/name";

import { useGetApplicantsQuery } from "./api/queries";
import RentersTablist from "./components/RentersTablist";

export default function Applicants() {
  const { t } = useTranslation();

  const { data: applicants, isLoading } = useGetApplicantsQuery();
  return (
    <div className="">
      <div className="mb-5">
        <PageTitle title={t("renters")} className="mb-0" />
        <RentersTablist />
      </div>
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <span>{t("loading")}</span>
          </div>
        ) : applicants?.length ? (
          applicants.slice(0, 3).map((applicant) => (
            <Card className="py-4">
              {/* Applicant Card */}
              <CardContent className="px-4">
                <div className="flex gap-5">
                  {/* Avatar */}
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={applicant.userId?.dummyImage[0].img}
                      alt="Kianna Dias"
                    />
                    <AvatarFallback>
                      {getInitial(
                        `${applicant.userId?.firstname} ${
                          applicant.userId?.lastname
                        }`,
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="">
                    <div className="text-lg font-bold">
                      {getFullName(
                        applicant.userId?.firstname,
                        applicant.userId?.lastname,
                      )}
                    </div>
                    <div className="text-muted-foreground mb-1 text-xs">
                      {t("dateSubmitted")}{" "}
                      {formatDate(applicant.createdAt, true)}
                    </div>
                    <div className="mb-2 text-sm font-semibold text-gray-700">
                      {applicant.currentProperty.streetAddress},{" "}
                      {applicant.currentProperty.unitNumber}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col @md:flex-row @md:items-end">
                  <div className="flex flex-1 flex-col items-center gap-5 @md:flex-row">
                    <p className="text-muted-foreground text-lg">
                      {t("appliedTo")}
                    </p>
                    <div className="flex w-full flex-col gap-3 @lg:flex-row">
                      {[
                        {
                          title: applicant.destinationProperty.streetAddress,
                          address: applicant.destinationProperty.streetAddress,
                          unit: `Unit - ${applicant.allocateUnit || "N/A"}`,
                        },
                        // {
                        //   title: "Marvel Property",
                        //   address: "House, House no 3",
                        //   unit: "Number of Unit - 1",
                        // },
                      ].map((property, index) => (
                        <div
                          key={index}
                          className="rounded border px-3 py-2 text-sm"
                        >
                          <div className="text-primary text-base font-semibold">
                            {property.title}
                          </div>
                          <div>{property.address}</div>
                          <div>{property.unit}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="mt-2 h-10 px-6">
                    <Link
                      to={`/landlord/renters/application/${applicant._id}/move-in`}
                      state={{ applicant }}
                    >
                      {t("moveInRenter")}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex items-center justify-center py-4">
            <span>{t("noApplicantsFound")}</span>
          </div>
        )}

        {/* Applicants List */}
        {/* <div className="flex flex-col gap-4">
          {[
            {
              name: "Kianna Dias",
              address: "700 H St.",
              status: "Screening Report Available",
              time: "17 hours ago",
              verified: true,
            },
            {
              name: "William Thorne",
              address: "700 H St.",
              status: "Waiting on Screening Report",
              time: "17 hours ago",
              verified: false,
            },
          ].map((applicant, index) => (
            <Link
              to={`/landlord/renters/application-${applicant.verified ? "screened" : "unscreened"}/${index}`}
              key={index}
            >
              <Card key={index} className="relative overflow-hidden py-3">
                <CardContent className="relative flex flex-col gap-1 px-3">
                  <span className="text-primary text-base font-bold">
                    {applicant.name}
                  </span>
                  {applicant.verified && (
                    <Badge className="absolute -top-3 right-0 flex items-center gap-1 bg-green-200 text-black">
                      <img src={verifiedIcon} className="max-h-3" alt="" />
                      Verified
                    </Badge>
                  )}
                  <div className="text-sm text-gray-700">
                    {applicant.address}
                  </div>
                  <div className="text-muted-foreground mt-1 text-sm">
                    {applicant.time} |{" "}
                    <span className="text-primary cursor-pointer">
                      {applicant.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div> */}
      </div>
    </div>
  );
}
