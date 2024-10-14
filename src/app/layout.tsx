import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import Sidebar from "@/app/components/Sidebar";
import { ProviderTheme } from "@/app/providers";

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
        className={`${LeagueSpartan.className} bg-color11 dark:bg-color12 h-screen flex flex-col md:flex-row`}
      >
        <ProviderTheme>
          {/* LEFT or TOP */}
          <Sidebar />
          {/* RIGHT or BOTTOM */}
          <div className="w-full overflow-y-scroll flex flex-col items-center px-4 md:px-10">
            <div className="max-w-[1060px] pb-12 sm:pb-0">{children}</div>
          </div>
        </ProviderTheme>
      </body>
    </html>
  );
}
