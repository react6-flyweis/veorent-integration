import { useTranslation } from "react-i18next";

import { useAuthStore } from "@/store/useAuthStore";

export function GreetUser() {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);

  return (
    <h1 className="text-xl font-semibold">
      {t("hello")}, {user?.firstname}
    </h1>
  );
}
