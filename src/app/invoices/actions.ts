"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function createInvoice(formData: FormData) {
  const memberId = formData.get("member_id") as string;
  const amount = parseFloat(formData.get("amount") as string) || 0;
  const dueDate = formData.get("due_date") as string;
  const notes = formData.get("notes") as string;

  // Generate invoice number: INV-YYYYMMDD-XXXX
  const now = new Date();
  const datePart = now.getFullYear().toString()
    + String(now.getMonth() + 1).padStart(2, "0")
    + String(now.getDate()).padStart(2, "0");
  const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
  const invoiceNumber = "INV-" + datePart + "-" + randomPart;

  const subtotal = amount;
  const taxAmount = 0;

  const { error } = await supabase.from("invoices").insert({
    invoice_number: invoiceNumber,
    member_id: memberId || null,
    amount: amount,
    subtotal: subtotal,
    tax_amount: taxAmount,
    status: "UNPAID",
    due_date: dueDate || null,
    notes: notes || null,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/invoices");
  return { success: true, invoiceNumber };
}

export async function updateInvoiceStatus(id: string, status: string) {
  const { error } = await supabase
    .from("invoices")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/invoices");
  return;
}

export async function deleteInvoice(id: string) {
  const { error } = await supabase
    .from("invoices")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/invoices");
  return;
}
