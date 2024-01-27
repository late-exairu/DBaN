import "@/styles/globals.css";
import Header from "@/_components/Header";
import Providers from "@/utils/providers";
import SideNav from "@/components/SideNav";
import Footer from "@/components/Footer";
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
          <Header />

          <div className="container flex min-w-[380px] gap-6 pb-10 pt-16">
            <SideNav />
            {children}
          </div>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
