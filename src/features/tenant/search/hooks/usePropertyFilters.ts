import { useState, useCallback } from "react";

export const usePropertyFilters = () => {
  const [filters, setFilters] = useState<IPropertyFilters>({});

  const updateFilter = useCallback(
    (
      key: keyof IPropertyFilters,
      value: IPropertyFilters[keyof IPropertyFilters],
    ) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
        page: key !== "page" ? 1 : (value as number), // Reset to page 1 when filters change
      }));
    },
    [],
  );

  const updateMultipleFilters = useCallback(
    (newFilters: Partial<IPropertyFilters>) => {
      setFilters((prev) => ({
        ...prev,
        ...newFilters,
        page: 1, // Reset to page 1 when filters change
      }));
    },
    [],
  );

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const resetPagination = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
    }));
  }, []);

  return {
    filters,
    updateFilter,
    updateMultipleFilters,
    clearFilters,
    resetPagination,
  };
};
