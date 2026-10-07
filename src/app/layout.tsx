import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

import { supabase } from "@/lib/supabase";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await supabase.from("system_settings").select("key_name, value_text").eq("category", "SEO");
  const title = data?.find(s => s.key_name === 'meta_title')?.value_text || "Dashboard - RagamStudio";
  const desc = data?.find(s => s.key_name === 'meta_desc')?.value_text || "Admin panel for RagamStudio";
  return { title, description: desc };
}

import { AppLayout } from "@/components/layout/AppLayout";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await supabase.from("system_settings").select("*");
  const studioName = data?.find(s => s.key_name === 'studio_name')?.value_text || 'RagamStudio';
  const announcementText = data?.find(s => s.key_name === 'announcement_text')?.value_text;
  const announcementLink = data?.find(s => s.key_name === 'announcement_link')?.value_text;
  
  const initialTopbarProps = { studioName, announcementText, announcementLink };

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-[#F9FAFB] text-gray-900`}>
        <AppLayout initialTopbarProps={initialTopbarProps}>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
