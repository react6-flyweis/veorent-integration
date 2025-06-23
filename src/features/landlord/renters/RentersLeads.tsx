import { useState } from "react";
import { Link } from "react-router-dom";

import { CreateButton } from "@/components/CreateButton";
import { PageTitle } from "@/components/PageTitle";

import { useGetLeadsQuery } from "./api/queries";
import { AddLeadDialog } from "./components/AddLeadDialog";
import RentersTablist from "./components/RentersTablist";
import { RenterItem } from "./RenterItem";

export default function RentersLeads() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: leads, isLoading } = useGetLeadsQuery();

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
          leads.map((renter, index) => (
            <Link to={`/landlord/renters/leads/${renter._id}`} key={index}>
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

      <AddLeadDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}
