import NotFound from "@/components/NotFound";
import AddCardDetails from "@/features/tenant/dashboard/AddCardDetails";
import AutoPay from "@/features/tenant/dashboard/AutoPay";
import BookMyMove from "@/features/tenant/dashboard/BookMyMove";
import Dashboard from "@/features/tenant/dashboard/Dashboard";
import HomeInsuranceForm from "@/features/tenant/dashboard/HomeInsurance";
import MakePayment from "@/features/tenant/dashboard/MakePayment";
import MoveInProcess from "@/features/tenant/dashboard/MoveInProcess";
import Documents from "@/features/tenant/documents/Documents";
import Help from "@/features/tenant/Help/Help";
import Support from "@/features/shared/support/Support";
import Leases from "@/features/tenant/leases/Leases";
import RequestLeasing from "@/features/tenant/leases/RequestLeasing";
import Maintenance from "@/features/tenant/maintenance/Maintenance";
import RequestMaintenance from "@/features/tenant/maintenance/RequestMaintenance";
import Messages from "@/features/shared/messaging/Messages";
import Notifications from "@/features/tenant/notifications/Notifications";
import Payments from "@/features/tenant/payments/Payments";
import PaymentSuccessful from "@/features/tenant/payments/PaymentSuccessful";
import Settings from "@/features/tenant/settings/Settings";
import SignDocuments from "@/features/tenant/documents/sign-documents/SignDocuments";
import { type RouteObject } from "react-router-dom";

export const dashRoutes: RouteObject[] = [
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
    path: "/add-card",
    element: <AddCardDetails />,
  },
  {
    path: "/auto-pay",
    element: <AutoPay />,
  },
  {
    path: "/make-payment",
    element: <MakePayment />,
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
    path: "/payment/success",
    element: <PaymentSuccessful />,
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
