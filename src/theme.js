import React, { createContext, useContext, useMemo } from 'react';

export const THEME_MODES = {
  light: 'light',
  amoled: 'amoled',
};

const LIGHT_COLORS = {
  mode: THEME_MODES.light,
  isDark: false,
  background: '#FFFFFF',
  topBand: '#F6F8FC',
  surface: '#FFFFFF',
  surfaceStrong: '#F4F7FB',
  surfaceMuted: '#EEF3F7',
  paper: '#101826',
  paperSoft: '#526170',
  mutedText: '#7A8794',
  line: '#E5EBF2',
  mint: '#0E9B71',
  mintSoft: '#DDF7EE',
  orange: '#DE8540',
  gold: '#D9A328',
  red: '#E46B58',
  blue: '#2F7FEA',
  onAccent: '#08130D',
  white: '#FFFFFF',
  black: '#000000',
  statusBar: '#FFFFFF',
  statusBarStyle: 'dark-content',
};

const AMOLED_COLORS = {
  mode: THEME_MODES.amoled,
  isDark: true,
  background: '#000000',
  topBand: '#080808',
  surface: '#050505',
  surfaceStrong: '#0F0F0F',
  surfaceMuted: '#141414',
  paper: '#F5F7FA',
  paperSoft: '#CDD4DD',
  mutedText: '#8C97A5',
  line: '#1A1A1A',
  mint: '#7BD4A8',
  mintSoft: '#091610',
  orange: '#F0A15D',
  gold: '#E5BE60',
  red: '#F07B66',
  blue: '#74AEF8',
  onAccent: '#041009',
  white: '#FFFFFF',
  black: '#000000',
  statusBar: '#000000',
  statusBarStyle: 'light-content',
};

function createThemeValue(themeMode) {
  return themeMode === THEME_MODES.amoled ? AMOLED_COLORS : LIGHT_COLORS;
}

const AppThemeContext = createContext({
  colors: LIGHT_COLORS,
  themeMode: THEME_MODES.light,
  setThemeMode: () => {},
  toggleTheme: () => {},
});

export function AppThemeProvider({ children, themeMode, setThemeMode }) {
  const colors = useMemo(() => createThemeValue(themeMode), [themeMode]);

  const toggleTheme = () => {
    setThemeMode(
      themeMode === THEME_MODES.light ? THEME_MODES.amoled : THEME_MODES.light
    );
  };

  const value = useMemo(
    () => ({
      colors,
      themeMode,
      setThemeMode,
      toggleTheme,
    }),
    [colors, setThemeMode, themeMode]
  );

  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
}

export function useAppTheme() {
  return useContext(AppThemeContext);
}

export function getThemeColors(themeMode) {
  return createThemeValue(themeMode);
}

export function withAlpha(hex, alpha) {
  const value = hex.replace('#', '');
  const safe = value.length === 3
    ? value.split('').map((part) => part + part).join('')
    : value;

  const r = parseInt(safe.slice(0, 2), 16);
  const g = parseInt(safe.slice(2, 4), 16);
  const b = parseInt(safe.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
