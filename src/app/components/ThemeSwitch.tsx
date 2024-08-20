"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import sun from "../../../public/images/icon-sun.svg";
import moon from "../../../public/images/icon-moon.svg";

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
          <Image
            src={sun}
            alt="Image Sun"
            width={20}
            height={20}
            onClick={() => setTheme("light")}
          />
        </button>
      ) : (
        <button className={``} onClick={() => setTheme("dark")}>
          <Image
            src={moon}
            alt="Image Moon"
            width={20}
            height={20}
            onClick={() => setTheme("light")}
          />
        </button>
      )}
    </div>
  );
}
