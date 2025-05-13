"use client";

import { useEffect, useState, useTransition } from "react";
import "./globals.css";

import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isPending) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isPending]);

  return (
      <html lang="en">
        <body
          className={`${notoSansKr.variable} antialiased text-[#212322]`}
        >
          {loading && (
            <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-black z-50">
              <div className="border-t-4 border-b-4 border-customYellow w-16 h-16 rounded-full animate-spin"/>
            </div>
          )}
          
          <div className="flex justify-center items-start min-h-screen dot-patter font text-xl">
            <div className="max-w-lg w-full min-h-screen border-2 bg-white py-10 px-8">
              {children}
            </div>
          </div>
        </body>
      </html>
  );
}

