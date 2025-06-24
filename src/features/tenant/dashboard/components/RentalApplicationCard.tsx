import { useTranslation } from "react-i18next";

import applicationsIcon from "@/assets/icons/applications.png";
import { IconCard } from "@/components/IconCard";
import { useGetBookingsQuery } from "@/features/tenant/dashboard/api/queries";

interface RentalApplicationCardProps {
  className?: string;
}

export function RentalApplicationCard({
  className,
}: RentalApplicationCardProps) {
  const { t } = useTranslation();
  const { data: bookings } = useGetBookingsQuery();

  // Get the latest booking
  const latestBooking = bookings?.[0]; // Assuming the API returns bookings sorted by creation date desc

  // if (!isLoading && !latestBooking) {
  //   return <Navigate to="/tenant/search" replace />;
  // }

  // Determine title and action text based on payment status
  const isPaid = latestBooking?.paymentStatus === "Paid";
  const title = isPaid ? t("rentalBooked") : t("rentalApplication");
  const actionText = isPaid ? t("booked") : t("finishMyApplication");
  const actionUrl = latestBooking
    ? isPaid
      ? "#"
      : `/tenant/applying/${latestBooking?._id}`
    : "/tenant/search";

  return (
    <IconCard
      className={className}
      title={title}
      description={t("rentalApplicationDescription")}
      icon={applicationsIcon}
      actionText={actionText}
      url={actionUrl}
    />
  );
}
