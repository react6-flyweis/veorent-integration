import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CalendarDaysIcon, LayoutDashboardIcon } from "lucide-react";

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
import { useIsMobile } from "@/hooks/use-mobile";

import { useGetExpenses } from "./api/queries";
import { CreateExpense } from "./components/CreateExpense";
import { ExportButton } from "./components/ExportButton";

const Expenses = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<string | null>("All Time");
  const isMobile = useIsMobile();

  const { data: expenses = [] } = useGetExpenses();

  const totalExpenses = expenses.reduce(
    (total, expense) => total + (expense.amountPaid || 0),
    0,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageTitle title={t("expenses")} className="mb-0" />
        <Dialog>
          <DialogTrigger asChild>
            <CreateButton label="Add New Expense" />
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
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
          <ExportButton expenses={expenses} totalExpenses={totalExpenses} />
        </div>
      </div>

      <Card className="gap-0 overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-background shadow">
              <TableHead className="p-3 text-sm font-medium">DATE</TableHead>
              <TableHead className="p-3 text-sm font-medium">
                CATEGORY & DESCRIPTION
              </TableHead>
              <TableHead className="p-3 text-sm font-medium">RENTAL</TableHead>
              <TableHead className="p-3 text-sm font-medium">
                <div className="flex items-center gap-1">
                  TOTAL <CurrencyIcon /> {totalExpenses.toFixed(2)}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses?.length ? (
              expenses
                .filter((e) => e.property)
                .map((expense) => (
                  <TableRow key={expense._id}>
                    <TableCell className="p-4 text-gray-600">
                      {expense.datePaid || ""}
                    </TableCell>
                    <TableCell className="p-4 text-lg font-medium">
                      {expense.description}
                    </TableCell>
                    <TableCell className="p-4 text-blue-500 underline">
                      {expense.property || ""}
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex items-center gap-1 text-lg font-medium">
                        <CurrencyIcon />
                        {expense.amountPaid?.toFixed(2)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="p-4 text-center text-gray-500"
                >
                  No expenses recorded.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Expenses;
