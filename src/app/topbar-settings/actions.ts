"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function saveTopbarSettings(formData: FormData) {
  const text = formData.get("announcement_text") as string;
  const link = formData.get("announcement_link") as string;

  const updates = [
    { category: 'TOPBAR', key_name: 'announcement_text', value_text: text },
    { category: 'TOPBAR', key_name: 'announcement_link', value_text: link }
  ];

  for (const item of updates) {
    await supabase.from("system_settings").upsert(item, { onConflict: 'key_name' });
  }

  revalidatePath("/", "layout");
  return { success: true };
}
