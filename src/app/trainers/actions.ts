"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTrainer(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const base_rate = parseInt(formData.get("base_rate") as string, 10) || 0;
  const per_head_rate = parseInt(formData.get("per_head_rate") as string, 10) || 0;

  if (!name || !email) {
    return { error: "Name and Email are required." };
  }

  // Insert into users table as a trainer
  const { error } = await supabase.from("users").insert({
    name,
    email,
    base_rate,
    per_head_rate
  });

  if (error) {
    return { error: "Failed to create trainer." };
  }

  revalidatePath("/", "layout");
  redirect("/trainers");
}
