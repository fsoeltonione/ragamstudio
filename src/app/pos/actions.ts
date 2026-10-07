"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function completeSale(formData: FormData) {
  const member_id = formData.get("member_id") as string;
  const package_id = formData.get("package_id") as string;
  const payment_method = formData.get("payment_method") as string;
  const notes = formData.get("notes") as string;

  if (!member_id || !package_id || !payment_method) {
    return { error: "Customer, Package, and Payment Method are required." };
  }

  // 1. Fetch package details
  const { data: pkg } = await supabase
    .from("packages")
    .select("*")
    .eq("id", package_id)
    .single();

  if (!pkg) return { error: "Invalid package." };

  // 2. Calculate Expiry Date
  const activationDate = new Date();
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + (pkg.duration_days || 30));

  // 3. Create Member Package (inject credits)
  const { error: mpError } = await supabase
    .from("member_packages")
    .insert({
      member_id,
      package_id,
      sessions_left: pkg.total_sessions,
      activation_date: activationDate.toISOString(),
      expiry_date: expiryDate.toISOString(),
      is_active: true
    });

  if (mpError) return { error: "Failed to create member package." };

  // 4. Record Transaction
  const { error: txError } = await supabase
    .from("transactions")
    .insert({
      member_id,
      package_id,
      amount: pkg.price,
      payment_method,
      notes
    });

  if (txError) return { error: "Failed to record transaction." };

  revalidatePath("/", "layout");
  return { success: true };
}
