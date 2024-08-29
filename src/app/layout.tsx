import Head from "next/head";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import { ProviderTheme } from "./providers";
import Sidebar from "./components/shared/sidebar/Sidebar";
import { SidebarProvider } from "./context/SidebarContext";

const LeagueSpartan = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invoice App",
  description: "The invoicing app project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${LeagueSpartan.className} bg-color11 dark:bg-color12 flex`}
      >
        <ProviderTheme>
          <SidebarProvider>
            <Sidebar>{children}</Sidebar>
          </SidebarProvider>
        </ProviderTheme>
      </body>
    </html>
  );
}
