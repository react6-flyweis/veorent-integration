import { t } from "i18next";

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
    title: t("filterDialog.accessibility.guestEntranceParking"),
    features: [
      {
        id: "Step-free guest entrance",
        label: t("filterDialog.accessibility.stepFreeGuestEntrance"),
      },
      {
        id: "Guest entrance wider than 32 inches",
        label: t("filterDialog.accessibility.guestEntranceWider32"),
      },
      {
        id: "Step-free path to guest entrance",
        label: t("filterDialog.accessibility.stepFreePathToGuestEntrance"),
      },
      {
        id: "Accessible parking spot",
        label: t("filterDialog.accessibility.accessibleParkingSpot"),
      },
    ],
  },
  {
    title: t("filterDialog.accessibility.bedroom"),
    features: [
      {
        id: "Step-free bedroom access",
        label: t("filterDialog.accessibility.stepFreeBedroomAccess"),
      },
      {
        id: "Bedroom entrance wider than 32 inches",
        label: t("filterDialog.accessibility.bedroomEntranceWider32"),
      },
    ],
  },
  {
    title: t("filterDialog.accessibility.bathroom"),
    features: [
      {
        id: "Step-free bathroom access",
        label: t("filterDialog.accessibility.stepFreeBathroomAccess"),
      },
      {
        id: "Bathroom entrance wider than 32 inches",
        label: t("filterDialog.accessibility.bathroomEntranceWider32"),
      },
      {
        id: "Toilet grab bar",
        label: t("filterDialog.accessibility.toiletGrabBar"),
      },
      {
        id: "Shower grab bar",
        label: t("filterDialog.accessibility.showerGrabBar"),
      },
      {
        id: "Step-free shower",
        label: t("filterDialog.accessibility.stepFreeShower"),
      },
      {
        id: "Shower or bath chair",
        label: t("filterDialog.accessibility.showerOrBathChair"),
      },
    ],
  },
  {
    title: t("filterDialog.accessibility.adaptiveEquipment"),
    features: [
      {
        id: "Ceiling or mobile hoist",
        label: t("filterDialog.accessibility.ceilingOrMobileHoist"),
      },
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
