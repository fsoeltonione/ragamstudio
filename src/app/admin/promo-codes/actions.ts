"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPromoCode(formData: FormData) {
  const code = formData.get("code") as string;
  const discountType = formData.get("discount_type") as string;
  const discountValue = parseInt(formData.get("discount_value") as string, 10) || 0;
  const maxUsesStr = formData.get("max_uses") as string;
  const expiresAtStr = formData.get("expires_at") as string;
  const isActive = formData.get("is_active") === "true";

  if (!code?.trim()) throw new Error("Promo code is required.");

  let discount_percent = 0;
  let discount_fixed = 0;

  if (discountType === "PERCENT") {
    discount_percent = discountValue;
  } else {
    discount_fixed = discountValue;
  }

  const { error } = await supabase.from("promo_codes").insert({
    code: code.trim().toUpperCase(),
    discount_percent,
    discount_fixed,
    max_uses: maxUsesStr ? parseInt(maxUsesStr, 10) : null,
    expires_at: expiresAtStr ? new Date(expiresAtStr).toISOString() : null,
    is_active: isActive,
  });

  if (error) throw new Error("Failed to create promo code. Code might exist.");

  revalidatePath("/promo-codes");
  redirect("/promo-codes");
}

export async function updatePromoCode(id: string, formData: FormData) {
  const code = formData.get("code") as string;
  const discountType = formData.get("discount_type") as string;
  const discountValue = parseInt(formData.get("discount_value") as string, 10) || 0;
  const maxUsesStr = formData.get("max_uses") as string;
  const expiresAtStr = formData.get("expires_at") as string;
  const isActive = formData.get("is_active") === "true";

  let discount_percent = 0;
  let discount_fixed = 0;

  if (discountType === "PERCENT") {
    discount_percent = discountValue;
  } else {
    discount_fixed = discountValue;
  }

  const { error } = await supabase
    .from("promo_codes")
    .update({
      code: code?.trim().toUpperCase(),
      discount_percent,
      discount_fixed,
      max_uses: maxUsesStr ? parseInt(maxUsesStr, 10) : null,
      expires_at: expiresAtStr ? new Date(expiresAtStr).toISOString() : null,
      is_active: isActive,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/promo-codes");
  redirect("/promo-codes");
}

export async function deletePromoCode(id: string) {
  const { error } = await supabase.from("promo_codes").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/promo-codes");
}
