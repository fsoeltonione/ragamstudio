import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

import { supabase } from "@/lib/supabase";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await supabase.from("system_settings").select("key_name, value_text").eq("category", "SEO");
  const title = data?.find(s => s.key_name === 'meta_title')?.value_text || "Dashboard - RagamStudio";
  const desc = data?.find(s => s.key_name === 'meta_desc')?.value_text || "Admin panel for RagamStudio";
  return { title, description: desc };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#F9FAFB] text-gray-900 flex h-screen overflow-hidden`}
      >
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
