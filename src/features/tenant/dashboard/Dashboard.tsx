import { Link } from "react-router";
import { SearchIcon } from "lucide-react";

import insuranceImgIcon from "@/assets/icons/home-insurance.png";
import truckImgIcon from "@/assets/icons/truck.png";
import { IconCard } from "@/components/IconCard";
import { Input } from "@/components/ui/input";

import { GreetUser } from "./components/GreetUser";
import { LandlordCard } from "./components/LandlordCard";
import { RentalApplicationCard } from "./components/RentalApplicationCard";
import { UserInfoCard } from "./components/UserInfoCard";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5">
      {/* Header and Search */}
      <header className="flex flex-col items-center justify-between @md:flex-row">
        <GreetUser />
        <Link to="/tenant/search">
          <div className="relative w-full max-w-sm">
            <Input placeholder="Search property" className="pr-10" />
            <SearchIcon className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
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
          title="Ready to move? We got you covered."
          description="
            Lorem Ipsum is simply dummy text"
          icon={truckImgIcon}
          actionText="Book My Move"
          url="/tenant/book-move"
        />
        <IconCard
          title="Know You’re Covered!"
          description="
            Lorem Ipsum is simply dummy text"
          icon={insuranceImgIcon}
          actionText="Purchase Insurance"
          url="/tenant/home-insurance"
        />
      </div>
    </div>
  );
}
