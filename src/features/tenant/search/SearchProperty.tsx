import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { RentalListingCard } from "./components/ListingCard";
import { FilterDialog } from "./components/FilterDialog";

const listings = [
  {
    id: "65gds54gsd46sag",
    type: "SINGLE-FAMILY",
    title: "Brighton Lake Front Fully Furnished 7 month lease",
    address: "3110 Causeway Dr, Brighton, MI 48114",
    beds: 3,
    baths: 2,
    available: "10/01/2024",
    price: "€2,400.00",
    landlord: "Donna VanAntwerp",
    imageUrl: "/property.png",
  },
  {
    id: "45sg55sgs16sd6",
    type: "APARTMENT",
    title: "Oceanview ,2 bed/1 Ba steps to beach, Ocean Beach",
    address: "5127 Cape May Ave 1, San Diego, CA 92107",
    beds: 2,
    baths: 1,
    available: "09/10/2024",
    price: "€3,200.00",
    landlord: "Susan Steinbarth",
    imageUrl: "/property.png",
  },
  {
    id: "f65664e45s4des",
    type: "APARTMENT",
    title: "Luxury apt. near T. F. Green Airport/Providence",
    address: "28 Yucatan Drive, Warwick, RI 02889",
    beds: 1,
    baths: 1,
    available: "09/01/2024",
    price: "€1,875.00",
    landlord: "Landlord Name",
    imageUrl: "/property.png",
  },
];

export default function SearchProperty() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <img src="/logo-dark.png" alt="Veorent Logo" className="h-8" />
        <div className="border-primary flex w-full items-center border">
          <Input placeholder="Search rentals..." className="w-full border-0" />
          <Button size="icon" className="rounded-none border-0">
            <SearchIcon className="size-4" />
          </Button>
        </div>
        <FilterDialog />
      </div>

      {/* Listings */}
      <div className="space-y-4">
        {listings.map((listing) => (
          <RentalListingCard data={listing} />
        ))}
      </div>
    </div>
  );
}
