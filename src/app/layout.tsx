import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import { ProviderTheme } from "./providers";
import Sidebar from "./components/shared/sidebar/sidebar";

// const inter = Inter({ subsets: ["latin"] });
const LeagueSpartan = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invoice App",
  description: "The invoicing app project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${LeagueSpartan.className} bg-color11 dark:bg-color12 flex`}
      >
        <ProviderTheme>
          <Sidebar>{children}</Sidebar>
        </ProviderTheme>
      </body>
    </html>
  );
}
