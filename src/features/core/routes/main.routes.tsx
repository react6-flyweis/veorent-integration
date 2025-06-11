import { type RouteObject } from "react-router-dom";

import ApplicationProcess from "@/features/tenant/applications/ApplicationProcess";
import ApplyListing from "@/features/tenant/search/ApplyListing";
import PropertyListingDetail from "@/features/tenant/search/Listing";
import SearchProperty from "@/features/tenant/search/SearchProperty";

export const mainRoutes: RouteObject[] = [
  {
    path: "/search",
    element: <SearchProperty />,
  },
  {
    path: "/listing/:id",
    element: <PropertyListingDetail />,
  },
  {
    path: "/listing/:id/apply",
    element: <ApplyListing />,
  },
  {
    path: "/applying/:id",
    element: <ApplicationProcess />,
  },
];
