"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function saveGeneralSettings(formData: FormData) {
  const fields = [
    "studio_name",
    "tagline",
    "currency",
    "email",
    "phone",
    "address",
    "website",
    "tax_rate",
    "invoice_prefix",
  ];

  for (const field of fields) {
    const value = formData.get(field) as string;
    if (value !== null) {
      await supabase.from("system_settings").upsert(
        { category: "GENERAL", key_name: field, value_text: value },
        { onConflict: "key_name" }
      );
    }
  }

  revalidatePath("/general-settings");
  revalidatePath("/", "layout");
}
