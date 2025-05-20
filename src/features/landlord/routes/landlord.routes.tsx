import NotFound from "@/components/NotFound";
import Dashboard from "@/features/landlord/dashboard/Dashboard";
import Messages from "@/features/shared/messaging/Messages";
import { type RouteObject } from "react-router-dom";
import Invite from "../dashboard/Invite";
import Screen from "../dashboard/Screen";
import SelectLease from "../dashboard/SelectLease";
import CreateLeaseAgreement from "../dashboard/CreateLeaseAgreement";
import LeaseSpecific from "../dashboard/LeaseSpecific";

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
    path: "/lease-agreement/create",
    element: <CreateLeaseAgreement />,
  },
  {
    path: "/lease-agreement/specific",
    element: <LeaseSpecific />,
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
