import { Link } from "react-router";
import { EuroIcon, SearchIcon } from "lucide-react";

import applicationsIcon from "@/assets/icons/applications.png";
import insuranceImgIcon from "@/assets/icons/home-insurance.png";
import truckImgIcon from "@/assets/icons/truck.png";
import userImage from "@/assets/user.jpg";
import { IconCard } from "@/components/IconCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";
import { getInitial } from "@/utils/name";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="flex flex-col gap-5">
      {/* Header and Search */}
      <header className="flex flex-col items-center justify-between @md:flex-row">
        <h1 className="text-xl font-semibold">Hello, {user?.firstname}</h1>
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
        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center space-x-4">
            <Avatar className="size-16">
              <AvatarImage src={user?.image || ""} alt={user?.firstname} />
              <AvatarFallback>
                {getInitial((user?.firstname || "") + (user?.lastname || ""))}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-primary text-2xl">
                {user?.firstname} {user?.lastname}
              </CardTitle>
              <CardDescription className="text-lg">
                123 Main St. CA 70000
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col">
            <div className="flex justify-between">
              <h3 className="text-2xl font-bold">Account Balance</h3>
              <div className="text-primary text-2xl font-bold">
                <EuroIcon />
                <span>200.00</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 @md:flex-row">
            <Link to="/tenant/make-payment" className="w-full flex-1">
              <Button size="lg" className="w-full">
                Make Payment
              </Button>
            </Link>
            <Link to="/tenant/auto-pay" className="w-full flex-1">
              <Button variant="outline" size="lg" className="w-full">
                Auto Pay
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Rental Application Card */}
        <IconCard
          className="md:col-span-2"
          title="Rental Application"
          description="
            Lorem Ipsum is simply dummy text"
          icon={applicationsIcon}
          actionText="Finish My Application"
          url="/tenant/applying"
        />
      </div>

      {/* Landlord Card */}
      <Card className="gap-0 p-0">
        <CardContent className="flex items-center space-x-4 p-5">
          <img
            src={userImage}
            alt="Landlord"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="space-y-1">
            <CardDescription className="font-bold uppercase">
              Landlord
            </CardDescription>
            <CardTitle className="text-primary">Donna VanAntwerp</CardTitle>
            <CardDescription>123 Main St.</CardDescription>
          </div>
        </CardContent>
        <CardFooter className="px-0">
          <div className="grid w-full grid-cols-3">
            <Button variant="outline">Email</Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Call</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-center">
                    This feature is only accessible through our mobile app.
                    Please download the app by clicking this link.
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter className="w-full justify-center!">
                  <AlertDialogAction>Click here</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button variant="outline" asChild>
              <Link to="/tenant/messages">Message</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
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
