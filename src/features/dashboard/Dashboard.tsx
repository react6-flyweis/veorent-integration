import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { EuroIcon, SearchIcon } from "lucide-react";
import userImage from "@/assets/user.jpg";
import applicationsIcon from "@/assets/icons/applications.png";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router";
import { IconCard } from "@/components/IconCard";
import truckImgIcon from "@/assets/icons/truck.png";
import insuranceImgIcon from "@/assets/icons/home-insurance.png";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5">
      {/* Header and Search */}
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Hello, Kaiya</h1>
        <div className="relative w-full max-w-sm">
          <Input placeholder="Search property" className="pr-10" />
          <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>
      </header>

      {/* User Card + Rental Application */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* User Info Card */}
        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center space-x-4">
            <img
              src={userImage}
              alt="Kaiya"
              className="size-16 rounded-full object-cover"
            />
            <div>
              <CardTitle className="text-2xl text-primary">
                Kaiya Lipshutz
              </CardTitle>
              <CardDescription className="text-lg">
                123 Main St. CA 70000
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col">
            <div className="flex justify-between">
              <h3 className="text-2xl font-bold">Account Balance</h3>
              <div className="text-2xl font-bold text-primary">
                <EuroIcon />
                <span>200.00</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="gap-1">
            <Button size="lg" className="flex-1">
              Make Payment
            </Button>
            <Button variant="outline" size="lg" className="flex-1">
              Autopay
            </Button>
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
        />
      </div>

      {/* Landlord Card */}
      <Card className="p-0 gap-0">
        <CardContent className="flex items-center space-x-4 p-5">
          <img
            src={userImage}
            alt="Landlord"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="space-y-1">
            <CardDescription className="uppercase font-bold">
              Landlord
            </CardDescription>
            <CardTitle className="text-primary">Donna VanAntwerp</CardTitle>
            <CardDescription>123 Main St.</CardDescription>
          </div>
        </CardContent>
        <CardFooter className="px-0">
          <div className="grid grid-cols-3 w-full">
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
                <AlertDialogFooter className="justify-center! w-full">
                  <AlertDialogAction>Click here</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button variant="outline" asChild>
              <Link to="/messages">Message</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
      <div className="grid grid-cols-2 gap-5">
        <IconCard
          title="Ready to move? We got you covered."
          description="
            Lorem Ipsum is simply dummy text"
          icon={truckImgIcon}
          actionText="Book My Move"
          url="/book-move"
        />
        <IconCard
          title="Know You’re Covered!"
          description="
            Lorem Ipsum is simply dummy text"
          icon={insuranceImgIcon}
          actionText="Purchase Insurance"
          url="/home-insurance"
        />
      </div>
    </div>
  );
}
