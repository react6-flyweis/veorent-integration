import { useMutation } from "@tanstack/react-query";
import { axiosLandlord } from "../../api/axios";

export const useCreateExpenseMutation = () => {
  return useMutation({
    mutationFn: (data: ICreateExpenseData) =>
      axiosLandlord.post<IResponse<IExpense>>("/expenses", data),
  });
};
