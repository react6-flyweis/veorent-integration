import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import landlordIcon from "@/assets/icons/landlord.png";
import tenantIcon from "@/assets/icons/tenant.png";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUserPreferenceStore } from "@/store/useUserPreferenceStore";

import {
  type LandlordFormData,
  LandlordPersonalizeForm,
} from "./components/LandlordPersonalizeForm";

export default function Personalize() {
  const { t } = useTranslation();

  const { setUserType } = useUserPreferenceStore();
  const [selectedType, setSelectedType] = useState<"tenant" | "landlord">(
    "tenant",
  );
  const [landlordData, setLandlordData] = useState<LandlordFormData>({
    goals: [],
    propertiesCount: 0,
    referralSource: "",
  });
  const navigate = useNavigate();

  const handleContinue = () => {
    setUserType(selectedType);
    navigate(`/signup`, {
      state: {
        userType: selectedType,
        landlordData: selectedType === "landlord" ? landlordData : undefined,
      },
    });
    // Redirect to the signup page with the selected user type
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value as "tenant" | "landlord");
  };

  const handleLandlordFormChange = (data: LandlordFormData) => {
    setLandlordData(data);
  };

  const handleTenantLogin = () => {
    setUserType("tenant");
    navigate(`/login`);
  };

  const handleLandlordLogin = () => {
    setUserType("landlord");
    navigate(`/login`);
  };

  return (
    <div className="h-full pt-10">
      <div className="mb-8 flex flex-col items-center justify-between gap-5 @lg:flex-row">
        <img src="/logo-dark.png" alt="Veorent Logo" className="h-6" />
        <div className="flex gap-5">
          <div
            onClick={handleTenantLogin}
            className="border-primary flex cursor-pointer items-center justify-center rounded border px-3 py-2"
          >
            <span className="text-xl font-semibold">Tenant Login</span>
          </div>
          <div
            onClick={handleLandlordLogin}
            className="border-primary flex cursor-pointer items-center justify-center rounded border px-3 py-2"
          >
            <span className="text-xl font-semibold">Landlord Login</span>
          </div>
        </div>
      </div>
      <h2 className="my-5 text-3xl font-semibold">
        Lets personalize your experience.
      </h2>

      <RadioGroup
        defaultValue="tenant"
        onValueChange={handleTypeChange}
        value={selectedType}
      >
        <div className="flex flex-col justify-between gap-5 px-5 @lg:flex-row">
          <label htmlFor="landlord" className="flex-1 cursor-pointer">
            <div
              className={`border-primary flex cursor-pointer flex-col items-center justify-center rounded-2xl border px-3 py-2 ${
                selectedType === "landlord" ? "bg-blue-50" : ""
              }`}
            >
              <div className="w-full">
                <RadioGroupItem value="landlord" id="landlord" />
              </div>
              <img className="size-11" src={landlordIcon} alt="" />
              <span className="text-2xl font-semibold">Landlord </span>
            </div>
          </label>
          <label htmlFor="tenant" className="flex-1 cursor-pointer">
            <div
              className={`border-primary flex cursor-pointer flex-col items-center justify-center rounded-2xl border px-3 py-2 ${
                selectedType === "tenant" ? "bg-blue-50" : ""
              }`}
            >
              <div className="w-full">
                <RadioGroupItem value="tenant" id="tenant" />
              </div>
              <img className="size-11" src={tenantIcon} alt="" />
              <span className="text-2xl font-semibold">Tenant </span>
            </div>
          </label>
        </div>
      </RadioGroup>

      {selectedType === "landlord" && (
        <div className="mt-8 px-5">
          <LandlordPersonalizeForm
            onSubmit={handleLandlordFormChange}
            defaultData={landlordData}
            submitButtonHidden={true}
          />
        </div>
      )}

      <div className="flex justify-center py-10">
        <Button className="w-4/5 @lg:w-3/5" size="lg" onClick={handleContinue}>
          {t("continue")}
        </Button>
      </div>
    </div>
  );
}
