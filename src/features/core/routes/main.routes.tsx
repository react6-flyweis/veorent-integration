import { lazy } from "react";
import { type RouteObject } from "react-router-dom";

// Lazy imports for code splitting
const ApplicationProcess = lazy(
  () => import("@/features/tenant/applications/ApplicationProcess"),
);
const ApplyListing = lazy(
  () => import("@/features/tenant/search/ApplyListing"),
);
const PropertyListingDetail = lazy(
  () => import("@/features/tenant/search/Listing"),
);
const SearchProperty = lazy(
  () => import("@/features/tenant/search/SearchProperty"),
);

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
