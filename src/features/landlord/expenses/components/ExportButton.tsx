import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";

import { LoadingButton } from "@/components/ui/loading-button";
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
  const { t } = useTranslation();
  const [isExporting, setIsExporting] = useState(false);
  const isMobile = useIsMobile();

  const handleExportToExcel = async () => {
    if (!expenses?.length) {
      alert(t("noExpensesDataToExport"));
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
      alert(t("failedToExportExpenses"));
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <LoadingButton
          className="rounded-md bg-blue-500"
          size="sm"
          onClick={handleExportToExcel}
          isLoading={isExporting}
        >
          {!isMobile && <span className="ml-2">{t("export")}</span>}
        </LoadingButton>
      </TooltipTrigger>
      {isMobile && (
        <TooltipContent>
          <p>{t("export")}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};
