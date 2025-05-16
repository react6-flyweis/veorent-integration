import NotFound from "@/components/NotFound";
import BookMyMove from "@/features/dashboard/BookMyMove";
import Dashboard from "@/features/dashboard/Dashboard";
import HomeInsuranceForm from "@/features/dashboard/HomeInsurance";
import MoveInProcess from "@/features/dashboard/MoveInProcess";
import Documents from "@/features/documents/Documents";
import Help from "@/features/features/Help";
import Support from "@/features/features/Support";
import Leases from "@/features/leases/Leases";
import RequestLeasing from "@/features/leases/RequestLeasing";
import Maintenance from "@/features/maintenance/Maintenance";
import RequestMaintenance from "@/features/maintenance/RequestMaintenance";
import Messages from "@/features/messages/Messages";
import Notifications from "@/features/notifications/Notifications";
import Payments from "@/features/payments/Payments";
import Settings from "@/features/settings/Settings";
import SignDocuments from "@/features/sign-documents/SignDocuments";
import { type RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/book-move",
    element: <BookMyMove />,
  },
  {
    path: "/move-in-process",
    element: <MoveInProcess />,
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
    path: "/notification",
    element: <Notifications />,
  },
  {
    path: "/help",
    element: <Help />,
  },
  {
    path: "/support",
    element: <Support />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
