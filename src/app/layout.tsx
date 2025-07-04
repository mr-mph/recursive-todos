import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recursive Todos",
  description: "Recursive Todos app by mr_mph",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`lg:mx-[15%] lg:bg-gray-200 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>
          <NavBar />
          <div className="mx-5 my-5">{children}</div>
        </div>
      </body>
    </html>
  );
}
