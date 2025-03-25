"use client";

import React, { useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>; // Avoid rendering theme-related components until mounted
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
