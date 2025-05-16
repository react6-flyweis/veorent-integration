import Dashboard from "@/features/dashboard/Dashboard";
import HomeInsuranceForm from "@/features/dashboard/HomeInsurance";
import Documents from "@/features/documents/Documents";
import Leases from "@/features/leases/Leases";
import RequestLeasing from "@/features/leases/RequestLeasing";
import Maintenance from "@/features/maintenance/Maintenance";
import RequestMaintenance from "@/features/maintenance/RequestMaintenance";
import Messages from "@/features/messages/Messages";
import Payments from "@/features/payments/Payments";
import SignDocuments from "@/features/sign-documents/SignDocuments";
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
    path: "/create-lease-request",
    element: <RequestLeasing />,
  },
  {
    path: "/documents",
    element: <Documents />,
  },
  {
    path: "/sign-documents",
    element: <SignDocuments />,
  },
  {
    path: "/payments",
    element: <Payments />,
  },
  {
    path: "*",
    element: <Dashboard />,
  },
];
