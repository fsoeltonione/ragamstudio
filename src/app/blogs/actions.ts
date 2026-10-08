"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createData(formData: FormData) {
  const title = formData.get("title") as string;
  const contentHtml = formData.get("content_html") as string;
  const isPublished = formData.get("is_published") === "true";

  if (!title?.trim()) {
    throw new Error("Title is required");
  }

  // Auto-generate slug
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const { error } = await supabase.from("blogs").insert({
    title,
    slug,
    content_html: contentHtml || "",
    is_published: isPublished,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/blogs");
  redirect("/blogs");
}

export async function deleteBlog(id: string) {
  const { error } = await supabase.from("blogs").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/blogs");
  return;
}
