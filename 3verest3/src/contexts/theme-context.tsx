'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [theme, setThemeState] = useState<Theme>('dark');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Determine theme based on current route
  useEffect(() => {
    const lightPages = ['/about', '/contact'];
    const newTheme = lightPages.includes(pathname) ? 'light' : 'dark';

    if (newTheme !== theme) {
      setIsTransitioning(true);
      setThemeState(newTheme);

      // Transition duration matches our animation
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    }
  }, [pathname, theme]);

  const setTheme = (newTheme: Theme) => {
    if (newTheme !== theme) {
      setIsTransitioning(true);
      setThemeState(newTheme);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
