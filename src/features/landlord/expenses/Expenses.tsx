import { CreateButton } from "@/components/CreateButton";
import { CurrencyIcon } from "@/components/CurrencyIcon";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CalendarDaysIcon,
  ExternalLinkIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import CreateExpense from "./CreateExpense";

interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  rental: string;
  amount: number;
}

const Expenses = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<string | null>("All Time");
  const isMobile = useIsMobile();

  const expenses: Expense[] = [
    {
      id: "1",
      date: "Jan 08, 2024",
      category: "Advertising",
      description: "Advertising",
      rental: "123, Main St",
      amount: 100.0,
    },
    // Add more mock expenses here as needed
  ];

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageTitle title="Expenses" className="mb-0" />
        <Dialog>
          <DialogTrigger asChild>
            <CreateButton label="Add New Expense" />
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Record Expense</DialogTitle>
            <CreateExpense />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="rounded-md"
              size="sm"
            >
              <LayoutDashboardIcon className="size-4" />
              {!isMobile && <span>All Categories</span>}
            </Button>
          </TooltipTrigger>
          {isMobile && (
            <TooltipContent>
              <p>All Categories</p>
            </TooltipContent>
          )}
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={timeFilter === "All Time" ? "default" : "outline"}
              onClick={() => setTimeFilter("All Time")}
              className="rounded-md"
              size="sm"
            >
              <CalendarDaysIcon className="size-4" />
              {!isMobile && <span>All Time</span>}
            </Button>
          </TooltipTrigger>
          {isMobile && (
            <TooltipContent>
              <p>All Time</p>
            </TooltipContent>
          )}
        </Tooltip>
        <div className="ml-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="rounded-md bg-blue-500" size="sm">
                <ExternalLinkIcon />
                {!isMobile && <span>EXPORT</span>}
              </Button>
            </TooltipTrigger>
            {isMobile && (
              <TooltipContent>
                <p>Export</p>
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </div>

      <Card className="gap-0 overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow className="shadow bg-background">
              <TableHead className="p-3 text-sm font-medium">DATE</TableHead>
              <TableHead className="p-3 text-sm font-medium">CATEGORY & DESCRIPTION</TableHead>
              <TableHead className="p-3 text-sm font-medium">RENTAL</TableHead>
              <TableHead className="p-3 text-sm font-medium">
                <div className="flex items-center gap-1">
                  TOTAL <CurrencyIcon /> {totalExpenses.toFixed(2)}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="text-gray-600 p-4">{expense.date}</TableCell>
                <TableCell className="text-lg font-medium p-4">{expense.description}</TableCell>
                <TableCell className="text-blue-500 underline p-4">{expense.rental}</TableCell>
                <TableCell className="p-4">
                  <div className="flex items-center gap-1 text-lg font-medium">
                    <CurrencyIcon />
                    {expense.amount.toFixed(2)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Expenses;
