import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Palkar One",
  description: "Palkar One",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <ClerkProvider >
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="Sourashtra Business Directory, All in one page for Palkars "/>
  		    <meta name="keywords" content="palkarone, palkar.one, sourashtra directory, palkar directory, palkar one, palkar businesses, palkar websites"/>
  		    <meta name="author" content="Palkar One"/>
        </head>
        <body
          className={`min-h-screen flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster position="bottom-left"/>
          <header className="border-b sticky top-0 bg-white z-50">
            <Header />
          </header>

          <div className="bg-[#F4F2ED] flex-1 w-full">

            <main className="max-w-6xl mx-auto">
            <div className="border text-center bg-slate-400">
              <p className="text-sm">This site is in beta testing mode and still under development. Contact palkar.one admin (9962061030) if you want to add and approve the listings before general availability</p>
            </div>

              {children}
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
    
  );
}
