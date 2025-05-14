import Dashboard from "@/pages/Dashboard";
import Messages from "@/features/messages/Messages";
import { type RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
];
