import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar1, Home, Search, Star, ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import { CreateButton } from "@/components/CreateButton";
import { PageTitle } from "@/components/PageTitle";

interface MaintenanceIssue {
  id: string;
  date: string;
  title: string;
  rental: {
    address: string;
    link: string;
  };
  lastActivity: string;
  status: "Open" | "In Progress" | "Completed";
}

const demoData: MaintenanceIssue[] = [
  {
    id: "1",
    date: "Jan 08, 2024",
    title: "Plumbing",
    rental: {
      address: "123, Main St.",
      link: "/rentals/123",
    },
    lastActivity: "Jan 08, 2024 3:04pm",
    status: "Open",
  },
];

export default function Maintenance() {
  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-between">
        <PageTitle title="Maintenance" className="mb-0" />
        <Link to="create">
          <CreateButton label="Create Request" />
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Tabs defaultValue="all-time" className="flex-1">
          <TabsList className="flex flex-col items-start gap-2 border-0 @lg:flex-row">
            <div className="flex gap-2">
              <TabsTrigger
                value="all-time"
                className="flex h-8 items-center bg-blue-100 font-semibold text-gray-700"
              >
                <Calendar1 className="size-5 text-gray-700" />
                <span className="hidden align-bottom @md:block"> All Time</span>
              </TabsTrigger>
              <TabsTrigger
                value="rentals"
                className="flex h-8 items-center bg-blue-100 font-semibold text-gray-700"
              >
                <Home className="size-5 text-gray-700" />
                <span className="hidden align-bottom @md:block"> Rentals</span>
              </TabsTrigger>
              <TabsTrigger
                value="all-status"
                className="flex h-8 items-center bg-blue-100 font-semibold text-gray-700"
              >
                <ClipboardList className="size-5 text-gray-700" />
                <span className="hidden align-bottom @md:block">
                  All Status
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="starred"
                className="flex h-8 items-center bg-blue-100 font-semibold text-gray-700"
              >
                <Star className="size-5 text-gray-700" />
                <span className="hidden align-bottom @md:block"> Starred</span>
              </TabsTrigger>
            </div>
            <div className="focus-within-within:ring-2 focus-within-within:ring-blue-500 flex h-8 w-32 items-center justify-center rounded-md border px-1">
              <Search className="size-5 text-gray-500" />
              <Input
                type="search"
                placeholder="Search"
                className="h-5 border-0 shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none"
              />
            </div>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">
          Keep Track of Maintenance Issues
        </h2>
        <div className="rounded-xl border shadow-md">
          <Table>
            <TableHeader className="">
              <TableRow className="font-medium">
                <TableHead className="">DATE</TableHead>
                <TableHead className="font-medium">TITLE</TableHead>
                <TableHead className="font-medium">RENTAL</TableHead>
                <TableHead className="font-medium">LAST ACTIVITY</TableHead>
                <TableHead className="font-medium">STATUS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoData.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-semibold">{issue.date}</TableCell>
                  <TableCell className="text-primary text-xl font-bold">
                    {issue.title}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={issue.rental.link}
                      className="text-lg text-blue-500 underline"
                    >
                      {issue.rental.address}
                    </Link>
                  </TableCell>
                  <TableCell className="text-base">
                    {issue.lastActivity}
                  </TableCell>
                  <TableCell>
                    <Badge>{issue.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
