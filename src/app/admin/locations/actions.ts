"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createLocation(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const address = formData.get("address") as string;
  const google_maps_link = formData.get("google_maps_link") as string;
  const phone = formData.get("phone") as string;
  const logo = formData.get("logo") as string;
  const app_logo = formData.get("app_logo") as string;
  const description = formData.get("description") as string;
  const timezone = formData.get("timezone") as string;
  const color = formData.get("color") as string;
  const allow_cancellations = formData.get("allow_cancellations") === "true";
  const cancellation_window = parseInt(formData.get("cancellation_window") as string) || 24;
  const is_active = formData.get("is_active") === "true";

  if (!name?.trim()) throw new Error("Location name is required.");

  const { error } = await supabase.from("locations").insert({
    name: name.trim(),
    slug: slug?.trim() || name.trim().toLowerCase().replace(/ /g, '-'),
    address: address?.trim() || null,
    google_maps_link: google_maps_link?.trim() || null,
    phone: phone?.trim() || null,
    logo: logo?.trim() || null,
    app_logo: app_logo?.trim() || null,
    description: description?.trim() || null,
    timezone: timezone || "Asia/Jakarta",
    color: color || "#ea580c",
    allow_cancellations,
    cancellation_window,
    is_active,
  });

  if (error) {
    // If column missing, try minimal
    if (error.message.includes("could not find the '")) {
      const minimal = await supabase.from("locations").insert({
        name: name.trim(),
        address: address?.trim() || null,
        is_active,
      });
      if (minimal.error) throw new Error(minimal.error.message);
    } else {
      throw new Error(error.message);
    }
  }

  revalidatePath("/locations");
  redirect("/locations");
}

export async function updateLocation(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const address = formData.get("address") as string;
  const google_maps_link = formData.get("google_maps_link") as string;
  const phone = formData.get("phone") as string;
  const logo = formData.get("logo") as string;
  const app_logo = formData.get("app_logo") as string;
  const description = formData.get("description") as string;
  const timezone = formData.get("timezone") as string;
  const color = formData.get("color") as string;
  const allow_cancellations = formData.get("allow_cancellations") === "true";
  const cancellation_window = parseInt(formData.get("cancellation_window") as string) || 24;
  const is_active = formData.get("is_active") === "true";

  const { error } = await supabase
    .from("locations")
    .update({
      name: name?.trim(),
      slug: slug?.trim() || name?.trim().toLowerCase().replace(/ /g, '-'),
      address: address?.trim() || null,
      google_maps_link: google_maps_link?.trim() || null,
      phone: phone?.trim() || null,
      logo: logo?.trim() || null,
      app_logo: app_logo?.trim() || null,
      description: description?.trim() || null,
      timezone: timezone || "Asia/Jakarta",
      color: color || "#ea580c",
      allow_cancellations,
      cancellation_window,
      is_active,
    })
    .eq("id", id);

  if (error) {
    if (error.message.includes("could not find the '")) {
      const minimal = await supabase.from("locations").update({
        name: name.trim(),
        address: address?.trim() || null,
        is_active,
      }).eq("id", id);
      if (minimal.error) throw new Error(minimal.error.message);
    } else {
      throw new Error(error.message);
    }
  }

  revalidatePath("/locations");
  redirect("/locations");
}

export async function deleteLocation(id: string) {
  const { error } = await supabase.from("locations").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/locations");
}
