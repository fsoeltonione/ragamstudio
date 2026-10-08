"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBooking(formData: FormData) {
  const member_id = formData.get("member_id") as string;
  const schedule_id = formData.get("schedule_id") as string;

  if (!member_id || !schedule_id) {
    throw new Error("Member and Schedule are required.");
  }

  // 1. Check Capacity to determine if Waitlist
  const { data: schedule } = await supabase
    .from("class_schedules")
    .select("class:studio_classes(capacity), bookings(count)")
    .eq("id", schedule_id)
    .single();
    
  if (!schedule) throw new Error("Invalid schedule.");
  
  const classData = Array.isArray(schedule.class) ? schedule.class[0] : schedule.class;
  const capacity = (classData as any)?.capacity || 0;
  // @ts-ignore
  const currentBookings = schedule.bookings?.[0]?.count || 0;
  const isWaitlist = currentBookings >= capacity;

  // 2. Find an active package for the member with remaining sessions
  const { data: memberPackages } = await supabase
    .from("member_packages")
    .select("id, sessions_left")
    .eq("member_id", member_id)
    .eq("is_active", true)
    .gt("sessions_left", 0)
    .order("expiry_date", { ascending: true })
    .limit(1);

  if (!memberPackages || memberPackages.length === 0) {
    throw new Error("Member does not have an active package with remaining credits.");
  }

  const activePackage = memberPackages[0];

  // 3. Decrement the session (Even for waitlist, we hold the credit)
  const { error: deductError } = await supabase
    .from("member_packages")
    .update({ 
      sessions_left: activePackage.sessions_left - 1,
      is_active: activePackage.sessions_left - 1 > 0 
    })
    .eq("id", activePackage.id);

  if (deductError) throw new Error("Failed to deduct package session.");

  // 4. Create the Booking
  const { error: bookingError } = await supabase
    .from("bookings")
    .insert({
      member_id,
      schedule_id,
      status: "CONFIRMED",
      is_waitlist: isWaitlist,
      attendance_status: "PENDING"
    });

  if (bookingError) throw new Error("Failed to create booking.");

  // TRIGGER REAL NOTIFICATION
  await supabase.from("database_notifications").insert({
    title: isWaitlist ? "New Waitlist Entry" : "New Class Booking",
    message: "User booked a session for Schedule " + schedule_id
  });

  revalidatePath("/", "layout");
  redirect("/bookings");
}

export async function markAttendance(id: string, status: string) {
  await supabase
    .from("bookings")
    .update({ attendance_status: status })
    .eq("id", id);
  revalidatePath("/bookings");
}
