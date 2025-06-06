import { PageTitle } from "@/components/PageTitle";
import { CreateButton } from "@/components/CreateButton";
import { TenantCard } from "./components/TenantCard";

import { Link, useNavigate } from "react-router-dom";
import RentersTablist from "./components/RentersTablist";
import { useGetTenantsQuery } from "./api/queries";
import { Loader } from "@/components/Loader";

// Sample renter data - in a real app, this would come from a database or API
// const tenants = [
//   {
//     name: "William Thorne",
//     address: "123 Main St.",
//     unit: "1",
//     room: "A",
//     inviteDate: "08/19/2024 07:40 AM",
//     image: "/assets/avatars/william-thorne.jpg",
//   },
//   {
//     name: "Alicia Sandoval",
//     address: "123 Main St.",
//     unit: "1",
//     room: "A",
//     lastActive: "08/19/2024 07:40 AM",
//     image: "/assets/avatars/alicia-sandoval.jpg",
//   },
// ];

export default function Tenants() {
  const navigate = useNavigate();
  const { data: tenants = [], isLoading } = useGetTenantsQuery(1, 5);

  const handleAddNew = () => {
    navigate("/landlord/renters/add");
  };

  return (
    <div className="">
      <div className="mb-2 flex items-center justify-between">
        <PageTitle title="Renters" className="mb-0" />
        <CreateButton label="Add New Tenant" onClick={handleAddNew} />
      </div>
      <RentersTablist />

      <h2 className="mt-5 mb-3 text-2xl font-semibold">Active Tenants</h2>

      {isLoading ? (
        <div className="flex items-center justify-center py-14">
          <Loader />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          {tenants.length ? (
            tenants.map((tenant, index) => (
              <Link to={"/landlord/renters/tenants/" + tenant._id} key={index}>
                <TenantCard tenant={tenant} />
              </Link>
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">
              No tenants found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
