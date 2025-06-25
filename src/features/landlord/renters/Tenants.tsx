import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { CreateButton } from "@/components/CreateButton";
import { Loader } from "@/components/Loader";
import { PageTitle } from "@/components/PageTitle";

import { useGetTenantsQuery } from "./api/queries";
import RentersTablist from "./components/RentersTablist";
import { TenantCard } from "./components/TenantCard";

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
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { data: tenants = [], isLoading } = useGetTenantsQuery(1, 5);

  const handleAddNew = () => {
    navigate("/landlord/renters/add");
  };

  return (
    <div className="">
      <div className="mb-2 flex items-center justify-between">
        <PageTitle title={t("renters")} className="mb-0" />
        <CreateButton label={t("addNewTenant")} onClick={handleAddNew} />
      </div>
      <RentersTablist />

      <h2 className="mt-5 mb-3 text-2xl font-semibold">{t("activeTenants")}</h2>

      {isLoading ? (
        <div className="flex items-center justify-center py-14">
          <Loader />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          {tenants.length ? (
            tenants.map((tenant, index) => (
              <Link to={`/landlord/renters/tenants/${tenant._id}`} key={index}>
                <TenantCard tenant={tenant} />
              </Link>
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">
              {t("noTenantsFound")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
