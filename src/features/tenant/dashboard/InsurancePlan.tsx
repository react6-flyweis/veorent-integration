import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Info } from "lucide-react";
import { BackButton } from "@/components/BackButton";

import homeInsuranceIcon from "./assets/home-insurance.png";
import { IconRound } from "@/components/IconRound";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router";

interface InsurancePlanProps {
  logo: string;
  name: string;
  coverType: string;
  coverAmount: string;
  price: number;
  additionalPlans: number;
}

export const InsurancePlan: React.FC<InsurancePlanProps> = ({
  logo,
  name,
  coverType,
  coverAmount,
  price,
  additionalPlans,
}) => {
  const navigate = useNavigate();

  const handleViewPlanDetails = () => {
    navigate("/tenant/insurance-plans/_id", {
      state: {
        plan: { logo, name, coverType, coverAmount, price, additionalPlans },
      },
    });
  };

  return (
    <Card className="mb-4 flex flex-col items-start justify-between p-4 md:flex-row">
      <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
        <div className="">
          <div className="flex gap-2">
            <div className="relative h-[40px] min-w-[80px]">
              <img src={logo} alt={`${name} logo`} className="object-contain" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">{name}</h3>
              <button className="flex items-center text-left text-sm text-blue-600">
                View {additionalPlans} more plans{" "}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">Cover</p>
            <div className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              <span className="font-medium">{coverAmount}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-end justify-between gap-2 md:mt-0">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleViewPlanDetails}
          >
            View Features <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="bg-primary flex items-center gap-2 rounded-lg px-3 py-1 text-white">
            <span className="font-medium">${price}/month</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

const plans = [
  {
    logo: "/logos/home-insurance.png",
    name: "Core Plus",
    coverType: "Cover",
    coverAmount: "9L",
    price: 716,
    additionalPlans: 12,
  },
  {
    logo: "/logos/home-insurance-premium.png",
    name: "1Cr Super Saver",
    coverType: "Cover",
    coverAmount: "1Cr",
    price: 890,
    additionalPlans: 8,
  },
  {
    logo: "/logos/nationwide.png",
    name: "Super Care Option",
    coverType: "Cover",
    coverAmount: "5L",
    price: 371,
    additionalPlans: 4,
  },
  {
    logo: "/logos/american-family.png",
    name: "Young Star Gold",
    coverType: "Cover",
    coverAmount: "5L",
    price: 553,
    additionalPlans: 6,
  },
];

export default function InsurancePlans() {
  return (
    <div className="">
      <BackButton />
      <div className="my-2 flex items-center gap-3">
        <IconRound size="sm" icon={homeInsuranceIcon} />
        <h2 className="text-2xl font-bold">We have these plans for you</h2>
      </div>
      <p className="mb-6 text-gray-500">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s.
      </p>

      <div className="space-y-4">
        {plans.map((plan, index) => (
          <InsurancePlan key={index} {...plan} />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center">
        <Link to="/tenant" className="w-4/5 @lg:w-3/5">
          <Button className="w-full">Skip</Button>
        </Link>
      </div>
    </div>
  );
}
