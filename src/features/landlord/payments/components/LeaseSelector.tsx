import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetLeases } from "../../api/queries";

export function LeaseSelector({
  value,
  onChange,
  placeholder = "Select a Lease",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const { data } = useGetLeases();

  return (
    <Select onValueChange={onChange} defaultValue={value} value={value}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {data?.length ? (
          data.map((lease) => (
            <SelectItem key={lease._id} value={lease._id}>
              {lease.leaseNickname}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="no-lease" disabled>
            No properties found
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
