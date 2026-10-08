"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createMedicalCondition(formData: FormData) {
  const question = formData.get("question") as string;
  const input_type = formData.get("input_type") as string;
  const is_active = formData.get("is_active") === "on";

  if (!question?.trim()) throw new Error("Question is required.");

  try {
    const { error } = await supabase.from("medical").insert({
      question: question.trim(),
      input_type: input_type || "text",
      is_active: is_active,
    });

    if (error) {
      if (error.message.includes("could not find the 'question' column")) {
        // Fallback to old schema if not migrated
        await supabase.from("medical").insert({
          condition_name: question.trim(),
          description: "Type: " + input_type,
        });
      } else {
        throw error;
      }
    }
  } catch (err: any) {
    throw new Error(err.message);
  }

  revalidatePath("/medical");
  redirect("/medical");
}

export async function updateMedicalCondition(id: string, formData: FormData) {
  const question = formData.get("question") as string;
  const input_type = formData.get("input_type") as string;
  const is_active = formData.get("is_active") === "on";

  if (!question?.trim()) throw new Error("Question is required.");

  try {
    const { error } = await supabase
      .from("medical")
      .update({
        question: question.trim(),
        input_type: input_type || "text",
        is_active: is_active,
      })
      .eq("id", id);

    if (error) {
      if (error.message.includes("could not find the 'question' column")) {
        // Fallback
        await supabase.from("medical").update({
          condition_name: question.trim(),
          description: "Type: " + input_type,
        }).eq("id", id);
      } else {
        throw error;
      }
    }
  } catch (err: any) {
    throw new Error(err.message);
  }

  revalidatePath("/medical");
  redirect("/medical");
}

export async function deleteMedicalCondition(id: string) {
  const { error } = await supabase.from("medical").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/medical");
}
