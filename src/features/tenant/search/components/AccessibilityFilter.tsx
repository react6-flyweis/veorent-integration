import { Checkbox } from "@/components/ui/checkbox";

type AccessibilityCategory = {
  title: string;
  features: Array<{
    id: string;
    label: string;
  }>;
};

const accessibilityData: AccessibilityCategory[] = [
  {
    title: "Guest entrance and parking",
    features: [
      { id: "Step-free guest entrance", label: "Step-free guest entrance" },
      {
        id: "Guest entrance wider than 32 inches",
        label: "Guest entrance wider than 32 inches",
      },
      {
        id: "Step-free path to guest entrance",
        label: "Step-free path to the guest entrance",
      },
      { id: "Accessible parking spot", label: "Accessible parking spot" },
    ],
  },
  {
    title: "Bedroom",
    features: [
      { id: "Step-free bedroom access", label: "Step-free bedroom access" },
      {
        id: "Bedroom entrance wider than 32 inches",
        label: "Bedroom entrance wider than 32 inches",
      },
    ],
  },
  {
    title: "Bathroom",
    features: [
      { id: "Step-free bathroom access", label: "Step-free bathroom access" },
      {
        id: "Bathroom entrance wider than 32 inches",
        label: "Bathroom entrance wider than 32 inches",
      },
      { id: "Toilet grab bar", label: "Toilet grab bar" },
      { id: "Shower grab bar", label: "Shower grab bar" },
      { id: "Step-free shower", label: "Step-free shower" },
      { id: "Shower or bath chair", label: "Shower or bath chair" },
    ],
  },
  {
    title: "Adaptive equipment",
    features: [
      { id: "Ceiling or mobile hoist", label: "Ceiling or mobile hoist" },
    ],
  },
];

interface AccessibilityFilterProps {
  selectedFeatures: string[];
  setSelectedFeatures: (features: string[]) => void;
}

export const AccessibilityFilter = ({
  selectedFeatures,
  setSelectedFeatures,
}: AccessibilityFilterProps) => {
  return (
    <div className="space-y-6">
      {accessibilityData.map((category) => (
        <div key={category.title} className="space-y-4">
          <h4 className="text-sm font-medium">{category.title}</h4>
          <div className="space-y-2">
            {category.features.map((feature) => (
              <div
                key={feature.id}
                className="flex items-center justify-between"
              >
                <label htmlFor={feature.id} className="text-sm">
                  {feature.label}
                </label>
                <Checkbox
                  id={feature.id}
                  checked={selectedFeatures.includes(feature.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedFeatures([...selectedFeatures, feature.id]);
                    } else {
                      setSelectedFeatures(
                        selectedFeatures.filter((id) => id !== feature.id),
                      );
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
