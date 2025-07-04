import React from "react";
import { useTranslation } from "react-i18next";
import { MinusIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface RoomsAndBedsFilterProps {
  bedrooms: number;
  setBedrooms: (value: number) => void;
  beds: number;
  setBeds: (value: number) => void;
  bathrooms: number;
  setBathrooms: (value: number) => void;
}

type FilterItem = {
  label: string;
  value: number;
  setValue: (value: number) => void;
};

export const RoomsAndBedsFilter: React.FC<RoomsAndBedsFilterProps> = ({
  bedrooms,
  setBedrooms,
  beds,
  setBeds,
  bathrooms,
  setBathrooms,
}) => {
  const { t } = useTranslation();

  const filterItems: FilterItem[] = [
    {
      label: t("filterDialog.roomsAndBeds.bedrooms"),
      value: bedrooms,
      setValue: setBedrooms,
    },
    {
      label: t("filterDialog.roomsAndBeds.beds"),
      value: beds,
      setValue: setBeds,
    },
    {
      label: t("filterDialog.roomsAndBeds.bathrooms"),
      value: bathrooms,
      setValue: setBathrooms,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium">
        {t("filterDialog.roomsAndBeds.title")}
      </h3>

      <div className="space-y-5">
        {filterItems.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <label className="text-navy-700 font-medium">{item.label}</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="size-8 rounded-full"
                onClick={() => item.setValue(Math.max(0, item.value - 1))}
              >
                <MinusIcon className="size-4" />
              </Button>
              <div className="border-primary flex h-10 w-12 items-center justify-center rounded-2xl border text-center">
                <span className="text-xl font-medium">{item.value}</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="size-8 rounded-full"
                onClick={() => item.setValue(item.value + 1)}
              >
                <PlusIcon className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
