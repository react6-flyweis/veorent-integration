import { useTranslation } from "react-i18next";
import { Link, Navigate, useParams } from "react-router";
import { ArrowLeftIcon } from "lucide-react";

import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// import brokenPlateImage from "./assets/broken-plate.png";

import { formatDate } from "@/utils/formatDate";

import { useGetMaintenanceRequest } from "./api/queries";
// interface MaintenanceDetail {
//   id: string;
//   requestedOn: string;
//   preferredTime: string;
//   category: string;
//   description: string;
//   images: string[];
// }

// const maintenanceDetail: MaintenanceDetail = {
//   id: "1",
//   requestedOn: "Aug 23, 2024 | 03:40 pm",
//   preferredTime: "Anytime",
//   category: "Appliances",
//   description:
//     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
//   images: [brokenPlateImage],
// };

export function MaintenanceDetails() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data: maintenanceDetail, isLoading } = useGetMaintenanceRequest(
    id || "",
  );

  if (!id) {
    return <Navigate to="/landlord/maintenance" replace />;
  }

  return (
    <div className="">
      <div className="flex gap-5">
        <Link to="/landlord/maintenance">
          <Button
            variant="outline"
            className="size-9 items-center justify-center rounded-full"
          >
            <ArrowLeftIcon className="text-primary size-5" />
          </Button>
        </Link>
        <PageTitle title={t("maintenance.detailsTitle")} />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500">{t("maintenance.loadingDetails")}</p>
        </div>
      ) : maintenanceDetail ? (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-1">
              <div>
                <span className="text-primary text-lg font-bold">
                  {t("maintenance.requestedOn")}
                </span>
                <span className="ml-1">
                  {formatDate(maintenanceDetail.createdAt, true)}
                </span>
              </div>

              <div>
                <span className="text-primary text-lg font-bold">
                  {t("maintenance.preferredTime")}
                </span>
                <span className="ml-1">{maintenanceDetail.timePeriod}</span>
              </div>

              <div>
                <span className="text-primary text-lg font-bold">
                  {t("maintenance.category")}
                </span>
                <span className="ml-1">{maintenanceDetail.category}</span>
              </div>

              <div>
                <span className="text-primary text-lg font-bold">
                  {t("maintenance.description")}
                </span>
                <p className="mt-1 text-gray-700">
                  {maintenanceDetail.issueDescription}
                </p>
              </div>
            </div>

            {maintenanceDetail.receipts.length > 0 && (
              <div className="mt-4">
                {maintenanceDetail.receipts.map((image, index) => (
                  <div key={index} className="mt-2">
                    <img
                      src={image}
                      alt={`Maintenance issue ${index + 1}`}
                      className="h-auto max-w-full rounded-md border border-gray-200"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      ) : (
        <div className="flex h-64 items-center justify-center">
          <p className="text-gray-500">{t("maintenance.noDetailsFound")}</p>
        </div>
      )}
    </div>
  );
}

export default MaintenanceDetails;
