import { supabase } from "@/lib/supabase";
import { AppLayout } from "@/components/layout/AppLayout";

export default async function AdminLayout({
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
    <div className="bg-[#F9FAFB] min-h-screen">
      <AppLayout initialTopbarProps={initialTopbarProps}>
        {children}
      </AppLayout>
    </div>
  );
}
