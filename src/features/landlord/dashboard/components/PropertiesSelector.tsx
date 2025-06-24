import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetProperties } from "@/features/landlord/api/queries";

export function PropertiesSelector({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const { data } = useGetProperties();
  const { t } = useTranslation();

  const defaultPlaceholder = placeholder || t("selectProperty");

  const isIncomplete = useCallback((property: IProperty) => {
    if (!property.formCompletionStatus) return false;
    return !Object.values(property.formCompletionStatus).every(
      (status) => status === true,
    );
  }, []);

  const completedProperties = data?.filter(
    (property) => !isIncomplete(property),
  );

  return (
    <Select onValueChange={onChange} defaultValue={value} value={value}>
      <SelectTrigger>
        <SelectValue placeholder={defaultPlaceholder} />
      </SelectTrigger>
      <SelectContent>
        {completedProperties?.length ? (
          completedProperties.map((property) => (
            <SelectItem key={property._id} value={property._id}>
              {property.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="no-properties" disabled>
            {t("noCompletedPropertiesFound")}
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
