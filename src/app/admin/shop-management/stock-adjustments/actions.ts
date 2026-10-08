"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createStockAdjustment(formData: FormData) {
  const shop_id = formData.get("shop_id") as string;
  const product_id = formData.get("product_id") as string;
  const type = formData.get("type") as string;
  const qty = parseInt(formData.get("qty") as string, 10);
  const reason = formData.get("reason") as string;

  const { error } = await supabase.from("shop_stock_adjustments").insert({
    shop_id,
    product_id,
    type,
    qty,
    reason
  });

  if (error) throw new Error(error.message);

  // Update stock based on adjustment type
  const delta = type === "ADD" ? qty : -qty;
  await supabase.rpc("adjust_product_stock", { p_product_id: product_id, p_delta: delta }).maybeSingle();

  revalidatePath("/shop-management/stock-adjustments");
  revalidatePath("/shop-management/products");
  redirect("/shop-management/stock-adjustments");
}
