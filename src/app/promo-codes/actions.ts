"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPromoCode(formData: FormData) {
  const code = formData.get("code") as string;
  const discount_percent = parseInt(formData.get("discount_percent") as string, 10) || 0;
  const discount_fixed = parseInt(formData.get("discount_fixed") as string, 10) || 0;

  if (!code) {
    return { error: "Promo code string is required." };
  }

  const { error } = await supabase.from("promo_codes").insert({
    code: code.toUpperCase(),
    discount_percent,
    discount_fixed
  });

  if (error) {
    return { error: "Failed to create promo code. Code might exist." };
  }

  revalidatePath("/", "layout");
  redirect("/promo-codes");
}
