"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createStudioClass(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const durationMinStr = formData.get("duration_min") as string;
  const capacityStr = formData.get("capacity") as string;

  if (!name || !durationMinStr || !capacityStr) {
    throw new Error("Name, duration, and capacity are required.");
  }

  const duration_min = parseInt(durationMinStr, 10) || 60;
  const capacity = parseInt(capacityStr, 10) || 10;

  const { error } = await supabase
    .from("studio_classes")
    .insert({
      name,
      description,
      duration_min,
      capacity,
      is_active: true
    });

  if (error) {
    throw new Error("Failed to create studio class.");
  }

  revalidatePath("/", "layout");
  redirect("/classes");
}

export async function createClassLevel(formData: FormData) {
  const name = formData.get("name") as string;
  const isActive = formData.get("is_active") === "true";

  if (!name?.trim()) throw new Error("Name is required.");

  const { error } = await supabase.from("class_levels").insert({
    name: name.trim(),
    is_active: isActive,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/classes");
  redirect("/classes?tab=levels");
}

export async function updateClassLevel(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const isActive = formData.get("is_active") === "true";

  const { error } = await supabase
    .from("class_levels")
    .update({ name: name?.trim(), is_active: isActive })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/classes");
  redirect("/classes?tab=levels");
}

export async function deleteClassLevel(id: string) {
  const { error } = await supabase.from("class_levels").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/classes");
}

export async function createClassType(formData: FormData) {
  const name = formData.get("name") as string;
  const isActive = formData.get("is_active") === "true";

  if (!name?.trim()) throw new Error("Name is required.");

  const { error } = await supabase.from("class_types").insert({
    name: name.trim(),
    is_active: isActive,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/classes");
  redirect("/classes?tab=types");
}

export async function updateClassType(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const isActive = formData.get("is_active") === "true";

  const { error } = await supabase
    .from("class_types")
    .update({ name: name?.trim(), is_active: isActive })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/classes");
  redirect("/classes?tab=types");
}

export async function deleteClassType(id: string) {
  const { error } = await supabase.from("class_types").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/classes");
}
