"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function saveGeneralSettings(formData: FormData) {
  const studioName = formData.get("studio_name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  const updates = [
    { category: 'GENERAL', key_name: 'studio_name', value_text: studioName },
    { category: 'GENERAL', key_name: 'email', value_text: email },
    { category: 'GENERAL', key_name: 'phone', value_text: phone }
  ];

  for (const item of updates) {
    await supabase.from("system_settings").upsert(item, { onConflict: 'key_name' });
  }

  revalidatePath("/", "layout");
  return { success: true };
}
