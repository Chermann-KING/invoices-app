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
      borderRadius: {
        "custom-rtb": " 0px 20px 20px 0px", // Coin supéreiru et inférieur droit
        "custom-blr": "0px 0px 20px 20px", // Coin inférieur gauche droit
        "custom-none": "0px 0px 0px 0px", // 4 Coins
      },
      gridTemplateColumns: {
        // Définition de la grille "Item List"
        itemGrid: "1fr 54px 87px 50px 40px",
      },
    },
  },
  plugins: [],
};

export default config;
