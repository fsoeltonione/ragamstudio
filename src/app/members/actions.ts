"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createMember(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const gender = formData.get("gender") as string;

  if (!name || !email) {
    return { error: "Name and Email are required." };
  }

  const { error } = await supabase
    .from("members")
    .insert({
      name,
      email,
      phone,
      gender
    });

  if (error) {
    if (error.code === '23505') {
      return { error: "Email address is already registered." };
    }
    return { error: "Failed to create member." };
  }

  revalidatePath("/", "layout");
  redirect("/members");
}

export async function bulkActionMembers(ids: string[], actionType: 'delete' | 'suspend' | 'activate') {
  if (!ids || ids.length === 0) return { error: "No members selected." };

  if (actionType === 'delete') {
    const { error } = await supabase.from("members").delete().in("id", ids);
    if (error) return { error: "Failed to delete members." };
  } else if (actionType === 'suspend') {
    const { error } = await supabase.from("members").update({ status: 'SUSPENDED' }).in("id", ids);
    if (error) return { error: "Failed to suspend members." };
  } else if (actionType === 'activate') {
    const { error } = await supabase.from("members").update({ status: 'ACTIVE' }).in("id", ids);
    if (error) return { error: "Failed to activate members." };
  }

  revalidatePath("/members");
  return { success: true };
}
