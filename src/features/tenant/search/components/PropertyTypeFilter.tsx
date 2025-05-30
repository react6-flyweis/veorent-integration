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

const propertyTypes: PropertyType[] = [
  {
    id: "single-family",
    label: "Single family",
    icon: "🏠",
  },
  {
    id: "furnished-home",
    label: "Furnished home",
    icon: "🏠",
  },
  {
    id: "apartment",
    label: "Apartment",
    icon: "🏢",
  },
  {
    id: "townhouse",
    label: "Townhouse",
    icon: "🏘️",
  },
  {
    id: "multi-family",
    label: "Multi-family",
    icon: "🏢",
  },
];

export const PropertyTypeFilter = ({
  selectedPropertyTypes,
  setSelectedPropertyTypes,
}: PropertyTypeFilterProps) => {
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
