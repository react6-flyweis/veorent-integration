import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { XIcon } from "lucide-react";

import pullImg from "@/assets/images/pull.png";
import { IconRound } from "@/components/IconRound";
import { Button } from "@/components/ui/button";

import { LeasingRequestForm } from "./components/LeasingRequestForm";

export default function RequestLeasing() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="size-8 rounded-full" asChild>
          <Link to="/leases">
            <XIcon className="size-5!" />
          </Link>
        </Button>
        <h2 className="text-2xl">{t("leasingRequestTitle")}</h2>
      </div>
      <div className="my-4 flex items-center gap-2">
        <IconRound icon={pullImg} size="xs" />
        <h3 className="text-2xl font-bold">{t("newRequestTitle")}</h3>
      </div>
      <div>
        <p className="text-primary text-xl font-semibold">
          {t("leasingRequestDesc")}
        </p>
        <LeasingRequestForm />
      </div>
    </div>
  );
}
