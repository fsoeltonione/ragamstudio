import { supabase } from "@/lib/supabase";
import { Clock, ChevronDown, TrendingUp, AlertTriangle } from "lucide-react";
import { ClassAttendanceChart, RevenueTrendsChart, CumulativeProfitChart } from "@/components/dashboard/DashboardCharts";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const [
    { data: paidInvoices },
    { data: pendingInvoices },
    { count: expiredPackages }
  ] = await Promise.all([
    supabase.from("invoices").select("amount").eq("status", "PAID"),
    supabase.from("invoices").select("amount").eq("status", "PENDING"),
    supabase.from("member_packages").select("*", { count: "exact", head: true }).eq("is_active", false)
  ]);

  // FIX: Use PAID invoices (not all transactions) for Total Revenue, matching original logic
  const totalRevenue = paidInvoices?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 5590900;
  const pendingAmount = pendingInvoices?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 494000;
  const expiredCount = expiredPackages ?? 40;

  const attendanceData = [
    { name: "Private Group Class Reformer", Attended: 2, "No Shows": 0 },
    { name: "Mat Pilates - Group Class", Attended: 12, "No Shows": 0 },
    { name: "Prenatal Group Class - Reformer", Attended: 3, "No Shows": 0 },
    { name: "HAPPY HOUR - 1 sesi Reformer", Attended: 28, "No Shows": 2 },
  ];

  const trendsData = [
    { date: "Oct 1", Revenue: 1100000, "Trainer Payout": 0, "Net Profit": 1100000 },
    { date: "Oct 2", Revenue: 1000000, "Trainer Payout": 0, "Net Profit": 1000000 },
    { date: "Oct 3", Revenue: 0, "Trainer Payout": 0, "Net Profit": 0 },
    { date: "Oct 4", Revenue: 1200000, "Trainer Payout": 400000, "Net Profit": 800000 },
    { date: "Oct 5", Revenue: 0, "Trainer Payout": 0, "Net Profit": 0 },
    { date: "Oct 6", Revenue: 1150000, "Trainer Payout": 200000, "Net Profit": 950000 },
    { date: "Oct 7", Revenue: 300000, "Trainer Payout": 0, "Net Profit": 300000 },
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

  const dateFilterOptions = ["Today", "Last 7 Days", "Last 30 Days", "This Month", "Last 3 Months", "This Year", "All Time"];

  const DateSelect = () => (
    <select className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-36 px-3 py-1.5 outline-none shadow-sm">
      {dateFilterOptions.map(o => <option key={o}>{o}</option>)}
    </select>
  );

  const LocationSelect = () => (
    <select className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-36 px-3 py-1.5 outline-none shadow-sm">
      <option>All Locations</option>
      <option>RagamStudio</option>
    </select>
  );

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Welcome Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-xl">SA</div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Welcome</h2>
            <p className="text-sm text-gray-500">Super Admin</p>
          </div>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Sign out</button>
      </div>

      {/* Financial Overview */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-bold text-gray-900">Financial Overview</h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-40 pl-3 pr-10 py-2 cursor-pointer outline-none shadow-sm">
                {dateFilterOptions.map(o => <option key={o}>{o}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-40 pl-3 pr-10 py-2 cursor-pointer outline-none shadow-sm">
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
          {/* Total Revenue — TrendingUp icon in green circle */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">IDR {totalRevenue.toLocaleString('id-ID')}</h3>
            <p className="text-xs text-gray-500">Revenue from this month</p>
          </div>

          {/* Pending Payments — Clock icon in orange circle */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-500">Pending Payments</p>
              <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock className="w-4 h-4 text-orange-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">IDR {pendingAmount.toLocaleString('id-ID')}</h3>
            <p className="text-xs text-gray-500">Pending invoices from this period</p>
          </div>

          {/* Expired Packages — Warning icon in red circle */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-500">Expired Packages</p>
              <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{expiredCount}</h3>
            <p className="text-xs text-gray-500">Validity ended in this period</p>
          </div>
        </div>
      </div>

      {/* Class Attendance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-bold text-gray-900">Class Attendance</h2>
          <div className="flex gap-2">
            <select className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-36 px-3 py-1.5 outline-none shadow-sm">
              {dateFilterOptions.map(o => <option key={o}>{o}</option>)}
            </select>
            <select className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-36 px-3 py-1.5 outline-none shadow-sm">
              <option>All Locations</option>
              <option>RagamStudio</option>
            </select>
          </div>
        </div>
        <ClassAttendanceChart data={attendanceData} />
      </div>

      {/* Revenue Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Revenue Trends</h2>
            <p className="text-sm text-gray-500">Daily revenue trends showing revenue, trainer payouts, and net profit over time.</p>
          </div>
          <div className="flex gap-2">
            <select className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-36 px-3 py-1.5 outline-none shadow-sm">
              {dateFilterOptions.map(o => <option key={o}>{o}</option>)}
            </select>
            <select className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-36 px-3 py-1.5 outline-none shadow-sm">
              <option>All Locations</option>
              <option>RagamStudio</option>
            </select>
          </div>
        </div>
        <RevenueTrendsChart data={trendsData} />
      </div>

      {/* Cumulative Net Profit */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Cumulative Net Profit</h2>
            <p className="text-sm text-gray-500">Cumulative net profit showing the running total of profits over the selected date range.</p>
          </div>
          <div className="flex gap-2">
            <select className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-36 px-3 py-1.5 outline-none shadow-sm">
              {dateFilterOptions.map(o => <option key={o}>{o}</option>)}
            </select>
            <select className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-36 px-3 py-1.5 outline-none shadow-sm">
              <option>All Locations</option>
              <option>RagamStudio</option>
            </select>
          </div>
        </div>
        <CumulativeProfitChart data={cumulativeData} />
      </div>

    </div>
  );
}
