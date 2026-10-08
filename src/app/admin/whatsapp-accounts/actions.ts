"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createWhatsappAccount(formData: FormData) {
  const phoneNumber = formData.get("phone_number") as string;
  const providerApiKey = formData.get("provider_api_key") as string;

  if (!phoneNumber?.trim()) throw new Error("Phone number is required.");

  const { error } = await supabase.from("whatsapp_accounts").insert({
    phone_number: phoneNumber.trim(),
    provider_api_key: providerApiKey?.trim() || null,
    is_connected: false,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/whatsapp-accounts");
  redirect("/whatsapp-accounts");
}

export async function updateWhatsappAccount(id: string, formData: FormData) {
  const phoneNumber = formData.get("phone_number") as string;
  const providerApiKey = formData.get("provider_api_key") as string;
  const isConnected = formData.get("is_connected") === "true";

  const { error } = await supabase
    .from("whatsapp_accounts")
    .update({
      phone_number: phoneNumber?.trim(),
      provider_api_key: providerApiKey?.trim() || null,
      is_connected: isConnected,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/whatsapp-accounts");
  redirect("/whatsapp-accounts");
}

export async function deleteWhatsappAccount(id: string) {
  const { error } = await supabase.from("whatsapp_accounts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/whatsapp-accounts");
}
