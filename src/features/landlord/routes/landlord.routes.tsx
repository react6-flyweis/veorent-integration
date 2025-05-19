import NotFound from "@/components/NotFound";
import Dashboard from "@/features/landlord/dashboard/Dashboard";
import Messages from "@/features/shared/messaging/Messages";
import { type RouteObject } from "react-router-dom";

export const landlordRoutes: RouteObject[] = [
  {
    path: "",
    element: <Dashboard />,
  },
  {
    path: "messages",
    element: <Messages />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
