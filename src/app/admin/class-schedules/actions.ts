"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createClassSchedule(formData: FormData) {
  const class_id = formData.get("class_id") as string;
  const trainer_id = formData.get("trainer_id") as string;
  const start_time = formData.get("start_time") as string; 
  const location_id = formData.get("location_id") as string;
  const room = formData.get("room") as string;
  const capacity = parseInt(formData.get("capacity") as string) || 10;
  const minimum_bookings = parseInt(formData.get("minimum_bookings") as string) || 1;
  const is_outdoor = formData.get("is_outdoor") === "on";
  const is_visible = formData.get("is_visible") === "on";
  const is_custom_image = formData.get("is_custom_image") === "on";
  
  if (!class_id || !trainer_id || !start_time) {
    throw new Error("Required fields are missing.");
  }

  const { data: studioClass } = await supabase
    .from("studio_classes")
    .select("duration_min")
    .eq("id", class_id)
    .single();

  if (!studioClass) throw new Error("Invalid class selected.");

  const start = new Date(start_time);
  const end = new Date(start.getTime() + studioClass.duration_min * 60000);

  const { error } = await supabase.from("class_schedules").insert({
    class_id,
    trainer_id,
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    location_id: location_id || null,
    room: room || null,
    capacity,
    minimum_bookings,
    is_outdoor,
    is_visible,
    is_custom_image
  });

  if (error) {
    if (error.message.includes("could not find the '")) {
      // Fallback for incomplete schema
      const min = await supabase.from("class_schedules").insert({
        class_id,
        trainer_id,
        start_time: start.toISOString(),
        end_time: end.toISOString()
      });
      if (min.error) throw new Error(min.error.message);
    } else {
      throw new Error(error.message);
    }
  }

  revalidatePath("/", "layout");
  redirect("/class-schedules");
}
