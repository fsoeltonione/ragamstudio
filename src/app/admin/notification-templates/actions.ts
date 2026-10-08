"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createNotificationTemplate(formData: FormData) {
  const type = formData.get("type") as string;
  const eventName = formData.get("event_name") as string;
  const subject = formData.get("subject") as string;
  const bodyTemplate = formData.get("body_template") as string;

  if (!eventName?.trim() || !type) throw new Error("Event name and type are required.");

  const { error } = await supabase.from("notification_templates").insert({
    type,
    event_name: eventName.trim().toLowerCase().replace(/\s+/g, "_"),
    subject: subject?.trim() || null,
    body_template: bodyTemplate?.trim() || null,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/notification-templates");
  redirect("/notification-templates");
}

export async function updateNotificationTemplate(id: string, formData: FormData) {
  const type = formData.get("type") as string;
  const eventName = formData.get("event_name") as string;
  const subject = formData.get("subject") as string;
  const bodyTemplate = formData.get("body_template") as string;

  const { error } = await supabase
    .from("notification_templates")
    .update({
      type,
      event_name: eventName?.trim(),
      subject: subject?.trim() || null,
      body_template: bodyTemplate?.trim() || null,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/notification-templates");
  redirect("/notification-templates");
}

export async function deleteNotificationTemplate(id: string) {
  const { error } = await supabase
    .from("notification_templates")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/notification-templates");
}
