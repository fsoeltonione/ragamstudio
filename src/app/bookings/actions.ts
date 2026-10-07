"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBooking(formData: FormData) {
  const member_id = formData.get("member_id") as string;
  const schedule_id = formData.get("schedule_id") as string;

  if (!member_id || !schedule_id) {
    return { error: "Member and Schedule are required." };
  }

  // 1. Find an active package for the member with remaining sessions
  const { data: memberPackages, error: pkgError } = await supabase
    .from("member_packages")
    .select("id, sessions_left")
    .eq("member_id", member_id)
    .eq("is_active", true)
    .gt("sessions_left", 0)
    .order("expiry_date", { ascending: true })
    .limit(1);

  if (pkgError) {
    return { error: "Failed to verify member package." };
  }

  if (!memberPackages || memberPackages.length === 0) {
    return { error: "Member does not have an active package with remaining credits." };
  }

  const activePackage = memberPackages[0];

  // 2. Decrement the session (Credit Deduction)
  const { error: deductError } = await supabase
    .from("member_packages")
    .update({ 
      sessions_left: activePackage.sessions_left - 1,
      // If it becomes 0, we can auto-deactivate it (or leave it to a trigger/CRON, but let's do it here for simplicity)
      is_active: activePackage.sessions_left - 1 > 0 
    })
    .eq("id", activePackage.id);

  if (deductError) {
    return { error: "Failed to deduct package session." };
  }

  // 3. Create the Booking
  const { error: bookingError } = await supabase
    .from("bookings")
    .insert({
      member_id,
      schedule_id,
      status: "CONFIRMED",
    });

  if (bookingError) {
    // Ideally we should rollback the deduction, but we're keeping it simple for MVP
    return { error: "Failed to create booking." };
  }

  // Revalidate and redirect
  revalidatePath("/", "layout");
  redirect("/bookings");
}
