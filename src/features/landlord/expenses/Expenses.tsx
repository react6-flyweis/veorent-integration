import { CreateButton } from "@/components/CreateButton";
import { CurrencyIcon } from "@/components/CurrencyIcon";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDaysIcon,
  ExternalLinkIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import { useState } from "react";
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
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
          className="rounded-md"
          size="sm"
        >
          <LayoutDashboardIcon className="size-4" />
          <span>All Categories</span>
        </Button>
        <Button
          variant={timeFilter === "All Time" ? "default" : "outline"}
          onClick={() => setTimeFilter("All Time")}
          className="rounded-md"
          size="sm"
        >
          <CalendarDaysIcon className="size-4" />
          <span>All Time</span>
        </Button>
        <div className="ml-auto">
          <Button className="rounded-md bg-blue-500" size="sm">
            <ExternalLinkIcon />
            <span>EXPORT</span>
          </Button>
        </div>
      </div>

      <Card className="gap-0 overflow-hidden p-0">
        <CardHeader className="my-0 px-0 shadow">
          <div className="grid grid-cols-4 p-3 text-sm font-medium">
            <div>DATE</div>
            <div>CATEGORY & DESCRIPTION</div>
            <div>RENTAL</div>
            <div className="flex items-center gap-1">
              TOTAL <CurrencyIcon /> {totalExpenses.toFixed(2)}
            </div>
          </div>
          <Separator className="my-0" />
        </CardHeader>

        <CardContent className="p-0">
          {expenses.map((expense) => (
            <div key={expense.id}>
              <div className="grid grid-cols-4 items-center p-4">
                <div className="text-gray-600">{expense.date}</div>
                <div className="text-lg font-medium">{expense.description}</div>
                <div className="text-blue-500 underline">{expense.rental}</div>
                <div className="flex items-center gap-1 text-lg font-medium">
                  <CurrencyIcon />
                  {expense.amount.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Expenses;
