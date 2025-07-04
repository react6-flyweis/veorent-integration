import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

interface PropertyType {
  id: string;
  label: string;
  icon: string;
}

interface PropertyTypeFilterProps {
  selectedPropertyTypes: string[];
  setSelectedPropertyTypes: (types: string[]) => void;
}

export const PropertyTypeFilter = ({
  selectedPropertyTypes,
  setSelectedPropertyTypes,
}: PropertyTypeFilterProps) => {
  const { t } = useTranslation();

  const propertyTypes: PropertyType[] = [
    {
      id: "single-family",
      label: t("filterDialog.propertyTypes.singleFamily"),
      icon: "🏠",
    },
    {
      id: "furnished-home",
      label: t("filterDialog.propertyTypes.furnishedHome"),
      icon: "🏠",
    },
    {
      id: "apartment",
      label: t("filterDialog.propertyTypes.apartment"),
      icon: "🏢",
    },
    {
      id: "townhouse",
      label: t("filterDialog.propertyTypes.townhouse"),
      icon: "🏘️",
    },
    {
      id: "multi-family",
      label: t("filterDialog.propertyTypes.multiFamily"),
      icon: "🏢",
    },
  ];

  const handlePropertyTypeToggle = (typeId: string) => {
    if (selectedPropertyTypes.includes(typeId)) {
      setSelectedPropertyTypes(
        selectedPropertyTypes.filter((id) => id !== typeId),
      );
    } else {
      setSelectedPropertyTypes([...selectedPropertyTypes, typeId]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {propertyTypes.map((type) => (
        <Button
          key={type.id}
          variant={
            selectedPropertyTypes.includes(type.id) ? "default" : "outline"
          }
          className="justify-start"
          onClick={() => handlePropertyTypeToggle(type.id)}
        >
          <div className="mr-2">{type.icon}</div> {type.label}
        </Button>
      ))}
    </div>
  );
};
