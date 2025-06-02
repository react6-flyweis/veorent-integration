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
  placeholder = "Select a Bank",
}: {
  value: (typeof availableBanks)[number]["_id"];
  onChange: (value: (typeof availableBanks)[number]["_id"]) => void;
  placeholder?: string;
}) {
  return (
    <Select onValueChange={onChange} defaultValue={value} value={value}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
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
