"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const roles = formData.getAll("roles");
  const assigned_locations = formData.getAll("assigned_locations");
  const is_trainer = formData.get("is_trainer") === "on";
  const password = formData.get("password") as string;
  
  if (!email?.trim()) {
    throw new Error("Email is required");
  }

  // Map roles to singular role for compatibility
  let primaryRole = "STAFF";
  if (roles.includes("SUPER_ADMIN")) primaryRole = "SUPER_ADMIN";
  else if (roles.includes("ADMIN")) primaryRole = "ADMIN";
  if (is_trainer) primaryRole = "TRAINER"; // Override if they checked Trainer

  const { error } = await supabase.from("users").insert({
    email: email.trim().toLowerCase(),
    name: name?.trim() || null,
    role: primaryRole,
    location_id: assigned_locations[0] || null, // take first for now
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
  const locationId = formData.get("location_id") as string;

  const { error } = await supabase
    .from("users")
    .update({
      name: name?.trim() || null,
      role: role || "STAFF",
      location_id: locationId || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/users");
  return;
}

export async function deleteUser(id: string) {
  const { error } = await supabase.from("users").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/users");
  return;
}
