import NotFound from "@/components/NotFound";
import Dashboard from "@/features/landlord/dashboard/Dashboard";
import Messages from "@/features/shared/messaging/Messages";
import { type RouteObject } from "react-router-dom";
import Invite from "../dashboard/Invite";
import Screen from "../dashboard/Screen";
import SelectLease from "../dashboard/SelectLease";

export const landlordRoutes: RouteObject[] = [
  {
    path: "",
    element: <Dashboard />,
  },
  {
    path: "/invite",
    element: <Invite />,
  },
  {
    path: "/screen",
    element: <Screen />,
  },
  {
    path: "/lease-agreement",
    element: <SelectLease />,
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
