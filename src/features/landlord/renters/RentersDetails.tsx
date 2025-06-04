import OccupantsIcon from "./assets/occupants.png";
import IncomeIcon from "./assets/coin-bag.png";
import CalendarIcon from "./assets/calendar.png";
import CreditScoreIcon from "./assets/credit-score.png";
import PetsIcon from "./assets/paw.png";
import SmokingIcon from "./assets/smoking.png";
import VideoIcon from "./assets/show.png";
import doubleCheckIcon from "./assets/double-tick.png";
import { ExternalLink, UserIcon } from "lucide-react";

import { PageTitle } from "@/components/PageTitle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link, useParams, Navigate } from "react-router";
import { useGetLeadDetailsQuery } from "./api/queries";
import { formatDate } from "@/utils/formatDate";
import { Skeleton } from "@/components/ui/skeleton";

interface InfoCardProps {
  icon: string;
  title: string;
  value: string;
  alt: string;
}

const InfoCard = ({ icon, title, value, alt }: InfoCardProps) => (
  <div className="rounded-md bg-blue-50 p-4">
    <div className="mb-2 flex justify-center">
      <img src={icon} alt={alt} className="h-10 w-10" />
    </div>
    <p className="text-center text-xs text-gray-500 uppercase">{title}</p>
    <p className="text-center font-medium">{value}</p>
  </div>
);

const infoCards: InfoCardProps[] = [
  {
    icon: OccupantsIcon,
    title: "Occupants",
    value: "1 People",
    alt: "Occupants",
  },
  {
    icon: IncomeIcon,
    title: "Monthly Income",
    value: "$5,000",
    alt: "Monthly Income",
  },
  {
    icon: CalendarIcon,
    title: "Desired Move-in",
    value: "08/17/2024",
    alt: "Move-in Date",
  },
  {
    icon: CreditScoreIcon,
    title: "Credit Score",
    value: "725 - 850",
    alt: "Credit Score",
  },
  {
    icon: PetsIcon,
    title: "Pets",
    value: "Yes",
    alt: "Pets",
  },
  {
    icon: SmokingIcon,
    title: "Smoking",
    value: "No",
    alt: "Smoking",
  },
  {
    icon: VideoIcon,
    title: "Virtual Showing",
    value: "Requested",
    alt: "Virtual Showing",
  },
];

const LoadingState = () => (
  <div className="container py-6">
    <div className="mb-6 flex items-center gap-2">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="ml-2 h-4 w-64" />
    </div>

    <div className="mb-6">
      <div className="mb-1 flex items-center">
        <Skeleton className="mr-4 h-10 w-10 rounded-full" />
        <div>
          <Skeleton className="mb-1 h-5 w-24" />
          <Skeleton className="mb-1 h-4 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className="rounded-md bg-blue-50 p-4">
          <div className="mb-2 flex justify-center">
            <Skeleton className="h-10 w-10 rounded" />
          </div>
          <Skeleton className="mx-auto mb-1 h-3 w-16" />
          <Skeleton className="mx-auto h-4 w-20" />
        </div>
      ))}
    </div>

    <div className="my-4 space-y-4">
      <div>
        <Skeleton className="mb-1 h-6 w-48" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div>
        <Skeleton className="mb-1 h-6 w-48" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>

    <Card className="p-3">
      <CardHeader className="gap-0 px-4">
        <div className="flex items-center gap-2">
          <Skeleton className="size-11 rounded-full" />
          <Skeleton className="h-6 w-24" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <Skeleton className="mb-1 h-5 w-48" />
            <Skeleton className="mb-1 h-4 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default function RentersDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetLeadDetailsQuery(id || "");
  console.log(data);

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError || !data) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="container py-6">
      <div className="mb-6 flex items-center gap-2">
        <PageTitle
          title={data?.fullName || "Lead Detail"}
          withBack
          className="mb-0"
        />

        <span className="text-muted-foreground ml-2">
          ({data?.propertyInterested?.addressDetails?.streetAddress})
        </span>
      </div>

      {data?.status === "selected" && (
        <div className="mb-1 flex items-center">
          <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <img
              src={doubleCheckIcon}
              alt="Profile"
              className="max-h-8 max-w-8"
            />
          </div>
          <div>
            <h2 className="font-semibold">Pre-Screener</h2>
            <p className="text-muted-foreground text-sm">COMPLETED ON</p>
            <p className="text-muted-foreground text-sm">06/17/2024</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {infoCards.map((card, index) => (
          <InfoCard
            key={index}
            icon={card.icon}
            title={card.title}
            value={card.value}
            alt={card.alt}
          />
        ))}
      </div>
      <div className="my-4 space-y-4">
        <div className="">
          <h2 className="mb-1 text-lg font-semibold">Describe Them self as</h2>
          <p className="text-muted-foreground text-sm">Full time</p>
        </div>
        <div className="">
          <h2 className="mb-1 text-lg font-semibold">Details on Their Pets</h2>
          <p className="text-muted-foreground text-sm">Dog</p>
        </div>
      </div>
      <Card className="p-3">
        <CardHeader className="gap-0 px-4">
          <div className="flex items-center gap-2">
            <div className="flex size-11 items-center justify-center rounded-full bg-gray-100">
              <UserIcon className="size-7" />
            </div>
            <h2 className="text-lg font-semibold">Lead Info</h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="font-medium">
                Became a lead on {formatDate(data?.createdAt || "")}
              </p>
              <div className="text-muted-foreground flex items-center text-sm">
                <Link to="tel:3032921374" className="flex items-center">
                  {data?.phoneNumber || "No Phone Provided"}
                  <ExternalLink size={12} className="ml-1" />
                </Link>
              </div>
              <div className="text-muted-foreground flex items-center text-sm">
                <Link
                  to={"mailto:" + data?.renterEmail}
                  className="flex items-center"
                >
                  {data?.renterEmail || "No Email Provided"}
                  <ExternalLink size={12} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
