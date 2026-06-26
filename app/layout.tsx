import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import IntroProvider from "./components/IntroProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const gillune = localFont({
  variable: "--font-gillune",
  display: "swap",
  src: [
    { path: "../public/gillune-thin-italic.otf", weight: "100", style: "italic" },
    { path: "../public/gillune-light.otf", weight: "300", style: "normal" },
    { path: "../public/gillune-light-italic.otf", weight: "300", style: "italic" },
    { path: "../public/gillune-regular.otf", weight: "400", style: "normal" },
    { path: "../public/gillune-italic.otf", weight: "400", style: "italic" },
    { path: "../public/gillune-medium.otf", weight: "500", style: "normal" },
    { path: "../public/gillune-semibold.otf", weight: "600", style: "normal" },
    { path: "../public/gillune-semibold-italic.otf", weight: "600", style: "italic" },
    { path: "../public/gillune-bold.otf", weight: "700", style: "normal" },
    { path: "../public/gillune-bold-italic.otf", weight: "700", style: "italic" },
  ],
});

export const metadata: Metadata = {
  title: "Hyerr | Far feels closer",
  description:
    "Hyerr is a journey-first, EV-powered mobility system designed for how drives should feel.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${gillune.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cloud text-ink">
        <IntroProvider>{children}</IntroProvider>
      </body>
    </html>
  );
}
