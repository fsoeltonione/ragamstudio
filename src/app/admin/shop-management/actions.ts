"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- PRODUCTS ---
export async function createShopProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const sku = formData.get("sku") as string;
  const barcode = formData.get("barcode") as string;
  const price = parseFloat(formData.get("price") as string) || 0;
  const uom = formData.get("uom") as string;
  const procurement_type = formData.get("procurement_type") as string;
  const low_stock_threshold = parseFloat(formData.get("low_stock_threshold") as string) || 0;
  const shop_id = formData.get("shop_id") as string;
  const description = formData.get("description") as string;
  const is_active = formData.get("is_active") === "true";

  const { error } = await supabase.from("shop_products").insert({
    name,
    sku: sku || null,
    barcode: barcode || null,
    price,
    uom,
    procurement_type,
    low_stock_threshold,
    shop_id: shop_id || null,
    description: description || null,
    is_active,
    stock: 0,
    avg_cost: 0
  });

  if (error) throw new Error(error.message);
  revalidatePath("/shop-management/products");
  redirect("/shop-management/products");
}

export async function toggleProductActive(id: string, is_active: boolean) {
  await supabase.from("shop_products").update({ is_active }).eq("id", id);
  revalidatePath("/shop-management/products");
}

// --- VENDORS ---
export async function createVendor(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  
  const { error } = await supabase.from("shop_vendors").insert({ name, phone });
  if (error) throw new Error(error.message);
  revalidatePath("/shop-management/vendors");
}

// --- PURCHASES (ERP LOGIC TEST) ---
export async function createDummyPurchase() {
  // 1. Create a dummy vendor if none exists
  let { data: vendor } = await supabase.from("shop_vendors").select("id").limit(1).single();
  if (!vendor) {
    const { data: newVendor } = await supabase.from("shop_vendors").insert({ name: "Supplier A" }).select().single();
    vendor = newVendor;
  }

  // 2. Create a dummy product if none exists
  let { data: product } = await supabase.from("shop_products").select("id").limit(1).single();
  if (!product) {
    const { data: newProduct } = await supabase.from("shop_products").insert({
      name: "Grip Socks",
      uom: "Pairs",
      price: 150000,
      procurement_type: "Beli Putus"
    }).select().single();
    product = newProduct;
  }

  // 3. Create a PENDING purchase
  const { data: purchase, error: purchaseErr } = await supabase.from("shop_purchases").insert({
    vendor_id: vendor?.id,
    purchase_date: new Date().toISOString().split('T')[0],
    total_amount: 500000,
    status: "PENDING"
  }).select().single();

  if (purchaseErr) throw new Error(purchaseErr.message);

  // 4. Add items to purchase (Buying 10 pairs at 50,000 cost each)
  const { error: itemErr } = await supabase.from("shop_purchase_items").insert({
    purchase_id: purchase?.id,
    product_id: product?.id,
    qty: 10,
    purchase_uom: "Pairs",
    conversion: 1,
    cost_per_uom: 500000 / 10
  });

  if (itemErr) throw new Error(itemErr.message);

  // 5. UPDATE status to COMPLETED (THIS WILL TRIGGER THE DB ERP LOGIC!)
  const { error: completeErr } = await supabase.from("shop_purchases").update({
    status: "COMPLETED"
  }).eq("id", purchase?.id);

  if (completeErr) throw new Error(completeErr.message);

  revalidatePath("/shop-management/products");
  revalidatePath("/shop-management/purchases");
}
