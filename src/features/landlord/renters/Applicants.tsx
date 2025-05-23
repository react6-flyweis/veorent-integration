import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import verifiedIcon from "./assets/verified.png";
import { Link } from "react-router";

export default function Applicants() {
  return (
    <div className="space-y-4">
      {/* Applicant Card */}
      <Card className="py-4">
        <CardContent className="px-4">
          <div className="flex gap-5">
            {/* Avatar */}
            <Avatar className="h-12 w-12">
              <AvatarImage src="" alt="Kianna Dias" />
              <AvatarFallback>KD</AvatarFallback>
            </Avatar>
            <div className="">
              <div className="text-lg font-bold">Kianna Dias</div>
              <div className="text-muted-foreground mb-1 text-xs">
                Date Submitted: 08/19/2024 &nbsp; 07:40 AM
              </div>
              <div className="mb-2 text-sm font-semibold text-gray-700">
                123 Main St., Unit 1, Room A
              </div>
            </div>
          </div>

          <div className="flex items-end">
            <div className="flex flex-1 items-center gap-5">
              <p className="text-muted-foreground text-lg">Applied to</p>
              <div className="flex gap-3">
                {[
                  {
                    title: "Marvel Property",
                    address: "House, House no 3",
                    unit: "Number of Unit - 1",
                  },
                  {
                    title: "Marvel Property",
                    address: "House, House no 3",
                    unit: "Number of Unit - 1",
                  },
                ].map((property, index) => (
                  <div key={index} className="rounded border px-3 py-2 text-sm">
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
              <Link to="application/_id_/move-in">Move in Renter</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Applicants List */}
      <div className="flex flex-col gap-4">
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
                <div className="text-sm text-gray-700">{applicant.address}</div>
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
      </div>
    </div>
  );
}
