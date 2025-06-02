import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PropertiesSelector } from "./components/PropertiesSelector";
import { useNavigate } from "react-router";

export default function SelectLease() {
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
          Select Which Lease Needs an Agreement
        </h2>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">Lease</label>
        <PropertiesSelector
          value={selectedAddress}
          onChange={setSelectedAddress}
          placeholder="Choose an address"
        />
      </div>
      <div className="flex justify-center">
        <Button
          className="@lg:3/5 w-4/5"
          size="lg"
          disabled={!selectedAddress}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
