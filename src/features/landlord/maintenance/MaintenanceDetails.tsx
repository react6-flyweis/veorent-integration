import { PageTitle } from "@/components/PageTitle";
import { Card } from "@/components/ui/card";

import brokenPlateImage from "./assets/broken-plate.png";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
interface MaintenanceDetail {
  id: string;
  requestedOn: string;
  preferredTime: string;
  category: string;
  description: string;
  images: string[];
}

export function MaintenanceDetails() {
  const maintenanceDetail: MaintenanceDetail = {
    id: "1",
    requestedOn: "Aug 23, 2024 | 03:40 pm",
    preferredTime: "Anytime",
    category: "Appliances",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    images: [brokenPlateImage],
  };

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
        <PageTitle title="Details" />
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-1">
            <div>
              <span className="text-primary text-lg font-bold">
                Requested On:
              </span>
              <span className="ml-1">{maintenanceDetail.requestedOn}</span>
            </div>

            <div>
              <span className="text-primary text-lg font-bold">
                Preferred Time to Enter:
              </span>
              <span className="ml-1">{maintenanceDetail.preferredTime}</span>
            </div>

            <div>
              <span className="text-primary text-lg font-bold">Category:</span>
              <span className="ml-1">{maintenanceDetail.category}</span>
            </div>

            <div>
              <span className="text-primary text-lg font-bold">
                Description:
              </span>
              <p className="mt-1 text-gray-700">
                {maintenanceDetail.description}
              </p>
            </div>
          </div>

          {maintenanceDetail.images.length > 0 && (
            <div className="mt-4">
              {maintenanceDetail.images.map((image, index) => (
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
    </div>
  );
}

export default MaintenanceDetails;
