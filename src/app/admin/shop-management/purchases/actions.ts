"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createShopPurchase(formData: FormData) {
  const vendor_id = formData.get("vendor_id") as string;
  const purchase_date = formData.get("purchase_date") as string;
  const status = formData.get("status") as string;
  const notes = formData.get("notes") as string;

  const product_ids = formData.getAll("product_id[]") as string[];
  const quantities = formData.getAll("qty[]") as string[];
  const costs = formData.getAll("cost_per_uom[]") as string[];
  const uoms = formData.getAll("purchase_uom[]") as string[];

  const total_amount = costs.reduce((sum, c, i) => sum + (parseFloat(c) * parseFloat(quantities[i] || "1")), 0);

  const { data: purchase, error } = await supabase.from("shop_purchases").insert({
    vendor_id,
    purchase_date,
    total_amount,
    status,
    notes
  }).select().single();

  if (error) throw new Error(error.message);

  if (purchase && product_ids.length > 0) {
    const items = product_ids.map((pid, i) => ({
      purchase_id: purchase.id,
      product_id: pid,
      qty: parseFloat(quantities[i] || "1"),
      purchase_uom: uoms[i] || "PCS",
      conversion: 1,
      cost_per_uom: parseFloat(costs[i] || "0")
    }));
    await supabase.from("shop_purchase_items").insert(items);
  }

  revalidatePath("/shop-management/purchases");
  redirect("/shop-management/purchases");
}
