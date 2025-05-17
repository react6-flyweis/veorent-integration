import PropertyListingDetail from "@/features/search/Listing";
import SearchProperty from "@/features/search/SearchProperty";
import { type RouteObject } from "react-router-dom";

export const mainRoutes: RouteObject[] = [
  {
    path: "/search",
    element: <SearchProperty />,
  },
  {
    path: "/listing/:id",
    element: <PropertyListingDetail />,
  },
];
