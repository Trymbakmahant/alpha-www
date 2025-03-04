import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/main/StarBackground";

import AuthProvider from "./providers/SessionProvider";

import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Send Arcade Alpha",
  description: "Low-Code Solana, High-Speed Innovation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden relative`}
      >
        <div className="fixed inset-0 z-[-1]">
          <StarsCanvas />
        </div>
        <Providers>
          <AuthProvider>
            <main className="relative z-[1]"> {children}</main>
            {/* <Footer /> */}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
