import axios from "axios";
import type { AxiosError } from "axios";

// error can be from axios , react-query or simple error
export function getErrorMessage(error: AxiosError | Error | unknown): string {
  if (axios.isAxiosError(error)) {
    // Handle Axios error
    return (
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred"
    );
  } else if (error instanceof Error) {
    // Handle generic Error
    return error.message || "An unexpected error occurred";
  } else {
    // Fallback for any other type of error
    return "An unexpected error occurred";
  }
}
