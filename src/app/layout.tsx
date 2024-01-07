import "@/styles/globals.css";
import Header from "@/_components/Header";
import Providers from "@/utils/providers";
import SideNav from "@/components/SideNav";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "DBaN",
  description: "Database and Next.js",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Providers>
          <div className="container flex min-h-screen gap-6 py-16">
            <Header />
            <SideNav />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
