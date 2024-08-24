import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        color01: "#7C5DFA", // Purple Dark
        color02: "#9277FF", // Purple light
        color03: "#1E2139", // Light Dark BG
        color04: "#252945", // Light Dark BG 2
        color05: "#DFE3FA", // Light Dark BG 3
        color06: "#888EB0", // Light Dark BG 4
        color07: "#7E88C3", // Light Dark BG 5
        color08: "#0C0E16", // Black BG
        color09: "#EC5757", // Red BG
        color10: "#FF9797", // Light Red BG
        color11: "#F8F8FB", // Light Gray BG
        color12: "#141625", // Dark BG
      },
      gridTemplateColumns: {
        // Définition de la grille "Item List"
        itemGrid: "1fr 54px 87px 50px 40px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      const newUtilities = {
        // Scrollbar pour le mode clair
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "#DFE3FA transparent",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#DFE3FA",
            borderRadius: "100px",
          },
        },

        // Scrollbar pour le mode sombre
        ".dark .scrollbar-thin": {
          scrollbarColor: "#252945 transparent",
        },
        ".dark .scrollbar-webkit": {
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#252945",
          },
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};

export default config;
