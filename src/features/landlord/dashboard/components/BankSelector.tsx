import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const availableBanks = [
  {
    _id: "standard",
    name: "Standard Bank Group",
  },
  {
    _id: "firstrand",
    name: "FirstRand",
  },
  {
    _id: "absa",
    name: "Absa Group",
  },
];

export function BankSelector({
  value,
  onChange,
  placeholder,
}: {
  value: (typeof availableBanks)[number]["_id"];
  onChange: (value: (typeof availableBanks)[number]["_id"]) => void;
  placeholder?: string;
}) {
  const { t } = useTranslation();
  const defaultPlaceholder = placeholder || t("selectBank");

  return (
    <Select onValueChange={onChange} defaultValue={value} value={value}>
      <SelectTrigger>
        <SelectValue placeholder={defaultPlaceholder} />
      </SelectTrigger>
      <SelectContent>
        {availableBanks.map((bank) => (
          <SelectItem key={bank._id} value={bank._id}>
            {bank.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
