"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createLocation(formData: FormData) {
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;

  if (!name) return { error: "Location name is required." };

  const { error } = await supabase.from("locations").insert({ name, address });
  if (error) return { error: "Failed to create location." };

  revalidatePath("/", "layout");
  redirect("/locations");
}
