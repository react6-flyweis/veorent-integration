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
      { id: "step-free-entrance", label: "Step-free guest entrance" },
      { id: "wide-entrance", label: "Guest entrance wider than 32 inches" },
      { id: "step-free-path", label: "Step-free path to the guest entrance" },
      { id: "accessible-parking", label: "Accessible parking spot" },
    ],
  },
  {
    title: "Bedroom",
    features: [
      { id: "step-free-bedroom", label: "Step-free bedroom access" },
      { id: "wide-bedroom", label: "Bedroom entrance wider than 32 inches" },
    ],
  },
  {
    title: "Bathroom",
    features: [
      { id: "step-free-bathroom", label: "Step-free bathroom access" },
      { id: "wide-bathroom", label: "Bathroom entrance wider than 32 inches" },
      { id: "grab-bar-toilet", label: "Toilet grab bar" },
      { id: "grab-bar-shower", label: "Shower grab bar" },
      { id: "step-free-shower", label: "Step-free shower" },
      { id: "shower-chair", label: "Shower or bath chair" },
    ],
  },
  {
    title: "Adaptive equipment",
    features: [{ id: "ceiling-hoist", label: "Ceiling or mobile hoist" }],
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
  const toggleFeature = (featureId: string) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(selectedFeatures.filter((id) => id !== featureId));
    } else {
      setSelectedFeatures([...selectedFeatures, featureId]);
    }
  };

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
                  onCheckedChange={() => toggleFeature(feature.id)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
