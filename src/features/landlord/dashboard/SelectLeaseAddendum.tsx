import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SelectLeaseAddendum() {
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>();

  // Mock addresses - replace with actual data in production
  const addresses = [
    "123 Main St, Apt 4, City, State 12345",
    "456 Elm St, City, State 12345",
    "789 Oak Ave, City, State 12345",
  ];

  return (
    <div className="flex flex-col ">
      <div className="mb-6">
        <Link to="/landlord" className="flex items-center  gap-5">
          <BackButton />
          <h2 className="text-2xl font-semibold">
            Select Which Lease Needs an Addendum
          </h2>
        </Link>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Lease</label>
        <Select value={selectedAddress} onValueChange={setSelectedAddress}>
          <SelectTrigger className="w-full border rounded-md p-3">
            <SelectValue placeholder="Choose an address" />
          </SelectTrigger>
          <SelectContent>
            {addresses.map((address, index) => (
              <SelectItem key={index} value={address}>
                {address}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-center">
        <Button className="w-3/5" size="lg" disabled={!selectedAddress} asChild>
          <Link to="#">Continue</Link>
        </Button>
      </div>
    </div>
  );
}
