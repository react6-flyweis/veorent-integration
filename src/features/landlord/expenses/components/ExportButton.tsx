import { useState } from "react";
import { ExternalLinkIcon, LoaderIcon } from "lucide-react";
import * as XLSX from "xlsx";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatDate } from "@/utils/formatDate";

interface ExportButtonProps {
  expenses: IExpense[];
  totalExpenses: number;
}

export const ExportButton = ({
  expenses,
  totalExpenses,
}: ExportButtonProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const isMobile = useIsMobile();

  const handleExportToExcel = async () => {
    if (!expenses?.length) {
      alert("No expenses data to export");
      return;
    }

    setIsExporting(true);

    try {
      // Add a small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Prepare data for Excel export
      const exportData = expenses
        .filter((e) => e.property)
        .map((expense) => ({
          Date: formatDate(expense.datePaid || "") || "",
          Description: expense.description || "",
          Notes: expense.notes || "",
          Rental: expense.property || "",
          Amount: expense.amountPaid?.toFixed(2) || "0.00",
        }));

      // Add total row
      exportData.push({
        Date: "",
        Description: "",
        Notes: "",
        Rental: "TOTAL",
        Amount: totalExpenses.toFixed(2),
      });

      // Create workbook and worksheet
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Expenses");

      // Generate filename with current date
      const currentDate = new Date().toISOString().split("T")[0];
      const filename = `expenses_${currentDate}.xlsx`;

      // Save file
      XLSX.writeFile(wb, filename);
    } catch (error) {
      console.error("Error exporting expenses:", error);
      alert("Failed to export expenses. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className="rounded-md bg-blue-500"
          size="sm"
          onClick={handleExportToExcel}
          disabled={isExporting}
        >
          {isExporting ? (
            <LoaderIcon className="size-4 animate-spin" />
          ) : (
            <ExternalLinkIcon className="size-4" />
          )}
          {!isMobile && (
            <span className="ml-2">
              {isExporting ? "EXPORTING..." : "EXPORT"}
            </span>
          )}
        </Button>
      </TooltipTrigger>
      {isMobile && (
        <TooltipContent>
          <p>{isExporting ? "Exporting..." : "Export"}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};
