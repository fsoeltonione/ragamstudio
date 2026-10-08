"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function createTrainerPayment(formData: FormData) {
  const trainerId = formData.get("trainer_id") as string;
  const amount = parseFloat(formData.get("amount") as string) || 0;
  const paymentDate = formData.get("payment_date") as string;
  const periodStart = formData.get("period_start") as string;
  const periodEnd = formData.get("period_end") as string;
  const totalClasses = parseInt(formData.get("total_classes") as string) || 0;
  const bookingCount = parseInt(formData.get("booking_count") as string) || 0;
  const notes = formData.get("notes") as string;

  const { error } = await supabase.from("trainer_payments").insert({
    trainer_id: trainerId || null,
    amount,
    payment_date: paymentDate || new Date().toISOString(),
    period_start: periodStart || null,
    period_end: periodEnd || null,
    total_classes: totalClasses,
    booking_count: bookingCount,
    status: "PAID",
    notes: notes || null,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/trainer-payments");
  return;
}

export async function deleteTrainerPayment(id: string) {
  const { error } = await supabase
    .from("trainer_payments")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/trainer-payments");
  return;
}
