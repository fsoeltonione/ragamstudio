"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPackage(formData: FormData) {
  const name = formData.get("name") as string;
  const priceStr = formData.get("price") as string;
  const totalSessionsStr = formData.get("total_sessions") as string;
  const durationDaysStr = formData.get("duration_days") as string;

  if (!name || !priceStr || !totalSessionsStr || !durationDaysStr) {
    throw new Error("All fields are required.");
  }

  const price = parseInt(priceStr.replace(/\D/g, ''), 10) || 0;
  const total_sessions = parseInt(totalSessionsStr, 10) || 0;
  const duration_days = parseInt(durationDaysStr, 10) || 0;

  const { error } = await supabase
    .from("packages")
    .insert({
      name,
      type: "CLASS",
      price,
      total_sessions,
      duration_days
    });

  if (error) {
    throw new Error("Failed to create package template.");
  }

  revalidatePath("/", "layout");
  redirect("/packages");
}
