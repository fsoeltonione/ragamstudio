"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createMember(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const gender = formData.get("gender") as string;
  const company = formData.get("company") as string;
  const status = formData.get("status") as string || "ACTIVE";

  if (!name) {
    return { error: "Name is required." };
  }

  const { error } = await supabase
    .from("members")
    .insert({
      name,
      email: email || null,
      phone: phone || null,
      gender: gender || null,
      status
    });

  if (error) {
    if (error.code === "23505") {
      return { error: "Email address is already registered." };
    }
    return { error: "Failed to create member." };
  }

  revalidatePath("/", "layout");
  redirect("/members");
}

export async function bulkActionMembers(ids: string[], actionType: "delete" | "suspend" | "activate"): Promise<{ error?: string }> {
  if (!ids || ids.length === 0) return { error: "No members selected." };

  if (actionType === "delete") {
    const { error } = await supabase.from("members").delete().in("id", ids);
    if (error) return { error: "Failed to delete members." };
  } else if (actionType === "suspend") {
    const { error } = await supabase.from("members").update({ status: "SUSPENDED" }).in("id", ids);
    if (error) return { error: "Failed to suspend members." };
  } else if (actionType === "activate") {
    const { error } = await supabase.from("members").update({ status: "ACTIVE" }).in("id", ids);
    if (error) return { error: "Failed to activate members." };
  }

  revalidatePath("/members");
  return {};
}
