"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPaymentMethod(formData: FormData) {
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;

  if (!name || !type) return { error: "Name and type are required." };

  const { error } = await supabase.from("payment_methods").insert({ name, type });
  if (error) return { error: "Failed to create payment method." };

  revalidatePath("/", "layout");
  redirect("/payment-methods");
}
