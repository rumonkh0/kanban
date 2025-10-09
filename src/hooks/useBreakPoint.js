import { useState, useEffect } from "react";

// Define standard Tailwind breakpoints
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * Hook to determine if the current viewport size meets or exceeds a specific Tailwind breakpoint.
 * @param {string} breakpoint - The breakpoint key (e.g., 'md', 'lg').
 * @returns {boolean} True if the screen width is >= the breakpoint size.
 */
export const useBreakpoint = (breakpoint) => {
  const minWidth = BREAKPOINTS[breakpoint] || 0;

  // Initialize with the current window width on the client side
  const [isMatch, setIsMatch] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= minWidth;
    }
    return false; // Default to false on server/initial render
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setIsMatch(window.innerWidth >= minWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [minWidth]);

  return isMatch;
};
