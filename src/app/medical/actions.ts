"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createMedicalCondition(formData: FormData) {
  const condition_name = formData.get("condition_name") as string;
  const description = formData.get("description") as string;

  if (!condition_name) throw new Error("Condition name is required.");

  const { error } = await supabase.from("medical").insert({ condition_name, description });
  if (error) throw new Error("Failed to create medical record.");

  revalidatePath("/", "layout");
  redirect("/medical");
}
