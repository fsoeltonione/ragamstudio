"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createClassSchedule(formData: FormData) {
  const class_id = formData.get("class_id") as string;
  const trainer_id = formData.get("trainer_id") as string;
  const start_time = formData.get("start_time") as string; // datetime-local format
  
  if (!class_id || !trainer_id || !start_time) {
    return { error: "All fields are required." };
  }

  // Fetch the class duration to calculate end_time automatically
  const { data: studioClass } = await supabase
    .from("studio_classes")
    .select("duration_min")
    .eq("id", class_id)
    .single();

  if (!studioClass) {
    return { error: "Invalid class selected." };
  }

  // Calculate end_time
  const start = new Date(start_time);
  const end = new Date(start.getTime() + studioClass.duration_min * 60000);

  const { error } = await supabase
    .from("class_schedules")
    .insert({
      class_id,
      trainer_id,
      start_time: start.toISOString(),
      end_time: end.toISOString(),
    });

  if (error) {
    return { error: "Failed to create class schedule." };
  }

  revalidatePath("/", "layout");
  redirect("/class-schedules");
}
