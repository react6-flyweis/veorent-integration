import * as React from "react";

const MOBILE_BREAKPOINT = 768; // 0px - 767px
const TABLET_BREAKPOINT = 1024; // 768px - 1023px
// Desktop: 1024px+

export type ScreenSize = "mobile" | "tablet" | "desktop";

export function useScreenSize() {
  const [screenSize, setScreenSize] = React.useState<ScreenSize | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < MOBILE_BREAKPOINT) {
        setScreenSize("mobile");
      } else if (width < TABLET_BREAKPOINT) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    const mql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`);
    mql.addEventListener("change", updateScreenSize);
    updateScreenSize();

    return () => mql.removeEventListener("change", updateScreenSize);
  }, []);

  return screenSize;
}

export function useIsMobile() {
  const screenSize = useScreenSize();
  return screenSize === "mobile";
}

export function useIsTablet() {
  const screenSize = useScreenSize();
  return screenSize === "tablet";
}

export function useIsDesktop() {
  const screenSize = useScreenSize();
  return screenSize === "desktop";
}
