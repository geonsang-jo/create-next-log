"use client";

import { ThemeProvider as NextTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextTheme {...props}>{children}</NextTheme>;
}

export default ThemeProvider;
