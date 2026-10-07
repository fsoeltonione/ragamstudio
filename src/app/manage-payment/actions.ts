"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function savePaymentSettings(formData: FormData) {
  const midtrans = formData.get("midtrans_key") as string;
  const xendit = formData.get("xendit_key") as string;

  const updates = [
    { category: 'PAYMENT', key_name: 'midtrans_key', value_text: midtrans },
    { category: 'PAYMENT', key_name: 'xendit_key', value_text: xendit }
  ];

  for (const item of updates) {
    await supabase.from("system_settings").upsert(item, { onConflict: 'key_name' });
  }

  revalidatePath("/", "layout");
  return { success: true };
}
