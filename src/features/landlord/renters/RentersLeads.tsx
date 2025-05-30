import { useState } from "react";
import { PageTitle } from "@/components/PageTitle";
import { CreateButton } from "@/components/CreateButton";

import { RenterItem } from "./RenterItem";
import { AddLeadDialog } from "./components/AddLeadDialog";

import { Link } from "react-router-dom";
import RentersTablist from "./components/RentersTablist";

// Sample renter data - in a real app, this would come from a database or API
const leads = [
  { name: "Wendy Thompson", address: "46 Bryant Way", invited: true },
  { name: "Aaron Remirez", address: "36 Bryant Way", invited: false },
  {
    name: "Sara Capra",
    address: "123 Main St.",
    invited: false,
    selected: true,
  },
];

export default function RentersLeads() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddLead = () => {};

  return (
    <div className="">
      <div className="mb-2 flex items-center justify-between">
        <PageTitle title="Renters" className="mb-0" />
        <CreateButton
          label="Add New Lead"
          onClick={() => setIsDialogOpen(true)}
        />
      </div>

      <RentersTablist />

      <div className="">
        {leads.map((renter, index) => (
          <Link
            to={"/landlord/renters/leads/" + renter.name.replace(/\s+/g, "-")}
            key={index}
          >
            <RenterItem
              key={index}
              name={renter.name}
              address={renter.address}
              invited={renter.invited}
              selected={renter.selected}
            />
          </Link>
        ))}
      </div>

      <AddLeadDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleAddLead}
      />
    </div>
  );
}
