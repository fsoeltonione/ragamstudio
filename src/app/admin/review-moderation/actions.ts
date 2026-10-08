"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createReview(formData: FormData) {
  const member_id = formData.get("member_id") as string;
  const ratingStr = formData.get("rating") as string;
  const comment = formData.get("comment") as string;
  const is_approved = formData.get("is_approved") === "true";

  if (!member_id || !ratingStr) throw new Error("Member and Rating are required.");

  const { error } = await supabase.from("reviews").insert({
    member_id,
    rating: parseInt(ratingStr, 10),
    comment: comment?.trim() || null,
    is_approved,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/review-moderation");
  redirect("/review-moderation");
}

export async function updateReview(id: string, formData: FormData) {
  const is_approved = formData.get("is_approved") === "true";

  // usually we only approve/reject, but we can also update comment if needed
  const ratingStr = formData.get("rating") as string;
  const comment = formData.get("comment") as string;

  const updateData: any = { is_approved };
  
  if (ratingStr) updateData.rating = parseInt(ratingStr, 10);
  if (comment !== null) updateData.comment = comment.trim();

  const { error } = await supabase.from("reviews").update(updateData).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/review-moderation");
  redirect("/review-moderation");
}

export async function toggleReviewApproval(id: string, is_approved: boolean) {
  const { error } = await supabase.from("reviews").update({ is_approved }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/review-moderation");
}

export async function deleteReview(id: string) {
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/review-moderation");
}
