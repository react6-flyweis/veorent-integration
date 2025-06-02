import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetProperties } from "../api/queries";

export function PropertiesSelector({
  value,
  onChange,
  placeholder = "Select a property",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const { data } = useGetProperties();

  return (
    <Select onValueChange={onChange} defaultValue={value} value={value}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {data?.data?.length ? (
          data.data.map((property) => (
            <SelectItem key={property._id} value={property._id}>
              {property.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="no-properties" disabled>
            No properties found
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
