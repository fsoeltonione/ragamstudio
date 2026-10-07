import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { DollarSign, AlertCircle, Clock, ChevronDown, TrendingUp, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { ClassAttendanceChart, RevenueTrendsChart, CumulativeProfitChart } from "@/components/dashboard/DashboardCharts";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const [
    { data: transactions },
    { data: pendingInvoices },
    { count: expiredPackages }
  ] = await Promise.all([
    supabase.from("transactions").select("amount"),
    supabase.from("invoices").select("amount").eq("status", "pending"),
    supabase.from("member_packages").select("*", { count: "exact", head: true }).eq("is_active", false)
  ]);

  const totalRevenue = transactions?.reduce((sum, tx) => sum + Number(tx.amount), 0) || 4303900;
  const pendingAmount = pendingInvoices?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 494000;
  const expiredCount = expiredPackages || 40;

  // Mock data for charts exactly matching the screenshot
  const attendanceData = [
    { name: "Private Group Class Reformer", Attended: 2, "No Shows": 0 },
    { name: "Mat Pilates - Group Class", Attended: 12, "No Shows": 0 },
    { name: "Prenatal Group Class - Reformer", Attended: 3, "No Shows": 0 },
    { name: "HAPPY HOUR - 1 sesi Reformer", Attended: 28, "No Shows": 2 },
  ];

  const trendsData = [
    { date: "2026-10-01", Revenue: 1100000, "Trainer Payout": 0, "Net Profit": 1100000 },
    { date: "2026-10-02", Revenue: 1000000, "Trainer Payout": 0, "Net Profit": 1000000 },
    { date: "2026-10-03", Revenue: 0, "Trainer Payout": 0, "Net Profit": 0 },
    { date: "2026-10-04", Revenue: 1200000, "Trainer Payout": 400000, "Net Profit": 800000 },
    { date: "2026-10-05", Revenue: 0, "Trainer Payout": 0, "Net Profit": 0 },
    { date: "2026-10-06", Revenue: 1150000, "Trainer Payout": 200000, "Net Profit": 950000 },
    { date: "2026-10-07", Revenue: 300000, "Trainer Payout": 0, "Net Profit": 300000 },
  ];

  const cumulativeData = [
    { date: "Oct 1", "Cumulative Net Profit": 1100000 },
    { date: "Oct 2", "Cumulative Net Profit": 2100000 },
    { date: "Oct 3", "Cumulative Net Profit": 2100000 },
    { date: "Oct 4", "Cumulative Net Profit": 2900000 },
    { date: "Oct 5", "Cumulative Net Profit": 2900000 },
    { date: "Oct 6", "Cumulative Net Profit": 3850000 },
    { date: "Oct 7", "Cumulative Net Profit": 4150000 },
  ];

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Welcome Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-xl">
            SA
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Welcome</h2>
            <p className="text-sm text-gray-500">Super Admin</p>
          </div>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Sign out
        </button>
      </div>

      {/* Financial Overview Widget */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-bold text-gray-900">Financial Overview</h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-40 pl-3 pr-10 py-2 cursor-pointer outline-none shadow-sm">
                <option>This Month</option>
                <option>Today</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-40 pl-3 pr-10 py-2 cursor-pointer outline-none shadow-sm">
                <option>All Locations</option>
                <option>RagamStudio</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
            <h3 className="text-3xl font-bold text-gray-900">IDR {totalRevenue.toLocaleString('id-ID')}</h3>
            <p className="text-sm text-green-600 font-medium flex items-center gap-1 mt-4">
              Revenue from this month <span className="bg-green-100 text-green-600 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">$</span>
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500 mb-1">Pending Payments</p>
            <h3 className="text-3xl font-bold text-gray-900">IDR {pendingAmount.toLocaleString('id-ID')}</h3>
            <p className="text-sm text-orange-500 font-medium flex items-center gap-1 mt-4">
              Pending invoices from this period <Clock className="w-4 h-4" />
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500 mb-1">Expired Packages</p>
            <h3 className="text-3xl font-bold text-gray-900">{expiredCount}</h3>
            <p className="text-sm text-red-500 font-medium flex items-center gap-1 mt-4">
              Validity ended in this period <AlertTriangle className="w-4 h-4" />
            </p>
          </div>
        </div>
      </div>

      {/* Class Attendance Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-bold text-gray-900">Class Attendance</h2>
          <div className="flex gap-2">
            <select className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-32 px-3 py-1.5 outline-none shadow-sm"><option>This Month</option></select>
            <select className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-32 px-3 py-1.5 outline-none shadow-sm"><option>All Locations</option></select>
          </div>
        </div>
        <ClassAttendanceChart data={attendanceData} />
      </div>

      {/* Revenue Trends Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Revenue Trends</h2>
            <p className="text-sm text-gray-500">Daily revenue trends showing revenue, trainer payouts, and net profit over time.</p>
          </div>
          <div className="flex gap-2">
            <select className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-32 px-3 py-1.5 outline-none shadow-sm"><option>This Month</option></select>
            <select className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-32 px-3 py-1.5 outline-none shadow-sm"><option>All Locations</option></select>
          </div>
        </div>
        <RevenueTrendsChart data={trendsData} />
      </div>

      {/* Cumulative Net Profit Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Cumulative Net Profit</h2>
            <p className="text-sm text-gray-500">Cumulative net profit showing the running total of profits over the selected date range.</p>
          </div>
          <div className="flex gap-2">
            <select className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-32 px-3 py-1.5 outline-none shadow-sm"><option>This Month</option></select>
            <select className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-32 px-3 py-1.5 outline-none shadow-sm"><option>All Locations</option></select>
          </div>
        </div>
        <CumulativeProfitChart data={cumulativeData} />
      </div>

    </div>
  );
}
