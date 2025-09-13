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
  }>({
    width: 0,
    height: 0,
    breakpoint: 'sm',
  });

  useEffect(() => {
    const updateScreenSize = () => {
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

    // Add event listener
    window.addEventListener('resize', updateScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', updateScreenSize);
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
