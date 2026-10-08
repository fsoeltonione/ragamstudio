"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const baseRate = parseFloat(formData.get("base_rate") as string) || 0;
  const perHeadRate =
    parseFloat(formData.get("per_head_rate") as string) || 0;

  if (!email?.trim()) {
    throw new Error("Email is required");
  }

  const { error } = await supabase.from("users").insert({
    email: email.trim().toLowerCase(),
    name: name?.trim() || null,
    role: role || "STAFF",
    base_rate: role === "TRAINER" ? baseRate : null,
    per_head_rate: role === "TRAINER" ? perHeadRate : null,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/users");
  redirect("/users");
}

export async function updateUser(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const baseRate = parseFloat(formData.get("base_rate") as string) || 0;
  const perHeadRate =
    parseFloat(formData.get("per_head_rate") as string) || 0;

  const { error } = await supabase
    .from("users")
    .update({
      name: name?.trim() || null,
      role: role || "STAFF",
      base_rate: role === "TRAINER" ? baseRate : null,
      per_head_rate: role === "TRAINER" ? perHeadRate : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/users");
  return;
}

export async function deleteUser(id: string) {
  const { error } = await supabase.from("users").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/users");
  return;
}
