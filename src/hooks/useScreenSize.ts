import { useState, useEffect } from 'react';

// Breakpoints sesuai dengan Tailwind CSS default
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

type Breakpoint = keyof typeof breakpoints;

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<{
    width: number;
    height: number;
    breakpoint: Breakpoint;
  }>(() => {
    // Initialize with safe defaults
    if (typeof window === 'undefined') {
      return { width: 1024, height: 768, breakpoint: 'lg' };
    }

    const width = window.innerWidth || 1024;
    const height = window.innerHeight || 768;
    let breakpoint: Breakpoint = 'lg';

    if (width >= breakpoints['2xl']) breakpoint = '2xl';
    else if (width >= breakpoints.xl) breakpoint = 'xl';
    else if (width >= breakpoints.lg) breakpoint = 'lg';
    else if (width >= breakpoints.md) breakpoint = 'md';
    else breakpoint = 'sm';

    return { width, height, breakpoint };
  });

  useEffect(() => {
    const updateScreenSize = () => {
      if (typeof window === 'undefined') return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Tentukan breakpoint berdasarkan width
      let breakpoint: Breakpoint = 'sm';
      if (width >= breakpoints['2xl']) breakpoint = '2xl';
      else if (width >= breakpoints.xl) breakpoint = 'xl';
      else if (width >= breakpoints.lg) breakpoint = 'lg';
      else if (width >= breakpoints.md) breakpoint = 'md';
      else breakpoint = 'sm';

      setScreenSize({ width, height, breakpoint });
    };

    // Set initial values
    updateScreenSize();

    // Add event listener (only if window exists)
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateScreenSize);
    }

    // Cleanup
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateScreenSize);
      }
    };
  }, []);

  // Helper functions
  const isMobile = screenSize.width < breakpoints.md;
  const isTablet =
    screenSize.width >= breakpoints.md && screenSize.width < breakpoints.lg;
  const isDesktop = screenSize.width >= breakpoints.lg;
  const isSmallScreen = screenSize.width < breakpoints.sm;
  const isLargeScreen = screenSize.width >= breakpoints.xl;

  return {
    ...screenSize,
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen,
    isLargeScreen,
    // Utility functions
    isAtLeast: (bp: Breakpoint) => screenSize.width >= breakpoints[bp],
    isBelow: (bp: Breakpoint) => screenSize.width < breakpoints[bp],
  };
};
