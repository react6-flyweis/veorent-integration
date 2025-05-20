import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUserPreferenceStore } from "@/store/useUserPreferenceStore";

/**
 * A hook that provides a function to navigate back to the previous page.
 * Falls back to a default path based on user type if there's no previous page in history.
 * @param customFallbackPath Optional custom fallback path that overrides the default user type-based paths
 */
export function useGoBack(customFallbackPath?: string) {
  const navigate = useNavigate();
  const userType = useUserPreferenceStore((state) => state.userType);

  const goBack = useCallback(() => {
    // Determine the fallback path based on user type if no custom path is provided
    let fallbackPath = "/";

    if (!customFallbackPath) {
      if (userType === "landlord") {
        fallbackPath = "/landlord";
      } else if (userType === "tenant") {
        fallbackPath = "/tenant";
      }
    } else {
      fallbackPath = customFallbackPath;
    }

    // Check if there's history to go back to
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      // If no history, go to the determined fallback path
      navigate(fallbackPath);
    }
  }, [navigate, customFallbackPath, userType]);

  return goBack;
}
