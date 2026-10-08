"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBlog(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content_html = formData.get("content_html") as string;
  const is_published = formData.get("is_published") === "true";

  if (!title?.trim() || !slug?.trim()) throw new Error("Title and slug are required.");

  const { error } = await supabase.from("blogs").insert({
    title: title.trim(),
    slug: slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
    content_html: content_html?.trim() || "",
    is_published,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/blogs");
  redirect("/blogs");
}

export async function updateBlog(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content_html = formData.get("content_html") as string;
  const is_published = formData.get("is_published") === "true";

  if (!title?.trim() || !slug?.trim()) throw new Error("Title and slug are required.");

  const { error } = await supabase
    .from("blogs")
    .update({
      title: title.trim(),
      slug: slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
      content_html: content_html?.trim() || "",
      is_published,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/blogs");
  redirect("/blogs");
}

export async function deleteBlog(id: string) {
  const { error } = await supabase.from("blogs").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/blogs");
}
