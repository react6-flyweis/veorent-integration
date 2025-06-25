import { useTranslation } from "react-i18next";

import doubleCheckIcon from "./assets/double-tick.png";

interface RenterItemProps {
  name: string;
  address?: string;
  invited?: boolean;
  selected?: boolean;
}

export function RenterItem({
  name,
  address,
  invited,
  selected,
}: RenterItemProps) {
  const { t } = useTranslation();

  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex items-center justify-between">
        <div>
          {invited && (
            <div className="mb-1 text-sm font-semibold text-blue-500">
              {t("invitedToApply")}
            </div>
          )}
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-gray-600">{address}</div>
        </div>
        {selected && (
          <div className="flex size-9 items-center justify-center rounded-full border border-gray-200 bg-white">
            <img src={doubleCheckIcon} alt="" className="max-h-6 max-w-6" />
          </div>
        )}
      </div>
    </div>
  );
}
