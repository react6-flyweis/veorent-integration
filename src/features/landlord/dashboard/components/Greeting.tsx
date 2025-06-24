import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useGetProfileQuery } from "@/features/core/auth/api/queries";

interface GreetingProps {
  className?: string;
}

export function Greeting({ className }: GreetingProps) {
  const { data } = useGetProfileQuery();
  const { t } = useTranslation();

  const UserFirstName = useMemo(() => {
    if (data?.firstname) {
      return data.firstname;
    } else if (data?.fullName) {
      const firstName = data.fullName.split(" ")[0];
      return firstName || "data";
    } else if (data?.email) {
      const firstName = data.email.split("@")[0];
      return firstName.charAt(0).toUpperCase() + firstName.slice(1) || "data";
    }
    return "data";
  }, [data]);

  return (
    <h2 className={`mb-2 text-3xl font-semibold ${className || ""}`}>
      {t("hello")}, {UserFirstName}
    </h2>
  );
}
