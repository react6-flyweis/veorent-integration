import { Navigate } from "react-router";

import applicationsIcon from "@/assets/icons/applications.png";
import { IconCard } from "@/components/IconCard";
import { useGetBookingsQuery } from "@/features/tenant/dashboard/api/queries";

interface RentalApplicationCardProps {
  className?: string;
}

export function RentalApplicationCard({
  className,
}: RentalApplicationCardProps) {
  const { data: bookings, isLoading } = useGetBookingsQuery();

  // Get the latest booking
  const latestBooking = bookings?.[0]; // Assuming the API returns bookings sorted by creation date desc

  if (!isLoading && !latestBooking) {
    return <Navigate to="/tenant/search" replace />;
  }

  return (
    <IconCard
      className={className}
      title="Rental Application"
      description="Lorem Ipsum is simply dummy text"
      icon={applicationsIcon}
      actionText="Finish My Application"
      url={`/tenant/applying/${latestBooking?._id}`}
    />
  );
}
