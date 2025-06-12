import { Link } from "react-router";

import { CurrencyIcon } from "@/components/CurrencyIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetWalletQuery } from "@/features/tenant/payments/api/queries";
import { useAuthStore } from "@/store/useAuthStore";
import { getInitial } from "@/utils/name";

import { useGetBookingsQuery } from "../api/queries";

export function UserInfoCard() {
  const user = useAuthStore((state) => state.user);
  const { data: balance, isLoading: walletLoading } = useGetWalletQuery();
  const { data: bookings, isLoading: bookingsLoading } = useGetBookingsQuery();

  // Get the latest booking's property address
  const latestBooking = bookings?.[0];
  const propertyAddress = latestBooking?.currentAddress?.streetAddress
    ? `${latestBooking.currentAddress.streetAddress}, ${latestBooking.currentAddress.city} ${latestBooking.currentAddress.zipCode}`
    : ""; // Fallback address

  return (
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
            {bookingsLoading ? (
              <Skeleton className="h-6 w-48" />
            ) : (
              propertyAddress
            )}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex justify-between">
          <h3 className="text-2xl font-bold">Account Balance</h3>
          <div className="text-primary flex items-center gap-2 text-2xl font-bold">
            <CurrencyIcon />
            {walletLoading ? (
              <Skeleton className="ml-1 h-8 w-20" />
            ) : (
              <span>{(balance ?? 0).toFixed(2)}</span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 @xl:flex-row">
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
  );
}
