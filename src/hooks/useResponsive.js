import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive behavior
 * Provides breakpoint detection and responsive utilities
 */
const useResponsive = () => {
  // Define breakpoints
  const breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400
  };

  // State for current screen size
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  // State for current breakpoint
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg');

  // State for device type detection
  const [deviceType, setDeviceType] = useState('desktop');

  // Update screen size and breakpoint
  const updateScreenSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    setScreenSize({ width, height });
    
    // Determine current breakpoint
    let breakpoint = 'xs';
    if (width >= breakpoints.xxl) breakpoint = 'xxl';
    else if (width >= breakpoints.xl) breakpoint = 'xl';
    else if (width >= breakpoints.lg) breakpoint = 'lg';
    else if (width >= breakpoints.md) breakpoint = 'md';
    else if (width >= breakpoints.sm) breakpoint = 'sm';
    
    setCurrentBreakpoint(breakpoint);
    
    // Determine device type
    if (width < breakpoints.md) {
      setDeviceType('mobile');
    } else if (width < breakpoints.lg) {
      setDeviceType('tablet');
    } else {
      setDeviceType('desktop');
    }
  };

  useEffect(() => {
    // Initial update
    updateScreenSize();
    
    // Add event listener
    window.addEventListener('resize', updateScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Utility functions
  const isMobile = currentBreakpoint === 'xs' || currentBreakpoint === 'sm';
  const isTablet = currentBreakpoint === 'md';
  const isDesktop = currentBreakpoint === 'lg' || currentBreakpoint === 'xl' || currentBreakpoint === 'xxl';
  
  // Check if screen is at least a certain breakpoint
  const isMinWidth = (breakpoint) => {
    return screenSize.width >= breakpoints[breakpoint];
  };
  
  // Check if screen is at most a certain breakpoint
  const isMaxWidth = (breakpoint) => {
    return screenSize.width <= breakpoints[breakpoint];
  };
  
  // Check if screen is between two breakpoints
  const isBetween = (minBreakpoint, maxBreakpoint) => {
    return screenSize.width >= breakpoints[minBreakpoint] && 
           screenSize.width <= breakpoints[maxBreakpoint];
  };

  // Get responsive value based on current breakpoint
  const getResponsiveValue = (values) => {
    // Values should be an object with breakpoint keys
    // e.g., { xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }
    
    const sortedBreakpoints = Object.keys(breakpoints).sort((a, b) => 
      breakpoints[b] - breakpoints[a]
    );
    
    for (const bp of sortedBreakpoints) {
      if (values[bp] !== undefined && screenSize.width >= breakpoints[bp]) {
        return values[bp];
      }
    }
    
    // Fallback to the smallest breakpoint value
    return values[Object.keys(values)[0]];
  };

  // Get columns for responsive grid
  const getGridColumns = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    if (currentBreakpoint === 'lg') return 3;
    return 4;
  };

  // Get chart height based on screen size
  const getChartHeight = () => {
    if (isMobile) return 250;
    if (isTablet) return 300;
    return 350;
  };

  // Get sidebar width
  const getSidebarWidth = () => {
    if (isMobile) return '100%';
    if (isTablet) return '250px';
    return '280px';
  };

  // Check if sidebar should be collapsed by default
  const shouldCollapseSidebar = () => {
    return isMobile || isTablet;
  };

  // Get font sizes
  const getFontSize = (variant = 'body') => {
    const fontSizes = {
      h1: getResponsiveValue({ xs: '1.75rem', sm: '2rem', md: '2.25rem', lg: '2.5rem', xl: '2.75rem' }),
      h2: getResponsiveValue({ xs: '1.5rem', sm: '1.75rem', md: '2rem', lg: '2.25rem', xl: '2.5rem' }),
      h3: getResponsiveValue({ xs: '1.25rem', sm: '1.5rem', md: '1.75rem', lg: '2rem', xl: '2.25rem' }),
      h4: getResponsiveValue({ xs: '1.125rem', sm: '1.25rem', md: '1.5rem', lg: '1.75rem', xl: '2rem' }),
      h5: getResponsiveValue({ xs: '1rem', sm: '1.125rem', md: '1.25rem', lg: '1.5rem', xl: '1.75rem' }),
      h6: getResponsiveValue({ xs: '0.875rem', sm: '1rem', md: '1.125rem', lg: '1.25rem', xl: '1.5rem' }),
      body: getResponsiveValue({ xs: '0.875rem', sm: '1rem', md: '1rem', lg: '1rem', xl: '1.125rem' }),
      small: getResponsiveValue({ xs: '0.75rem', sm: '0.875rem', md: '0.875rem', lg: '0.875rem', xl: '1rem' }),
    };
    
    return fontSizes[variant] || fontSizes.body;
  };

  // Get spacing values
  const getSpacing = (size = 'md') => {
    const spacing = {
      xs: getResponsiveValue({ xs: '0.25rem', sm: '0.5rem', md: '0.5rem', lg: '0.75rem', xl: '1rem' }),
      sm: getResponsiveValue({ xs: '0.5rem', sm: '0.75rem', md: '1rem', lg: '1.25rem', xl: '1.5rem' }),
      md: getResponsiveValue({ xs: '1rem', sm: '1.25rem', md: '1.5rem', lg: '2rem', xl: '2.5rem' }),
      lg: getResponsiveValue({ xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem', xl: '3.5rem' }),
      xl: getResponsiveValue({ xs: '2rem', sm: '2.5rem', md: '3rem', lg: '4rem', xl: '5rem' }),
    };
    
    return spacing[size] || spacing.md;
  };

  return {
    // Screen information
    screenSize,
    currentBreakpoint,
    deviceType,
    
    // Device type checks
    isMobile,
    isTablet,
    isDesktop,
    
    // Breakpoint utilities
    isMinWidth,
    isMaxWidth,
    isBetween,
    
    // Responsive values
    getResponsiveValue,
    getGridColumns,
    getChartHeight,
    getSidebarWidth,
    shouldCollapseSidebar,
    getFontSize,
    getSpacing,
    
    // Breakpoints reference
    breakpoints
  };
};

export default useResponsive;