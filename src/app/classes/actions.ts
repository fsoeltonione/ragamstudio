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
