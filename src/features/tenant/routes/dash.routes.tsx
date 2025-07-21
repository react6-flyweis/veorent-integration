import { lazy } from "react";
import { type RouteObject } from "react-router-dom";

// Lazy imports for code splitting
const NotFound = lazy(() => import("@/components/NotFound"));
const AddCardDetails = lazy(
  () => import("@/features/tenant/dashboard/AddCardDetails"),
);
const AutoPay = lazy(() => import("@/features/tenant/dashboard/AutoPay"));
const BookMyMove = lazy(() => import("@/features/tenant/dashboard/BookMyMove"));
const Dashboard = lazy(() => import("@/features/tenant/dashboard/Dashboard"));
const HomeInsuranceForm = lazy(
  () => import("@/features/tenant/dashboard/HomeInsurance"),
);
const MakePayment = lazy(
  () => import("@/features/tenant/dashboard/MakePayment"),
);
const MoveInProcess = lazy(
  () => import("@/features/tenant/dashboard/MoveInProcess"),
);
const Documents = lazy(() => import("@/features/tenant/documents/Documents"));
const Help = lazy(() => import("@/features/tenant/Help/Help"));
const Support = lazy(() => import("@/features/shared/support/Support"));
const Leases = lazy(() => import("@/features/tenant/leases/Leases"));
const RequestLeasing = lazy(
  () => import("@/features/tenant/leases/RequestLeasing"),
);
const Maintenance = lazy(
  () => import("@/features/tenant/maintenance/Maintenance"),
);
const RequestMaintenance = lazy(
  () => import("@/features/tenant/maintenance/RequestMaintenance"),
);
const Messages = lazy(() => import("@/features/shared/messaging/Messages"));
const Notifications = lazy(
  () => import("@/features/tenant/notifications/Notifications"),
);
const Payments = lazy(() => import("@/features/tenant/payments/Payments"));
const PaymentSuccessful = lazy(
  () => import("@/features/shared/payments/PaymentSuccessful"),
);
const Settings = lazy(() => import("@/features/tenant/settings/Settings"));
const SignDocuments = lazy(
  () => import("@/features/tenant/documents/sign-documents/SignDocuments"),
);
const AddContacts = lazy(
  () => import("@/features/shared/messaging/AddContacts"),
);
const InsurancePlans = lazy(() => import("../dashboard/InsurancePlan"));
const PlanDetails = lazy(() => import("../dashboard/PlanDetails"));

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
    path: "/insurance-plans",
    element: <InsurancePlans />,
  },
  {
    path: "/insurance-plans/:id",
    element: <PlanDetails />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
  {
    path: "/messages/add",
    element: <AddContacts />,
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
