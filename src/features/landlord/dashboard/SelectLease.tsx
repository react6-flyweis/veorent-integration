import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";

import { PropertiesSelector } from "./components/PropertiesSelector";

export default function SelectLease() {
  const { t } = useTranslation();

  const [selectedAddress, setSelectedAddress] = useState<string>("");

  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedAddress) {
      navigate("/landlord/lease-agreement/create", {
        state: { property: selectedAddress },
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mb-6 flex items-center gap-5">
        <BackButton />
        <h2 className="text-2xl font-semibold">
          {t("leases.selectLeaseAgreementTitle")}
        </h2>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">
          {t("leases.leaseLabel")}
        </label>
        <PropertiesSelector
          value={selectedAddress}
          onChange={setSelectedAddress}
          placeholder={t("leases.chooseAddressPlaceholder")}
        />
      </div>
      <div className="flex justify-center">
        <Button
          className="@lg:3/5 w-4/5"
          size="lg"
          disabled={!selectedAddress}
          onClick={handleContinue}
        >
          {t("continue")}
        </Button>
      </div>
    </div>
  );
}
