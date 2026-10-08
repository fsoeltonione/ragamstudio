"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function processSale(payload: {
  shop_id: string;
  customer_name?: string;
  payment_method_name: string;
  cart: { product_id: string; qty: number; unit_price: number }[];
  total: number;
}) {
  if (!payload.shop_id) throw new Error("Shop is required!");
  if (!payload.payment_method_name) throw new Error("Payment Method is required!");
  if (payload.cart.length === 0) throw new Error("Cart is empty!");

  // Generate unique sale number
  const saleNumber = "SALE-" + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);

  // 1. Insert Sale Header
  const { data: sale, error: saleErr } = await supabase.from("shop_sales").insert({
    sale_number: saleNumber,
    customer_name: payload.customer_name || 'Walk-in Customer',
    shop_id: payload.shop_id,
    payment_method: payload.payment_method_name,
    total: payload.total,
    status: "COMPLETED" // Directly completed for POS
  }).select().single();

  if (saleErr) throw new Error("Failed to create sale: " + saleErr.message);

  // 2. Insert Sale Items (This will trigger the stock deduction automatically)
  const saleItems = payload.cart.map(item => ({
    sale_id: sale.id,
    product_id: item.product_id,
    qty: item.qty,
    unit_price: item.unit_price
  }));

  const { error: itemsErr } = await supabase.from("shop_sale_items").insert(saleItems);

  if (itemsErr) {
    // Rollback attempt
    await supabase.from("shop_sales").delete().eq("id", sale.id);
    throw new Error("Failed to insert items: " + itemsErr.message);
  }

  // Revalidate everything
  revalidatePath("/pos");
  revalidatePath("/shop-management/products");
  revalidatePath("/shop-management/sales");

  return sale.sale_number;
}
