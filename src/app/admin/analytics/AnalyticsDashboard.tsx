"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { DollarSign, Clock, Package } from "lucide-react";

const formatIDR = (val: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(val);

const DateFilter = ({ options = ["Last 7 Days", "Last 30 Days", "This Month", "Last 3 Months", "This Year", "All Time"], defaultValue = "This Month" }) => (
  <select defaultValue={defaultValue} className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 text-gray-600 bg-white">
    {options.map((o) => <option key={o}>{o}</option>)}
  </select>
);

const LocationFilter = () => (
  <select defaultValue="All Locations" className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 text-gray-600 bg-white">
    <option>All Locations</option>
    <option>RagamStudio</option>
  </select>
);

type Props = {
  totalRevenue: number;
  pendingPayments: number;
  expiredPackagesCount: number;
  creditStatusData: { name: string; value: number }[];
  salesTrendData: { name: string; sales: number }[];
  packageSalesPerformance: { name: string; sales: number }[];
  churnData: { name: string; value: number }[];
  repurchaseRate: string;
  joinTrendData: { name: string; sales: number }[];
  trainerPerformance: { id: string; name: string; payout: number; attended: number; noShow: number; attendanceRate: string }[];
  classPerformance: { id: string; name: string; totalClasses: number; capacity: number; attendanceRate: string }[];
};

export default function AnalyticsDashboard({
  totalRevenue,
  pendingPayments,
  expiredPackagesCount,
  creditStatusData,
  salesTrendData,
  packageSalesPerformance,
  churnData,
  repurchaseRate,
  joinTrendData,
  trainerPerformance,
  classPerformance,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Page title */}
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Analytics</h1>

      {/* ── Financial Overview ─────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-700">Financial Overview</h2>
          <div className="flex items-center gap-2">
            <DateFilter />
            <LocationFilter />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Revenue */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatIDR(totalRevenue)}</p>
              <p className="text-xs text-gray-400 mt-0.5">Revenue from this month</p>
            </div>
          </div>
          {/* Pending Payments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Payments</p>
              <p className="text-2xl font-bold text-gray-900">{formatIDR(pendingPayments)}</p>
              <p className="text-xs text-gray-400 mt-0.5">Pending invoices from this period</p>
            </div>
          </div>
          {/* Expired Packages */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Expired Packages</p>
              <p className="text-2xl font-bold text-gray-900">{expiredPackagesCount}</p>
              <p className="text-xs text-gray-400 mt-0.5">Validity ended in this period</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Charts Grid ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Package Credit Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Package Credit Status: Redeemed vs Remaining</h2>
            <LocationFilter />
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={creditStatusData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                  <Cell fill="#f59e0b" />
                  <Cell fill="#10b981" />
                  <Cell fill="#9ca3af" />
                </Pie>
                <Tooltip formatter={(v) => [v, ""]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 justify-center mt-2">
            {creditStatusData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: ["#f59e0b","#10b981","#9ca3af"][i] }} />
                {d.name}: {d.value}
              </div>
            ))}
          </div>
        </div>

        {/* Package Sales Trend — green area chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Package Sales Trend</h2>
            <div className="flex items-center gap-2">
              <DateFilter options={["Last 7 Days", "Last 30 Days", "This Month", "This Year"]} />
              <LocationFilter />
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesTrendData}>
                <defs>
                  <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} tickFormatter={(v) => formatIDR(v).replace("Rp", "").trim()} />
                <Tooltip formatter={(v: any) => [formatIDR(Number(v)), "Revenue"]} />
                <Area type="monotone" dataKey="sales" stroke="#22c55e" strokeWidth={2} fill="url(#greenGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Package Sales Performance (Top 5) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Package Sales Performance (Top 5)</h2>
            <div className="flex items-center gap-2">
              <DateFilter />
              <LocationFilter />
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={packageSalesPerformance} layout="vertical" margin={{ left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} width={100} />
                <Tooltip formatter={(v) => [v, "Sales"]} />
                <Bar dataKey="sales" fill="#ea580c" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* ── Additional Analytics Modules (Restoring Missing 1:1 Sections) ── */}
      
      {/* Trainers Summary Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-center items-center h-40">
        <h2 className="text-sm font-semibold text-gray-800 mb-2">Trainers</h2>
        <p className="text-4xl font-bold text-gray-900">{trainerPerformance.length}</p>
        <p className="text-xs text-gray-500 mt-2">Active trainers in this period</p>
      </div>

      {/* Revenue Report Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-sm font-semibold text-gray-800">Revenue Report</h2>
          <div className="flex flex-wrap items-center gap-2">
            <input type="date" className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none text-gray-600" />
            <span className="text-xs text-gray-400">to</span>
            <input type="date" className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none text-gray-600" />
            <select className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none text-gray-600"><option>All Classes</option></select>
            <select className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none text-gray-600"><option>All Trainers</option></select>
            <LocationFilter />
            <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 shadow-sm">Export</button>
          </div>
        </div>
        <div className="p-8 text-center text-gray-400 text-sm">
          Select date range to view revenue report data.
        </div>
      </div>

      {/* Booking Trends Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-800">Booking Trends</h2>
          <div className="flex items-center gap-2">
            <DateFilter />
            <LocationFilter />
          </div>
        </div>
        <div className="h-56 flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-lg">
          [Booking Trends Line Chart Placeholder]
        </div>
      </div>

      {/* ── Tables ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Trainer Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-800">Trainer Performance</h2>
            <input type="text" placeholder="Search..." className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3">Trainer</th>
                  <th className="px-5 py-3">Total Payout</th>
                  <th className="px-5 py-3 text-center">Attended</th>
                  <th className="px-5 py-3 text-center">No-Show</th>
                  <th className="px-5 py-3 text-right">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {trainerPerformance.length > 0 ? trainerPerformance.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50/50">
                    <td className="px-5 py-3 font-medium text-gray-900">{t.name}</td>
                    <td className="px-5 py-3 text-gray-600">{formatIDR(t.payout)}</td>
                    <td className="px-5 py-3 text-center">{t.attended}</td>
                    <td className="px-5 py-3 text-center">{t.noShow}</td>
                    <td className="px-5 py-3 text-right font-bold text-green-600">{t.attendanceRate}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={5} className="px-5 py-8 text-center text-gray-400">No trainer data yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-gray-100 flex justify-end">
            <select className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600 focus:outline-none">
              <option>5</option><option>10</option><option>25</option>
            </select>
          </div>
        </div>

        {/* Class Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-800">Class Performance</h2>
            <input type="text" placeholder="Search..." className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3">Class</th>
                  <th className="px-5 py-3 text-center">Total Classes</th>
                  <th className="px-5 py-3 text-right">Capacity Util.</th>
                  <th className="px-5 py-3 text-right">Attendance Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {classPerformance.length > 0 ? classPerformance.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/50">
                    <td className="px-5 py-3 font-medium text-gray-900">{c.name}</td>
                    <td className="px-5 py-3 text-center">{c.totalClasses}</td>
                    <td className="px-5 py-3 text-right">{c.capacity > 0 ? c.capacity + " seats" : "-"}</td>
                    <td className="px-5 py-3 text-right font-bold text-green-600">{c.attendanceRate}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={4} className="px-5 py-8 text-center text-gray-400">No class data yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-gray-100 flex justify-end">
            <select className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600 focus:outline-none">
              <option>5</option><option>10</option><option>25</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
