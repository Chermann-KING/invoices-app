"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import SunIcon from "../../../public/images/icon-sun.svg";
import MoonIcon from "../../../public/images/icon-moon.svg";

export default function ThemeSwitch() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="flex justify-center">
      {currentTheme === "dark" ? (
        <button className={``} onClick={() => setTheme("light")}>
          <SunIcon />
        </button>
      ) : (
        <button className={``} onClick={() => setTheme("dark")}>
          <MoonIcon />
        </button>
      )}
    </div>
  );
}
