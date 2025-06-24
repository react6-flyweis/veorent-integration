import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { SearchIcon } from "lucide-react";

import insuranceImgIcon from "@/assets/icons/home-insurance.png";
import truckImgIcon from "@/assets/icons/truck.png";
import { IconCard } from "@/components/IconCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { GreetUser } from "./components/GreetUser";
import { LandlordCard } from "./components/LandlordCard";
import { RentalApplicationCard } from "./components/RentalApplicationCard";
import { UserInfoCard } from "./components/UserInfoCard";

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-5">
      {/* Header and Search */}
      <header className="flex flex-col items-center justify-between @md:flex-row">
        <GreetUser />
        <Link to="/tenant/search">
          <div className="border-primary flex max-w-lg items-center border">
            <Input
              placeholder={t("searchRentals")}
              className="w-full border-0"
            />
            <Button size="icon" className="rounded-none border-0">
              <SearchIcon className="size-4" />
            </Button>
          </div>
        </Link>
      </header>

      {/* User Card + Rental Application */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        {/* User Info Card */}
        <UserInfoCard />

        {/* Rental Application Card */}
        <RentalApplicationCard className="md:col-span-2" />
      </div>

      {/* Landlord Card */}
      <LandlordCard />
      <div className="grid gap-5 @md:grid-cols-2">
        <IconCard
          title={t("readyToMove")}
          description={t("readyToMoveDescription")}
          icon={truckImgIcon}
          actionText={t("bookMyMove")}
          url="/tenant/book-move"
        />
        <IconCard
          title={t("knowYoureCovered")}
          description={t("knowYoureCoveredDescription")}
          icon={insuranceImgIcon}
          actionText={t("purchaseInsurance")}
          url="/tenant/home-insurance"
        />
      </div>
    </div>
  );
}
