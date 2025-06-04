import { useState } from "react";
import { PageTitle } from "@/components/PageTitle";
import { CreateButton } from "@/components/CreateButton";

import { RenterItem } from "./RenterItem";
import { AddLeadDialog } from "./components/AddLeadDialog";

import { Link } from "react-router-dom";
import RentersTablist from "./components/RentersTablist";
import { useGetLeadsQuery } from "./api/queries";

// Sample renter data - in a real app, this would come from a database or API
// const leads = [
//   { name: "Wendy Thompson", address: "46 Bryant Way", invited: true },
//   { name: "Aaron Remirez", address: "36 Bryant Way", invited: false },
//   {
//     name: "Sara Capra",
//     address: "123 Main St.",
//     invited: false,
//     selected: true,
//   },
// ];

export default function RentersLeads() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: leads, isLoading } = useGetLeadsQuery();

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
        {isLoading ? (
          <div className="text-center text-gray-500">Loading leads...</div>
        ) : leads?.length ? (
          leads
            .filter((r) => r.propertyInterested) // Filter out renters for dev
            .map((renter, index) => (
              <Link to={"/landlord/renters/leads/" + renter._id} key={index}>
                <RenterItem
                  key={index}
                  name={renter.fullName}
                  address={
                    renter.propertyInterested?.addressDetails?.streetAddress
                  }
                  invited={renter.status === "invited"}
                  selected={renter.status === "selected"}
                />
              </Link>
            ))
        ) : (
          <div className="text-center text-gray-500">
            No leads found. Click "Add New Lead" to create one.
          </div>
        )}
      </div>

      <AddLeadDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleAddLead}
      />
    </div>
  );
}
