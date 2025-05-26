import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { useGoBack } from "@/hooks/useGoBack";

import monthlyChargeIcon from "./assets/monthly-charge.png";
import paydayIcon from "./assets/payday.png";
import { Link } from "react-router";

type ChargeType = "monthly" | "one-time";

const CreateCharge: React.FC = () => {
  const goBack = useGoBack();
  const [selectedChargeType, setSelectedChargeType] =
    useState<ChargeType | null>(null);

  return (
    <div className="">
      <div className="mb-6 flex items-center gap-3 border-b-2 pb-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={goBack}
        >
          <X className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Create Charge</h1>
      </div>

      <div className="space-y-6">
        <div>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Lease to Charge" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="lease1">Lease 1</SelectItem>
                <SelectItem value="lease2">Lease 2</SelectItem>
                {/* Additional leases would be populated dynamically */}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="mt-2 underline">Haven't created the lease yet?</p>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-medium">What type of Charge?</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                type: "monthly" as ChargeType,
                title: "Monthly Charge",
                description:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
                icon: monthlyChargeIcon,
                path: "/landlord/payments/monthly-charge",
              },
              {
                type: "one-time" as ChargeType,
                title: "One-Time Charge",
                description:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
                icon: paydayIcon,
                path: "/landlord/payments/one-time-charge",
              },
            ].map((charge) => (
              <Link key={charge.type} to={charge.path}>
                <Card
                  className={`cursor-pointer border-2 py-2 ${
                    selectedChargeType === charge.type ? "border-blue-500" : ""
                  }`}
                  onClick={() => setSelectedChargeType(charge.type)}
                >
                  <CardContent className="flex items-center gap-3 p-4">
                    <img
                      src={charge.icon}
                      alt={`${charge.type} icon`}
                      className="max-h-12 max-w-12"
                    />
                    <div>
                      <h3 className="font-medium">{charge.title}</h3>
                      <CardDescription>{charge.description}</CardDescription>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCharge;
