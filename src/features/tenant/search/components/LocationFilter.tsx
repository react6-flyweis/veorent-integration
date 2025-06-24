import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LocationFilterProps {
  city?: string;
  region?: string;
  country?: string;
  onLocationChange: (location: {
    city?: string;
    region?: string;
    country?: string;
  }) => void;
}

export const LocationFilter = ({
  city = "",
  region = "",
  country = "",
  onLocationChange,
}: LocationFilterProps) => {
  const { t } = useTranslation();

  const handleInputChange = (
    field: "city" | "region" | "country",
    value: string,
  ) => {
    onLocationChange({
      city: field === "city" ? value : city,
      region: field === "region" ? value : region,
      country: field === "country" ? value : country,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="city" className="text-sm font-medium">
          {t("city")}
        </Label>
        <Input
          id="city"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => handleInputChange("city", e.target.value)}
          className="h-10"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="region" className="text-sm font-medium">
          State/Region
        </Label>
        <Input
          id="region"
          placeholder="Enter state or region"
          value={region}
          onChange={(e) => handleInputChange("region", e.target.value)}
          className="h-10"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="country" className="text-sm font-medium">
          {t("country")}
        </Label>
        <Input
          id="country"
          placeholder="Enter country name"
          value={country}
          onChange={(e) => handleInputChange("country", e.target.value)}
          className="h-10"
        />
      </div>
    </div>
  );
};
