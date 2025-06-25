import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import {
  Calendar1,
  Search,
  Star,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  HomeIcon,
} from "lucide-react";

import { CreateButton } from "@/components/CreateButton";
import { PageTitle } from "@/components/PageTitle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/utils/formatDate";

import { useGetMaintenanceRequests } from "./api/queries";

// interface MaintenanceIssue {
//   id: string;
//   date: string;
//   title: string;
//   rental: {
//     address: string;
//     link: string;
//   };
//   lastActivity: string;
//   status: "{t('open')}956 | "{t('inProgress')}965 | "{t('completed')}989;
// }

// const demoData: MaintenanceIssue[] = [
//   {
//     id: "1",
//     date: "Jan 08, 2024",
//     title: "Plumbing",
//     rental: {
//       address: "123, Main St.",
//       link: "/rentals/123",
//     },
//     lastActivity: "Jan 08, 2024 3:04pm",
//     status: "{t('open')}1289,
//   },
// ];

// Define maintenance categories with their corresponding icons
const maintenanceCategories = [
  { value: "all-time", label: "allTime", icon: Calendar1 },
  { value: "rentals", label: "rentals", icon: HomeIcon },
  { value: "all-status", label: "allStatus", icon: ClipboardList },
  { value: "starred", label: "starred", icon: Star },
];

export default function Maintenance() {
  const { t } = useTranslation();

  const { data: maintenanceRequests, isLoading } = useGetMaintenanceRequests();
  const [activeTab, setActiveTab] = useState("all-time");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const otherTabsLimit = 8;

  const navigate = useNavigate();

  const handleClick = (issueId: string) => {
    navigate(`/landlord/maintenance/${issueId}`);
  };

  // Reset pagination when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  // Filter maintenance requests based on active tab and search term
  const filteredMaintenanceRequests = useMemo(() => {
    if (!maintenanceRequests) return [];

    let filtered = maintenanceRequests;

    // Filter by category based on active tab
    if (activeTab === "rentals") {
      filtered = filtered.filter(
        (request) => request.category?.toLowerCase() === "rentals",
      );
    } else if (activeTab === "starred") {
      filtered = filtered.filter(
        (request) => request.category?.toLowerCase() === "starred",
      );
    }
    // For "all-time" and "all-status", show all requests

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (request) =>
          request.issueTitle?.toLowerCase().includes(searchLower) ||
          request.issueDescription?.toLowerCase().includes(searchLower) ||
          request.status?.toLowerCase().includes(searchLower),
      );
    }

    return filtered;
  }, [maintenanceRequests, activeTab, searchTerm]);

  // Apply pagination and limit logic
  const paginatedRequests = useMemo(() => {
    const filtered = filteredMaintenanceRequests;

    if (activeTab === "all-time") {
      // For "All Time" tab, apply pagination
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return filtered.slice(startIndex, endIndex);
    } else {
      // For other tabs, show only latest items based on otherTabsLimit
      return filtered
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, otherTabsLimit);
    }
  }, [
    filteredMaintenanceRequests,
    activeTab,
    currentPage,
    itemsPerPage,
    otherTabsLimit,
  ]);

  // Calculate total pages for "All Time" tab
  const totalPages = useMemo(() => {
    if (activeTab === "all-time") {
      return Math.ceil(filteredMaintenanceRequests.length / itemsPerPage);
    }
    return 1;
  }, [filteredMaintenanceRequests.length, activeTab, itemsPerPage]);

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-between">
        <PageTitle title={t("maintenance")} className="mb-0" />
        <Link to="create">
          <CreateButton label={t("createRequest")} />
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="flex-1"
        >
          <TabsList className="flex flex-col items-start gap-2 border-0 @lg:flex-row">
            <div className="flex flex-wrap gap-2">
              {maintenanceCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <TabsTrigger
                    key={category.value}
                    value={category.value}
                    className="flex h-8 items-center bg-blue-100 font-semibold text-gray-700"
                  >
                    <IconComponent className="size-5 text-gray-700" />
                    <span className="hidden align-bottom @md:block">
                      {t(category.label)}
                    </span>
                  </TabsTrigger>
                );
              })}
            </div>
            <div className="flex h-8 w-32 items-center justify-center rounded-md border px-1 focus-within:ring-2 focus-within:ring-blue-500">
              <Search className="size-5 text-gray-500" />
              <Input
                type="search"
                placeholder={t("search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-5 border-0 shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none"
              />
            </div>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">
          {t("keepTrackOfMaintenanceIssues")}
        </h2>
        <div className="rounded-xl border shadow-md">
          <Table>
            <TableHeader className="">
              <TableRow className="font-medium">
                <TableHead className="">{t("date")}</TableHead>
                <TableHead className="font-medium">{t("title")}</TableHead>
                <TableHead className="font-medium">{t("category")}</TableHead>
                <TableHead className="font-medium">{t("rental")}</TableHead>
                <TableHead className="font-medium">
                  {t("lastActivity")}
                </TableHead>
                <TableHead className="font-medium">{t("status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-8 text-center text-gray-500"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-blue-500"></div>
                      <span>{t("loadingMaintenanceRequests")}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : paginatedRequests?.length ? (
                paginatedRequests.map((issue) => (
                  <TableRow
                    key={issue._id}
                    onClick={() => handleClick(issue._id)}
                    className="cursor-pointer"
                  >
                    <TableCell className="font-semibold">
                      {formatDate(issue.createdAt)}
                    </TableCell>
                    <TableCell className="text-primary text-xl font-bold">
                      {issue.issueTitle}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {issue.category || t("notAvailable")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link
                        to={issue.property}
                        className="text-lg text-blue-500 underline"
                      >
                        {/* {issue.property.address} */}
                        {/* Address */}
                      </Link>
                    </TableCell>
                    <TableCell className="text-base">
                      {formatDate(issue.updatedAt)}
                    </TableCell>
                    <TableCell>
                      <Badge>{issue.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-8 text-center text-gray-500"
                  >
                    {searchTerm ||
                    (activeTab !== "all-time" && activeTab !== "all-status")
                      ? t("noMaintenanceRequestsFoundForFilters")
                      : t("noMaintenanceRequestsFound")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination for All Time tab */}
        {activeTab === "all-time" && totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {t("showingResults", {
                start: (currentPage - 1) * itemsPerPage + 1,
                end: Math.min(
                  currentPage * itemsPerPage,
                  filteredMaintenanceRequests.length,
                ),
                total: filteredMaintenanceRequests.length,
              })}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                {t("previous")}
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="h-8 w-8 p-0"
                    >
                      {page}
                    </Button>
                  ),
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                {t("next")}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
