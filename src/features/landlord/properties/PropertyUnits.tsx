import { BackButton } from "@/components/BackButton";
import propertyEditIcon from "./assets/edit-property.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import keyIcon from "./assets/key.png";
import { useNavigate } from "react-router";
import { EditIcon } from "lucide-react";

export default function PropertyUnits() {
  const navigate = useNavigate();
  return (
    <div className="space-y-5">
      <div className="">
        <div className="bg-primary relative flex h-64 flex-col items-center justify-center gap-5">
          <div className="absolute top-0 left-0 flex w-full justify-between p-4">
            <BackButton />
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white"
              onClick={() => navigate(`/landlord/properties/4/edit`)}
            >
              <EditIcon className="size-5" />
            </Button>
          </div>
          <div className="rounded-full">
            <img src={propertyEditIcon} alt="Edit" className="h-32" />
          </div>
        </div>

        <div className="border border-t-0 p-3 shadow">
          <h3 className="text-2xl font-bold">Multi-family-home</h3>
          <p className="text-lg font-semibold">123 Main St.</p>
          <p className="text-lg font-semibold">Denver, Co 80023</p>
        </div>
      </div>

      <div className="grid @lg:grid-cols-2">
        <Card className="border shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Units & Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Unit item */}
              <div className="pl-2">
                <div className="flex items-center gap-2 font-medium">
                  <img src={keyIcon} alt="Key Icon" className="h-5 w-5" />
                  <span>Units 1</span>
                </div>

                <div className="relative ml-3 border-l-2 border-dashed">
                  {/* Room item */}
                  <div className="mt-2 ml-6 border">
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-2">
                        <img src={keyIcon} alt="Key Icon" className="h-5 w-5" />
                        <span>Room A</span>
                      </div>
                      <Badge className="bg-orange-500 text-black hover:bg-orange-600">
                        Incomplete
                      </Badge>
                    </div>

                    {/* Actions */}
                    <div className="mt-2 grid grid-cols-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-md"
                      >
                        Set Up Listing
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-md"
                      >
                        Screen Tenant
                      </Button>
                    </div>
                  </div>

                  {/* dot icon */}
                  <div className="absolute bottom-0 -left-2 flex size-4 items-center justify-center rounded-full bg-gray-500">
                    <div className="size-1.5 rounded-full bg-gray-700"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
