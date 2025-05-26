import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserPreferenceStore } from "@/store/useUserPreferenceStore";

/**
 * A hook that provides a function to navigate back to the previous page.
 * Falls back to a default path based on user type if there's no previous page in history.
 * @param customFallbackPath Optional custom fallback path that overrides the default user type-based paths
 */
export function useGoBack(customFallbackPath?: string) {
  const navigate = useNavigate();
  const location = useLocation();
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

    if (location.key === "default") {
      // If there's no history (user navigated directly to this page)
      navigate(fallbackPath);
    } else {
      // Go back in the navigation history
      navigate(-1);
    }
  }, [navigate, customFallbackPath, userType, location.key]);

  return goBack;
}
