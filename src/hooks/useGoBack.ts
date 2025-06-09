import { useCallback } from "react";
import type { MouseEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAuthStore } from "@/store/useAuthStore";

/**
 * A hook that provides a function to navigate back to the previous page.
 * Falls back to a default path based on user type if there's no previous page in history.
 * @param customFallbackPath Optional custom fallback path that overrides the default user type-based paths
 */
export function useGoBack(customFallbackPath?: string) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  const userType = user?.userType || "guest";

  const goBack = useCallback(
    (eventOrSteps?: MouseEvent<HTMLButtonElement> | number) => {
      let stepsToGoBack = 1;

      // Check if the argument is a number
      if (typeof eventOrSteps === "number") {
        stepsToGoBack = eventOrSteps;
      }

      // Determine the fallback path based on user type if no custom path is provided
      let fallbackPath = "/";

      if (!customFallbackPath) {
        if (userType === "PARTNER") {
          fallbackPath = "/landlord";
        } else if (userType === "USER") {
          fallbackPath = "/tenant";
        }
      } else {
        fallbackPath = customFallbackPath;
      }

      if (location.key === "default") {
        // If there's no history (user navigated directly to this page)
        navigate(fallbackPath);
      } else {
        try {
          // For multiple steps back, use browser's history API
          if (Math.abs(stepsToGoBack) > 1) {
            // Set up a fallback timer in case history navigation fails
            const fallbackTimer = setTimeout(() => {
              navigate(fallbackPath);
            }, 100);

            // Listen for popstate to clear the timer if navigation succeeds
            const handlePopState = () => {
              clearTimeout(fallbackTimer);
              window.removeEventListener("popstate", handlePopState);
            };

            window.addEventListener("popstate", handlePopState);
            window.history.go(stepsToGoBack);
          } else {
            // For single step, use React Router
            navigate(-stepsToGoBack);
          }
        } catch (error) {
          console.error("Navigation error:", error);
          navigate(fallbackPath);
        }
      }
    },
    [navigate, customFallbackPath, userType, location.key],
  );

  return goBack;
}
