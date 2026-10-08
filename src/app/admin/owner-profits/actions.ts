"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function generateMonthlyProfit(formData: FormData) {
  const year = parseInt(formData.get("year") as string);
  const month = parseInt(formData.get("month") as string);

  const startDate = new Date(year, month - 1, 1).toISOString();
  const endDate = new Date(year, month, 0, 23, 59, 59).toISOString();

  // Get total revenue from member package transactions
  const { data: txData } = await supabase
    .from("transactions")
    .select("amount")
    .gte("created_at", startDate)
    .lte("created_at", endDate);

  // Get shop sales revenue for the period
  const { data: shopSales } = await supabase
    .from("shop_sales")
    .select("total")
    .gte("sold_at", startDate)
    .lte("sold_at", endDate);

  const memberRevenue =
    txData?.reduce((sum, t) => sum + Number(t.amount), 0) || 0;
  const shopRevenue =
    shopSales?.reduce((sum, s) => sum + Number(s.total), 0) || 0;
  const totalRevenue = memberRevenue + shopRevenue;

  // Get trainer payments for the period
  const { data: trainerPay } = await supabase
    .from("trainer_payments")
    .select("amount")
    .gte("payment_date", startDate)
    .lte("payment_date", endDate);

  const trainerExpenses =
    trainerPay?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;

  // Get shop COGS from purchase items
  const { data: purchases } = await supabase
    .from("shop_purchases")
    .select("total_amount")
    .gte("created_at", startDate)
    .lte("created_at", endDate);

  const shopCogs =
    purchases?.reduce((sum, p) => sum + Number(p.total_amount), 0) || 0;

  // Get bookings count
  const { data: bookings } = await supabase
    .from("bookings")
    .select("id")
    .gte("created_at", startDate)
    .lte("created_at", endDate);

  const bookingsCount = bookings?.length || 0;
  const salesCount = (txData?.length || 0) + (shopSales?.length || 0);
  const netProfit = totalRevenue - trainerExpenses - shopCogs;

  const { error } = await supabase
    .from("owner_profits")
    .upsert(
      {
        period_year: year,
        period_month: month,
        total_revenue: totalRevenue,
        trainer_expenses: trainerExpenses,
        shop_cogs: shopCogs,
        net_profit: netProfit,
        bookings_count: bookingsCount,
        sales_count: salesCount,
        status: "COMPLETED",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "period_year,period_month" }
    );

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/owner-profits");
  return;
}

export async function deleteOwnerProfit(id: string) {
  const { error } = await supabase
    .from("owner_profits")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/owner-profits");
  return;
}
