import Dashboard from "@/features/dashboard/Dashboard";
import HomeInsuranceForm from "@/features/dashboard/HomeInsurance";
import Leases from "@/features/leases/Leases";
import Maintenance from "@/features/maintenance/Maintenance";
import RequestMaintenance from "@/features/maintenance/RequestMaintenance";
import Messages from "@/features/messages/Messages";
import { type RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/home-insurance",
    element: <HomeInsuranceForm />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
  {
    path: "/maintenance",
    element: <Maintenance />,
  },
  {
    path: "/create-maintenance-request",
    element: <RequestMaintenance />,
  },
  {
    path: "/leases",
    element: <Leases />,
  },
  {
    path: "*",
    element: <Dashboard />,
  },
];
