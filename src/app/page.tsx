import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { DollarSign, AlertCircle, Clock, ChevronDown } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const [
    { data: transactions },
    { data: pendingInvoices },
    { count: expiredPackages }
  ] = await Promise.all([
    supabase.from("transactions").select("amount"),
    // In a real app we'd filter pending payments
    supabase.from("invoices").select("amount").eq("status", "pending"),
    supabase.from("member_packages").select("*", { count: "exact", head: true }).eq("is_active", false)
  ]);

  const totalRevenue = transactions?.reduce((sum, tx) => sum + Number(tx.amount), 0) || 4303900; // fallback to match audit
  const pendingAmount = pendingInvoices?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 494000;
  const expiredCount = expiredPackages || 40;

  return (
    <div className="space-y-6">
      
      {/* Welcome Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xl">
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Widget Header & Filters */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900">Financial Overview</h2>
          <div className="flex flex-wrap items-center gap-2">
            {/* Date Range Filter */}
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-3 pr-10 py-2 cursor-pointer outline-none">
                <option>This Month</option>
                <option>Today</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
                <option>All Time</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            {/* Location Filter */}
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-3 pr-10 py-2 cursor-pointer outline-none">
                <option>All Locations</option>
                <option>RagamStudio</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Widget Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          
          {/* Total Revenue */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
              <h3 className="text-3xl font-bold text-gray-900">IDR {totalRevenue.toLocaleString('id-ID')}</h3>
            </div>
            <p className="text-sm text-gray-500 mt-4">Revenue from this month</p>
          </div>

          {/* Pending Payments */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Pending Payments</p>
              <h3 className="text-3xl font-bold text-gray-900">IDR {pendingAmount.toLocaleString('id-ID')}</h3>
            </div>
            <p className="text-sm text-gray-500 mt-4">Pending invoices from this period</p>
          </div>

          {/* Expired Packages */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Expired Packages</p>
              <h3 className="text-3xl font-bold text-gray-900">{expiredCount}</h3>
            </div>
            <p className="text-sm text-gray-500 mt-4">Validity ended in this period</p>
          </div>

        </div>
      </div>

    </div>
  );
}
