import NotFound from "@/components/NotFound";
import Dashboard from "@/features/landlord/dashboard/Dashboard";
import Messages from "@/features/shared/messaging/Messages";
import { type RouteObject } from "react-router-dom";
import Invite from "../dashboard/Invite";
import Screen from "../dashboard/Screen";
import SelectLease from "../dashboard/SelectLease";
import CreateLeaseAgreement from "../dashboard/CreateLeaseAgreement";
import LeaseSpecific from "../dashboard/LeaseSpecific";
import RentDepositFee from "../dashboard/RentDepositFee";
import PeopleOnLease from "../dashboard/PeopleOnLease";
import PetSmoking from "../dashboard/PetSmoking";
import UtilitiesServices from "../dashboard/UtilitiesServices";
import SelectLeaseAddendum from "../dashboard/SelectLeaseAddendum";
import ProvisionAttachment from "../dashboard/ProvisionAttachment";
import CreateLeaseAddendum from "../dashboard/CreateLeaseAddendum";
import ESign from "../dashboard/ESign";
import NeedsWork from "../dashboard/NeedsWork";
import Maintenance from "../maintenance/Maintenance";
import CreateMaintenance from "../maintenance/CreateMaintenance";
import MaintenanceDetails from "../maintenance/MaintenanceDetails";
import Leases from "../leases/Leases";
import AddLeaseDetails from "../leases/AddLeaseDetails";
import WhatsNext from "../leases/WhatsNext";
import UploadLeaseDocument from "../leases/UploadLeaseDocument";
import Forms from "../forms/Forms";
import Renters from "../renters/Renters";
import RentersDetails from "../renters/RentersDetails";
import ApplicationScreened from "../renters/ApplicationScreened";
import ScreeningReportSoon from "../renters/ScreeningReportSoon";
import ApplicationUnscreened from "../renters/ApplicationUnscreened";
import Application from "../renters/Application";
import MoveInRenter from "../renters/MoveInRenter";
import AddTenant from "../renters/AddTenant";
import TenantDetails from "../renters/TenantDetails";
import Payments from "../payments/Payments";
import CreateCharge from "../payments/CreateCharge";
import MonthlyCharge from "../payments/MonthlyCharge";
import OneTimeCharge from "../payments/OneTimeCharge";
import Expenses from "../expenses/Expenses";
import Accounting from "../accounting/Accounting";
import Education from "../education/Education";
import Support from "@/features/shared/support/Support";
import Referral from "../referral/Referral";
import Subscription from "../subscription/Subscription";
import SubscriptionDetails from "../subscription/SubscriptionDetails";
import Setting from "../settings/Setting";
import PaymentSuccessful from "@/features/shared/payments/PaymentSuccessful";
import Properties from "../properties/Properties";

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
    path: "/lease-agreement/rent-deposit-fee",
    element: <RentDepositFee />,
  },
  {
    path: "/lease-agreement/people-on-lease",
    element: <PeopleOnLease />,
  },
  {
    path: "/lease-agreement/pet-smoking",
    element: <PetSmoking />,
  },
  {
    path: "/lease-agreement/utilities-services",
    element: <UtilitiesServices />,
  },
  {
    path: "/lease-agreement/provisions-attachments",
    element: <ProvisionAttachment />,
  },
  {
    path: "/lease-addendum",
    element: <SelectLeaseAddendum />,
  },
  {
    path: "/lease-addendum/create",
    element: <CreateLeaseAddendum />,
  },
  {
    path: "/e-sign",
    element: <ESign />,
  },
  {
    path: "/needs-work",
    element: <NeedsWork />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
  {
    path: "/properties",
    element: <Properties />,
  },
  {
    path: "/maintenance",
    element: <Maintenance />,
  },
  {
    path: "/maintenance/create",
    element: <CreateMaintenance />,
  },
  {
    path: "/maintenance/:id",
    element: <MaintenanceDetails />,
  },
  {
    path: "/leases",
    element: <Leases />,
  },
  {
    path: "/leases/create",
    element: <AddLeaseDetails />,
  },
  {
    path: "/leases/upload",
    element: <UploadLeaseDocument />,
  },
  {
    path: "/leases/whats-next",
    element: <WhatsNext />,
  },
  {
    path: "/renters",
    element: <Renters />,
  },
  {
    path: "/renters/leads",
    element: <Renters />,
  },
  {
    path: "/renters/leads/:id",
    element: <RentersDetails />,
  },
  {
    path: "/renters/applicants",
    element: <Renters />,
  },
  {
    path: "/renters/add",
    element: <AddTenant />,
  },
  {
    path: "/renters/application/:id",
    element: <Application />,
  },
  {
    path: "/renters/application/:id/move-in",
    element: <MoveInRenter />,
  },
  {
    path: "/renters/application-screened/:id",
    element: <ApplicationScreened />,
  },
  {
    path: "/renters/application-unscreened/:id",
    element: <ApplicationUnscreened />,
  },
  {
    path: "/renters/screening-report-soon",
    element: <ScreeningReportSoon />,
  },
  {
    path: "/renters/tenants",
    element: <Renters />,
  },
  {
    path: "/renters/tenants/:id",
    element: <TenantDetails />,
  },
  {
    path: "/forms",
    element: <Forms />,
  },
  {
    path: "/payments",
    element: <Payments />,
  },
  {
    path: "/payments/create-charge",
    element: <CreateCharge />,
  },
  {
    path: "/payments/monthly-charge",
    element: <MonthlyCharge />,
  },
  {
    path: "/payments/one-time-charge",
    element: <OneTimeCharge />,
  },
  {
    path: "/education",
    element: <Education />,
  },
  {
    path: "/expenses",
    element: <Expenses />,
  },
  {
    path: "/accounting",
    element: <Accounting />,
  },
  {
    path: "/help",
    element: <Support />,
  },
  {
    path: "/referral",
    element: <Referral />,
  },
  {
    path: "/subscription",
    element: <Subscription />,
  },
  {
    path: "/subscription/:id",
    element: <SubscriptionDetails />,
  },
  {
    path: "/settings",
    element: <Setting />,
  },
  {
    path: "/payment/success",
    element: <PaymentSuccessful />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
