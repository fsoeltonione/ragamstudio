"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function saveSeoSettings(formData: FormData) {
  const metaTitle = formData.get("meta_title") as string;
  const metaDesc = formData.get("meta_desc") as string;

  const updates = [
    { category: 'SEO', key_name: 'meta_title', value_text: metaTitle },
    { category: 'SEO', key_name: 'meta_desc', value_text: metaDesc }
  ];

  for (const item of updates) {
    await supabase.from("system_settings").upsert(item, { onConflict: 'key_name' });
  }

  revalidatePath("/", "layout");
  return { success: true };
}
