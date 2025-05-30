import { PageTitle } from "@/components/PageTitle";
import { HouseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { PropertyCard } from "./components/PropertyCard";
import { CreateButton } from "@/components/CreateButton";
export interface PropertyType {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  image: string;
  baths?: number;
  beds?: number;
  rent?: number;
  rating?: number;
  status?: "complete" | "incomplete" | "marketing";
  type?: "single" | "multi";
}

export default function Properties() {
  const properties: PropertyType[] = [
    {
      id: "1",
      name: "Ft. Collins Home",
      address: "700 H St",
      city: "Ft Collins",
      state: "CO",
      zipCode: "80992",
      image: "/property.png",
      baths: 2,
      beds: 3,
      rent: 900,
      rating: 5,
      status: "marketing",
      type: "single",
    },
    {
      id: "2",
      name: "46 Bryant Way",
      address: "46 Bryant Way",
      city: "Denver",
      state: "CO",
      zipCode: "80219",
      image: "/property.png",
      baths: 2,
      beds: 2,
      rent: 800,
      type: "single",
    },
    {
      id: "3",
      name: "Family House in Santa Barbara",
      address: "2100 Circle Drive",
      city: "Santa Barbara",
      state: "CO",
      zipCode: "87692",
      image: "/property.png",
      baths: 1,
      beds: 2,
      rent: 750,
      status: "incomplete",
      type: "single",
    },
    {
      id: "4",
      name: "Multi-family House",
      address: "123 Main St",
      city: "Denver",
      state: "CO",
      zipCode: "80033",
      image: "/property.png",
      type: "multi",
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <PageTitle title="Properties" className="mb-0" />
        <Link to="/landlord/properties/add">
          <CreateButton label="Add new property" />
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {properties.map((property) => (
          <Link to={`/landlord/properties/${property.id}`} key={property.id}>
            <PropertyCard property={property} />
          </Link>
        ))}
      </div>

      <Link to="/landlord/properties/add">
        <Button
          className="py- mt-6 flex h-24 w-full flex-col items-center justify-center gap-2"
          variant="outline"
        >
          <HouseIcon className="size-7" />
          <span className="font-medium tracking-wide uppercase">
            Add Property
          </span>
        </Button>
      </Link>
    </div>
  );
}
