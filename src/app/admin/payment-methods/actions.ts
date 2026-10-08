"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPaymentMethod(formData: FormData) {
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const isActive = formData.get("is_active") === "true";
  const showOnInvoice = formData.get("show_on_invoice") === "true";

  if (!name?.trim() || !type) throw new Error("Name and type are required.");

  const { error } = await supabase.from("payment_methods").insert({
    name: name.trim(),
    type,
    is_active: isActive,
    show_on_invoice: showOnInvoice,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/payment-methods");
  redirect("/payment-methods");
}

export async function updatePaymentMethod(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const isActive = formData.get("is_active") === "true";

  const { error } = await supabase
    .from("payment_methods")
    .update({ name: name?.trim(), type, is_active: isActive })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/payment-methods");
  redirect("/payment-methods");
}

export async function deletePaymentMethod(id: string) {
  const { error } = await supabase.from("payment_methods").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/payment-methods");
}
