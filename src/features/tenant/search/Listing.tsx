import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  BathIcon,
  BedDoubleIcon,
  HammerIcon,
  HomeIcon,
  MapIcon,
  DogIcon,
  PawPrintIcon,
  CigaretteIcon,
  DropletsIcon,
  ToiletIcon,
  WifiIcon,
  SofaIcon,
  WashingMachineIcon,
  TvIcon,
  ParkingCircleIcon,
  FenceIcon,
  FlameKindlingIcon,
  MicrowaveIcon,
  RefrigeratorIcon,
  Trash2Icon,
  GalleryHorizontalEndIcon,
} from "lucide-react";
import { ContactForm } from "./components/ContactForm";
import { BackButton } from "@/components/BackButton";
import { Logo } from "@/components/Logo";
import { Link, useParams } from "react-router";

export default function PropertyListingDetail() {
  const { id } = useParams();
  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <BackButton />
        <Logo />
      </div>
      <div className="mx-auto grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Left: Listing Info */}
        <div className="space-y-4 md:col-span-2">
          <div className="relative">
            <img
              src="/listing.jpg"
              alt="Brighton Lake"
              className="h-64 w-full rounded-xl object-cover"
            />
            <Button
              variant="ghost"
              className="absolute right-2 bottom-2 rounded-full bg-white"
            >
              <GalleryHorizontalEndIcon className="rotate-180" />
              <span className="font-semibold">29 photos</span>
            </Button>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Brighton Lake Front Fully Furnished 7 month lease
            </h2>
            <div className="flex gap-1">
              <a href="#" className="text-lg tracking-wide text-blue-600">
                3110 Causeway Dr, Brighton, MI 48114
              </a>
              <MapIcon className="text-blue-600" />
            </div>
            <div className="mt-2 flex w-full items-end justify-around text-gray-700">
              <div className="flex flex-col items-center gap-1">
                <BedDoubleIcon className="size-7" />
                <span> 3 Beds</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <BathIcon className="size-7" />
                <span> 2 Baths</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <HomeIcon className="size-7" />
                <span>Single Family</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <HammerIcon className="size-7" />
                <span>Built in 1950</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold">Description</h3>
            <p className="text-muted-foreground mt-2">
              Beautiful views from this recently remodeled home. Stainless steel
              appliances, new windows, hardwood/ceramic plank flooring. Renter
              must sign lease for no more than a 7 month period. No animals.
              Irreplaceable! Enjoy outside all year round. Includes grill and
              outdoor fire pit. Indoor wood burning fireplace.
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="mt-4 text-xl font-semibold">Features</h3>
            <div className="mt-2 flex flex-wrap gap-5">
              <span className="flex items-center gap-1">
                <DogIcon className="size-5" /> Small Dogs Allowed
              </span>
              <span className="flex items-center gap-1">
                <PawPrintIcon className="size-5" /> Cats Allowed
              </span>
              <span className="flex items-center gap-1">
                <CigaretteIcon className="size-5" /> Smoking Outside Only
              </span>
            </div>
          </div>

          {/* Utilities */}
          <div>
            <h3 className="mt-4 text-xl font-semibold">Utilities Included</h3>
            <div className="mt-2 flex flex-wrap gap-5">
              <span className="flex items-center gap-1">
                <DropletsIcon className="size-5" /> Water
              </span>
              <span className="flex items-center gap-1">
                <ToiletIcon className="size-5" /> Sewage
              </span>
              <span className="flex items-center gap-1">
                <WifiIcon className="size-5" /> Internet
              </span>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="mt-4 text-xl font-semibold">Amenities</h3>
            <div className="mt-2 flex flex-wrap gap-5">
              <span className="flex items-center gap-1">
                <SofaIcon className="size-5" /> Furnished
              </span>
              <span className="flex items-center gap-1">
                <WashingMachineIcon className="size-5" /> On Site Laundry
              </span>
              <span className="flex items-center gap-1">
                <TvIcon className="size-5" /> Cable Ready
              </span>
              <span className="flex items-center gap-1">
                <ParkingCircleIcon className="size-5" /> Off Street Parking
              </span>
              <span className="flex items-center gap-1">
                <WifiIcon className="size-5" /> High Speed Internet
              </span>
              <span className="flex items-center gap-1">
                <FenceIcon className="size-5" /> Fence Yard
              </span>
              <span className="flex items-center gap-1">
                <FlameKindlingIcon className="size-5" /> Fireplace
              </span>
            </div>
          </div>

          {/* Appliances */}
          <div>
            <h3 className="mt-4 text-xl font-semibold">Appliances</h3>
            <div className="mt-2 flex flex-wrap gap-5">
              <span className="flex items-center gap-1">
                <WashingMachineIcon className="size-5" /> Washer
              </span>
              <span className="flex items-center gap-1">
                <WashingMachineIcon className="size-5" /> Dryer
              </span>
              <span className="flex items-center gap-1">
                <MicrowaveIcon className="size-5" /> Microwave
              </span>
              <span className="flex items-center gap-1">
                <RefrigeratorIcon className="size-5" /> Refrigerator
              </span>
              <span className="flex items-center gap-1">
                <Trash2Icon className="size-5" /> Garbage Disposal
              </span>
            </div>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-4">
          <Card className="gap-2 rounded bg-gray-50 p-3 shadow-none">
            <CardHeader className="px-1">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xl">Rent</span>
                <div className="">
                  <span className="text-2xl font-bold">€ 2400</span>
                  <span className="">/MO</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-1">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Deposit</span>
                  <span className="">€2400</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Available</span>
                  <span className="">10/01/2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Lease Terms</span>
                  <span className="">Six Months</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button size="sm" className="rounded-full">
                <Link to={`/tenant/listing/${id}/apply`}>Apply Now</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Contact Form */}
          <Card className="gap-2 rounded bg-gray-50 p-3 shadow-none">
            <CardContent className="space-y-3 px-3">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">Contact the Landlord</h3>
                <p>
                  Send a message to the landlord if you are interested in or
                  have any questions about this property.
                </p>
              </div>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
