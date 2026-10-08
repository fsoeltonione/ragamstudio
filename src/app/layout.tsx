import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { supabase } from "@/lib/supabase";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await supabase.from("system_settings").select("key_name, value_text").eq("category", "SEO");
  const title = data?.find(s => s.key_name === 'meta_title')?.value_text || "RagamStudio | Pilates & Yoga";
  const desc = data?.find(s => s.key_name === 'meta_desc')?.value_text || "Official website of RagamStudio";
  return { title, description: desc };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
