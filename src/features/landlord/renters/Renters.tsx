import { PageTitle } from "@/components/PageTitle";
import { CreateButton } from "@/components/CreateButton";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/ghost-tabs";
import { RenterItem } from "./RenterItem";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Applicants from "./Applicants";

// Sample renter data - in a real app, this would come from a database or API
const renters = {
  leads: [
    { name: "Wendy Thompson", address: "46 Bryant Way", invited: true },
    { name: "Aaron Remirez", address: "36 Bryant Way", invited: false },
    {
      name: "Sara Capra",
      address: "123 Main St.",
      invited: false,
      selected: true,
    },
  ],
  applicants: [],
  tenants: [],
};

export default function Renters() {
  const location = useLocation();
  const navigate = useNavigate();

  const pathSegments = location.pathname.split("/").filter(Boolean);
  // Assuming the base path is /landlord/renters, the tab would be the next segment
  const currentTabFromUrl = pathSegments[pathSegments.length - 1];

  const validTabs = ["leads", "applicants", "tenants"];
  let activeTab = "leads"; // Default tab

  if (validTabs.includes(currentTabFromUrl)) {
    activeTab = currentTabFromUrl;
  }

  const handleTabChange = (tabValue: string) => {
    navigate(`/landlord/renters/${tabValue}`);
  };

  return (
    <div className="container py-6">
      <div className="mb-2 flex items-center justify-between">
        <PageTitle title="Renters" className="mb-0" />
        <CreateButton label="Add New" />
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="px-0">
          <TabsTrigger value="leads">LEADS</TabsTrigger>
          <TabsTrigger value="applicants">APPLICANTS</TabsTrigger>
          <TabsTrigger value="tenants">TENANTS</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="mt-3">
          {renters.leads.map((renter, index) => (
            <Link to={renter.name.replace(/\s+/g, "-")} key={index}>
              <RenterItem
                key={index}
                name={renter.name}
                address={renter.address}
                invited={renter.invited}
                selected={renter.selected}
              />
            </Link>
          ))}
        </TabsContent>

        <TabsContent value="applicants" className="mt-6">
          <Applicants />
        </TabsContent>

        <TabsContent value="tenants" className="mt-6">
          <div className="py-8 text-center text-gray-500">No tenants found</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
