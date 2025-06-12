import { Link } from "react-router";

import { Loader } from "@/components/Loader";
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
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { getInitial } from "@/utils/name";

import { useGetLandlordsForUserQuery } from "../../api/queries";

interface LandlordCardProps {
  className?: string;
}

export function LandlordCard({ className }: LandlordCardProps) {
  const { data: landlords, isLoading, error } = useGetLandlordsForUserQuery();

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center p-8">
          <Loader />
        </CardContent>
      </Card>
    );
  }

  if (error || !landlords || landlords.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <div className="space-y-2">
            <CardTitle className="text-muted-foreground">
              No Landlord Found
            </CardTitle>
            <CardDescription>
              You don't have any landlords assigned to your account yet.
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    );
  }

  // For now, show the first landlord. In the future, this could be enhanced
  // to show multiple landlords or allow selection
  const landlord = landlords[0];

  return (
    <Card className={`gap-0 p-0 ${className}`}>
      <CardContent className="flex items-center space-x-4 p-5">
        <Avatar className="h-12 w-12">
          <AvatarImage src={landlord.image || ""} alt={landlord.firstname} />
          <AvatarFallback>
            {getInitial((landlord.firstname || "") + (landlord.lastname || ""))}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <CardDescription className="font-bold uppercase">
            Landlord
          </CardDescription>
          <CardTitle className="text-primary">
            {landlord.firstname} {landlord.lastname}
          </CardTitle>
          <CardDescription>{landlord.email}</CardDescription>
        </div>
      </CardContent>
      <CardFooter className="px-0">
        <div className="grid w-full grid-cols-3">
          <Button variant="outline" asChild>
            <Link to={`mailto:${landlord.email}`}>Email</Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Call</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-center">
                  This feature is only accessible through our mobile app. Please
                  download the app by clicking this link.
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
  );
}
