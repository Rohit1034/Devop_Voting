import { useEffect } from 'react';

const THEME = 'dark';

export const useTheme = () => {
  useEffect(() => {
    // Always apply dark theme to document
    document.documentElement.setAttribute('data-theme', THEME);
  }, []);

  return { theme: THEME };
};
