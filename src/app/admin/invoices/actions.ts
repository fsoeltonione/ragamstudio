"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createInvoice(formData: FormData) {
  const memberId = formData.get("member_id") as string;
  const packageId = formData.get("package_id") as string;
  const taxInclusive = formData.get("tax_inclusive") === "true";
  const taxRate = parseFloat(formData.get("tax_rate") as string) || 10;

  // Fetch package price
  let amount = 0;
  let subtotal = 0;
  let taxAmount = 0;

  if (packageId) {
    const { data: pkg } = await supabase.from("packages").select("price").eq("id", packageId).single();
    if (pkg) {
      amount = Number(pkg.price);
      if (taxInclusive) {
        subtotal = amount / (1 + taxRate / 100);
        taxAmount = amount - subtotal;
      } else {
        subtotal = amount;
        taxAmount = amount * (taxRate / 100);
        amount = subtotal + taxAmount;
      }
    }
  }

  // Generate invoice number: INV-YYYYMMDD-XXXX
  const now = new Date();
  const datePart = now.getFullYear().toString()
    + String(now.getMonth() + 1).padStart(2, "0")
    + String(now.getDate()).padStart(2, "0");
  const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
  const invoiceNumber = "INV-" + datePart + "-" + randomPart;

  const { error } = await supabase.from("invoices").insert({
    invoice_number: invoiceNumber,
    member_id: memberId || null,
    package_id: packageId || null,
    amount: amount,
    subtotal: subtotal,
    tax_amount: taxAmount,
    status: "UNPAID",
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/invoices");
  redirect("/invoices");
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
