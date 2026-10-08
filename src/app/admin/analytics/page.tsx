import { supabase } from "@/lib/supabase";
import AnalyticsDashboard from "./AnalyticsDashboard";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  // Fetch real data from Supabase
  const { data: invoices } = await supabase.from("invoices").select("*");
  const { data: memberPackages } = await supabase.from("member_packages").select("*, package:packages(name)");
  const { data: members } = await supabase.from("members").select("id, created_at, status");
  const { data: trainers } = await supabase.from("users").select("*").eq("role", "Trainer");
  const { data: trainerPayments } = await supabase.from("trainer_payments").select("*");
  const { data: studioClasses } = await supabase.from("studio_classes").select("*, class_type:class_types(name)");

  // 1. Total Revenue (PAID invoices)
  const totalRevenue = invoices
    ?.filter((inv) => inv.status === "PAID")
    .reduce((sum, inv) => sum + (inv.amount || 0), 0) || 0;

  // 2. Pending Payments (PENDING invoices)
  const pendingPayments = invoices
    ?.filter((inv) => inv.status === "PENDING")
    .reduce((sum, inv) => sum + (inv.amount || 0), 0) || 0;

  // 3. Expired Packages
  const now = new Date().toISOString();
  const expiredPackagesCount = memberPackages
    ?.filter((pkg) => pkg.expires_at && pkg.expires_at < now)
    .length || 0;

  // 4. Package Credit Status (Redeemed vs Remaining vs Expired)
  let totalCredits = 0;
  let remainingCredits = 0;
  let expiredCredits = 0;
  const nowIso = new Date().toISOString();
  memberPackages?.forEach((pkg) => {
    totalCredits += pkg.total_sessions || 0;
    if (pkg.expires_at && pkg.expires_at < nowIso) {
      // credits on expired packages count as expired, not remaining
      expiredCredits += Math.max(0, pkg.sessions_left || 0);
    } else {
      remainingCredits += Math.max(0, pkg.sessions_left || 0);
    }
  });
  // Redeemed = total - remaining - expired (never negative)
  const redeemedCredits = Math.max(0, totalCredits - remainingCredits - expiredCredits);
  const creditStatusData = [
    { name: "Redeemed", value: redeemedCredits },
    { name: "Remaining", value: remainingCredits },
    { name: "Expired", value: expiredCredits },
  ];

  // 5. Package Sales Trend (Invoices over last 7 days)
  // Simplified: group by created_at day
  const salesTrendMap: Record<string, number> = {};
  invoices?.filter(i => i.status === "PAID").forEach((inv) => {
    const date = new Date(inv.created_at).toLocaleDateString("id-ID", { month: "short", day: "numeric" });
    salesTrendMap[date] = (salesTrendMap[date] || 0) + (inv.amount || 0);
  });
  const salesTrendData = Object.keys(salesTrendMap).map(date => ({
    name: date,
    sales: salesTrendMap[date],
  }));

  // 6. Package Sales Performance (Top Packages by member_packages count)
  const packageSalesMap: Record<string, number> = {};
  memberPackages?.forEach((mp) => {
    const pkgName = mp.package?.name || "Unknown";
    packageSalesMap[pkgName] = (packageSalesMap[pkgName] || 0) + 1;
  });
  const packageSalesPerformance = Object.keys(packageSalesMap)
    .map(name => ({ name, sales: packageSalesMap[name] }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  // 7. Member Churn vs Retention
  const activeMembers = members?.filter(m => m.status === "Active").length || 0;
  const inactiveMembers = members?.filter(m => m.status !== "Active").length || 0;
  const churnData = [
    { name: "Retained", value: activeMembers },
    { name: "Churned", value: inactiveMembers },
  ];

  // 8. Member Repurchase Rate (Mock logic for now, real calculation is complex)
  const repurchaseRate = "0%";

  // 9. Member Join Trend
  const joinTrendMap: Record<string, number> = {};
  members?.forEach((m) => {
    const date = new Date(m.created_at).toLocaleDateString("id-ID", { month: "short", day: "numeric" });
    joinTrendMap[date] = (joinTrendMap[date] || 0) + 1;
  });
  const joinTrendData = Object.keys(joinTrendMap).map(date => ({
    name: date,
    sales: joinTrendMap[date], // mapped as sales for the chart
  }));

  // 10. Trainer Performance
  const trainerPerformance = trainers?.map((t) => {
    const payout = trainerPayments?.filter(tp => tp.user_id === t.id).reduce((sum, tp) => sum + (tp.amount || 0), 0) || 0;
    return {
      id: t.id,
      name: t.name,
      payout,
      attended: 0, // needs bookings join
      noShow: 0,
      attendanceRate: "0%"
    };
  }) || [];

  // 11. Class Performance
  const classPerformance = studioClasses?.map((c) => {
    return {
      id: c.id,
      name: c.class_type?.name || "Unknown Class",
      totalClasses: 1,
      capacity: c.capacity || 0,
      attendanceRate: "0%"
    };
  }) || [];

  return (
    <AnalyticsDashboard 
      totalRevenue={totalRevenue}
      pendingPayments={pendingPayments}
      expiredPackagesCount={expiredPackagesCount}
      creditStatusData={creditStatusData}
      salesTrendData={salesTrendData.length ? salesTrendData : [{name: "No Data", sales: 0}]}
      packageSalesPerformance={packageSalesPerformance.length ? packageSalesPerformance : [{name: "No Data", sales: 0}]}
      churnData={churnData}
      repurchaseRate={repurchaseRate}
      joinTrendData={joinTrendData.length ? joinTrendData : [{name: "No Data", sales: 0}]}
      trainerPerformance={trainerPerformance}
      classPerformance={classPerformance}
    />
  );
}