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
    path: "messages",
    element: <Messages />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
