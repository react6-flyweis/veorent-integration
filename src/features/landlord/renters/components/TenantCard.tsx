import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useMemo } from "react";
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

interface TenantCardProps {
  name: string;
  image?: string;
  inviteDate?: string;
  lastActive?: string;
  address: string;
  unit?: string;
  room?: string;
}

export function TenantCard({
  name,
  image,
  inviteDate,
  lastActive,
  address,
  unit,
  room,
}: TenantCardProps) {
  const formattedAddress = useMemo(() => {
    return [address, unit && `Unit ${unit}`, room && `Room ${room}`]
      .filter(Boolean)
      .join(", ");
  }, [address, unit, room]);

  const statusText = useMemo(() => {
    if (inviteDate) {
      return `Invited to portal ${inviteDate}`;
    }
    if (lastActive) {
      return `Last active ${lastActive}`;
    }
    return "";
  }, [inviteDate, lastActive]);

  return (
    <Card className="gap-0 p-0">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{statusText}</p>
            <p className="mt-0.5 text-sm text-gray-700">{formattedAddress}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-3 p-0">
        <Button variant="outline" size="sm">
          Email
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              Call
            </Button>
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
        <Button variant="outline" size="sm" asChild>
          <Link to="/landlord/messages">Message</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
