import { lazy } from "react";
import { type RouteObject } from "react-router-dom";

// Lazy imports for code splitting
const NotFound = lazy(() => import("@/components/NotFound"));
const Dashboard = lazy(() => import("@/features/landlord/dashboard/Dashboard"));
const Messages = lazy(() => import("@/features/shared/messaging/Messages"));
const Invite = lazy(() => import("../dashboard/Invite"));
const Screen = lazy(() => import("../dashboard/Screen"));
const SelectLease = lazy(() => import("../dashboard/SelectLease"));
const CreateLeaseAgreement = lazy(
  () => import("../dashboard/CreateLeaseAgreement"),
);
const LeaseSpecific = lazy(() => import("../dashboard/LeaseSpecific"));
const RentDepositFee = lazy(() => import("../dashboard/RentDepositFee"));
const PeopleOnLease = lazy(() => import("../dashboard/PeopleOnLease"));
const PetSmoking = lazy(() => import("../dashboard/PetSmoking"));
const UtilitiesServices = lazy(() => import("../dashboard/UtilitiesServices"));
const SelectLeaseAddendum = lazy(
  () => import("../dashboard/SelectLeaseAddendum"),
);
const ProvisionAttachment = lazy(
  () => import("../dashboard/ProvisionAttachment"),
);
const CreateLeaseAddendum = lazy(
  () => import("../dashboard/CreateLeaseAddendum"),
);
const ESign = lazy(() => import("../dashboard/ESign"));
const NeedsWork = lazy(() => import("../dashboard/NeedsWork"));
const Maintenance = lazy(() => import("../maintenance/Maintenance"));
const CreateMaintenance = lazy(
  () => import("../maintenance/CreateMaintenance"),
);
const MaintenanceDetails = lazy(
  () => import("../maintenance/MaintenanceDetails"),
);
const Leases = lazy(() => import("../leases/Leases"));
const AddLeaseDetails = lazy(() => import("../leases/AddLeaseDetails"));
const WhatsNext = lazy(() => import("../leases/WhatsNext"));
const UploadLeaseDocument = lazy(() => import("../leases/UploadLeaseDocument"));
const Forms = lazy(() => import("../forms/Forms"));
const RentersDetails = lazy(() => import("../renters/RentersDetails"));
const ApplicationScreened = lazy(
  () => import("../renters/ApplicationScreened"),
);
const ScreeningReportSoon = lazy(
  () => import("../renters/ScreeningReportSoon"),
);
const ApplicationUnscreened = lazy(
  () => import("../renters/ApplicationUnscreened"),
);
const Application = lazy(() => import("../renters/Application"));
const MoveInRenter = lazy(() => import("../renters/MoveInRenter"));
const AddTenant = lazy(() => import("../renters/AddTenant"));
const TenantDetails = lazy(() => import("../renters/TenantDetails"));
const Payments = lazy(() => import("../payments/Payments"));
const CreateCharge = lazy(() => import("../payments/CreateCharge"));
const MonthlyCharge = lazy(() => import("../payments/MonthlyCharge"));
const OneTimeCharge = lazy(() => import("../payments/OneTimeCharge"));
const DailyCharge = lazy(() => import("../payments/DailyCharge"));
const Expenses = lazy(() => import("../expenses/Expenses"));
const Accounting = lazy(() => import("../accounting/Accounting"));
const Education = lazy(() => import("../education/Education"));
const Support = lazy(() => import("@/features/shared/support/Support"));
const Referral = lazy(() => import("../referral/Referral"));
const Subscription = lazy(() => import("../subscription/Subscription"));
const SubscriptionDetails = lazy(
  () => import("../subscription/SubscriptionDetails"),
);
const Setting = lazy(() => import("../settings/Setting"));
const PaymentSuccessful = lazy(
  () => import("@/features/shared/payments/PaymentSuccessful"),
);
const Properties = lazy(() => import("../properties/Properties"));
const PropertyDetail = lazy(() => import("../properties/PropertyDetail"));
const AddProperty = lazy(() => import("../properties/AddProperty"));
const SetupListing = lazy(() => import("../properties/SetupListing"));
const SetupListingPrompt = lazy(
  () => import("../properties/SetupListingPrompt"),
);
const BookingCalendar = lazy(() => import("../calendar/BookingCalendar"));
const AddContacts = lazy(
  () => import("@/features/shared/messaging/AddContacts"),
);
const MarketingExtended = lazy(() => import("../properties/MarketingExtended"));
const EditProperty = lazy(() => import("../properties/EditProperty"));
const EditPropertySize = lazy(() => import("../properties/EditPropertySize"));
const EditPropertyAddress = lazy(
  () => import("../properties/EditPropertyAdress"),
);
const PropertyUnits = lazy(() => import("../properties/PropertyUnits"));
const Applicants = lazy(() => import("../renters/Applicants"));
const Tenants = lazy(() => import("../renters/Tenants"));
const RentersLeads = lazy(() => import("../renters/RentersLeads"));
const EditPropertyBasics = lazy(
  () => import("../properties/EditPropertyBasics"),
);
const EditPropertyPermissions = lazy(
  () => import("../properties/EditPropertyPermissions"),
);
const EditPropertyDescription = lazy(
  () => import("../properties/EditPropertyDescription"),
);
const EditPropertyUtilities = lazy(
  () => import("../properties/EditPropertyUtilities"),
);
const EditPropertyAmenities = lazy(
  () => import("../properties/EditPropertyAmenities"),
);

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
    path: "/messages/add",
    element: <AddContacts />,
  },
  {
    path: "/properties",
    element: <Properties />,
  },
  {
    path: "/properties/:id",
    element: <PropertyDetail />,
  },
  {
    path: "/properties/:id/setup",
    element: <SetupListing />,
  },
  {
    path: "/properties/:id/setup-prompt",
    element: <SetupListingPrompt />,
  },
  {
    path: "/properties/:id/units",
    element: <PropertyUnits />,
  },
  {
    path: "/properties/:id/edit",
    element: <EditProperty />,
  },
  {
    path: "/properties/:id/edit-size",
    element: <EditPropertySize />,
  },
  {
    path: "/properties/:id/edit-address",
    element: <EditPropertyAddress />,
  },
  {
    path: "/properties/:id/edit-basics",
    element: <EditPropertyBasics />,
  },
  {
    path: "/properties/:id/edit-permissions",
    element: <EditPropertyPermissions />,
  },
  {
    path: "/properties/:id/edit-description",
    element: <EditPropertyDescription />,
  },
  {
    path: "/properties/:id/edit-utilities",
    element: <EditPropertyUtilities />,
  },
  {
    path: "/properties/:id/edit-amenities",
    element: <EditPropertyAmenities />,
  },
  {
    path: "/properties/marketing-extended",
    element: <MarketingExtended />,
  },
  {
    path: "/properties/add",
    element: <AddProperty />,
  },
  {
    path: "/calendar",
    element: <BookingCalendar />,
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
    element: <RentersLeads />,
  },
  {
    path: "/renters/leads",
    element: <RentersLeads />,
  },
  {
    path: "/renters/leads/:id",
    element: <RentersDetails />,
  },
  {
    path: "/renters/applicants",
    element: <Applicants />,
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
    element: <Tenants />,
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
    path: "/payments/daily-charge",
    element: <DailyCharge />,
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
