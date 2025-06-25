import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/ghost-tabs";

const validTabs = ["leads", "applicants", "tenants"];

export default function RentersTablist() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(validTabs[0]);

  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    // Assuming the base path is /landlord/renters, the tab would be the next segment
    const currentTabFromUrl = pathSegments[pathSegments.length - 1];

    if (validTabs.includes(currentTabFromUrl)) {
      setActiveTab(currentTabFromUrl);
    }
  }, [location.pathname]);

  const handleTabChange = (tabValue: string) => {
    navigate(`/landlord/renters/${tabValue}`);
  };
  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <TabsList className="px-0">
        <TabsTrigger value="leads">{t("leads")}</TabsTrigger>
        <TabsTrigger value="applicants">{t("applicants")}</TabsTrigger>
        <TabsTrigger value="tenants">{t("tenants")}</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
