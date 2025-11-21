import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Only Facts",
  description: "Say it without saying it. Anonymous messaging platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#ff4d6d" },
      }}
    >
      <html lang="en">
        <body
          className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-[#0f0f0f] text-white`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
