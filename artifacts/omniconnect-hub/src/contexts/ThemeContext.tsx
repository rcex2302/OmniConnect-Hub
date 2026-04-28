import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  BRAND_THEMES,
  DEFAULT_THEME_ID,
  getThemeById,
  type BrandTheme,
} from "@/lib/themes";

interface ThemeContextValue {
  theme: BrandTheme;
  themeId: string;
  setTheme: (id: string) => void;
  themes: BrandTheme[];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "omniconnect.brand-theme";

function applyThemeToRoot(theme: BrandTheme) {
  const root = document.documentElement;
  // Smooth color transitions
  root.style.setProperty("--theme-primary", theme.primary);
  root.style.setProperty("--theme-secondary", theme.secondary);
  root.style.setProperty("--theme-accent", theme.accent);
  root.style.setProperty("--theme-glow", theme.glow);
  root.style.setProperty("--theme-primary-rgb", theme.primaryRgb);
  root.style.setProperty("--theme-secondary-rgb", theme.secondaryRgb);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<string>(() => {
    if (typeof window === "undefined") return DEFAULT_THEME_ID;
    try {
      return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_THEME_ID;
    } catch {
      return DEFAULT_THEME_ID;
    }
  });

  const theme = useMemo(() => getThemeById(themeId), [themeId]);

  // Apply on mount + every change
  useEffect(() => {
    applyThemeToRoot(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme.id);
    } catch {
      // ignore quota / privacy mode
    }
  }, [theme]);

  const setTheme = useCallback((id: string) => setThemeId(id), []);

  const value = useMemo(
    () => ({ theme, themeId, setTheme, themes: BRAND_THEMES }),
    [theme, themeId, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return ctx;
}
