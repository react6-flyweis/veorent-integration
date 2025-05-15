import Dashboard from "@/features/dashboard/Dashboard";
import HomeInsuranceForm from "@/features/dashboard/HomeInsurance";
import Maintenance from "@/features/maintenance/Maintenance";
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
];
