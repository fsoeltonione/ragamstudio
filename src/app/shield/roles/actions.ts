"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createData(formData: FormData) {
  const roleName = formData.get("role_name") as string;
  const permissionsJson = formData.get("permissions_json") as string;

  if (!roleName?.trim()) {
    throw new Error("Role name is required");
  }

  let permissions = {};
  try {
    permissions = JSON.parse(permissionsJson || "{}");
  } catch {
    permissions = {};
  }

  const { error } = await supabase.from("roles").insert({
    role_name: roleName.trim(),
    permissions_json: permissions,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/shield/roles");
  redirect("/shield/roles");
}

export async function updateRole(id: string, formData: FormData) {
  const roleName = formData.get("role_name") as string;
  const permissionsJson = formData.get("permissions_json") as string;

  let permissions = {};
  try {
    permissions = JSON.parse(permissionsJson || "{}");
  } catch {
    permissions = {};
  }

  const { error } = await supabase
    .from("roles")
    .update({ role_name: roleName?.trim(), permissions_json: permissions })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/shield/roles");
  return;
}

export async function deleteRole(id: string) {
  const { error } = await supabase.from("roles").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/shield/roles");
  return;
}
