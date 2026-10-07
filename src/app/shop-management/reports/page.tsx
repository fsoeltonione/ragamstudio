import { Download, Search, FileText } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export default async function ShopReportsPage() {
  const { data: sales } = await supabase.from("shop_sales").select("total").eq("status", "COMPLETED");
  const { data: purchases } = await supabase.from("shop_purchases").select("total_amount").eq("status", "COMPLETED");
  
  const totalRevenue = sales?.reduce((sum, s) => sum + Number(s.total), 0) || 0;
  const totalSpent = purchases?.reduce((sum, p) => sum + Number(p.total_amount), 0) || 0;
  const grossProfit = totalRevenue - totalSpent; // Simplified for dummy UI, real GP uses COGS

  return (
    <div className="space-y-6">
      
      {/* Filters & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex gap-2">
          <select className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-40 px-3 py-2 shadow-sm outline-none">
            <option>All Shops</option>
          </select>
          <input type="date" className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block px-3 py-2 shadow-sm outline-none" />
          <input type="date" className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block px-3 py-2 shadow-sm outline-none" />
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Download className="w-4 h-4" />
          Export to PDF
        </button>
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-900">Rp {totalRevenue.toLocaleString('id-ID')}</p>
          <p className="text-sm text-gray-500 mt-1">Total income from sales</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Gross Profit</h3>
          <p className="text-3xl font-bold text-green-600">Rp {grossProfit.toLocaleString('id-ID')}</p>
          <p className="text-sm text-gray-500 mt-1">Revenue minus cost of goods sold</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Spent</h3>
          <p className="text-3xl font-bold text-red-600">Rp {totalSpent.toLocaleString('id-ID')}</p>
          <p className="text-sm text-gray-500 mt-1">Total cost of completed purchases</p>
        </div>
      </div>

      {/* Table 1: Product Sales Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <h2 className="text-lg font-bold text-gray-900">Product Sales Summary</h2>
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input type="text" placeholder="Search" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm outline-none" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-bold">Product</th>
                <th className="px-6 py-4 font-bold">Qty Sold</th>
                <th className="px-6 py-4 font-bold">Total Revenue</th>
                <th className="px-6 py-4 font-bold">Est. Profit</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <FileText className="w-8 h-8 mb-2 opacity-50" />
          <span className="text-sm text-gray-500">No shop sale items</span>
        </div>
      </div>

      {/* Table 2: Internal Stock Usage */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <h2 className="text-lg font-bold text-gray-900">Internal Stock Usage (Pemakaian Sendiri)</h2>
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input type="text" placeholder="Search" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm outline-none" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Shop</th>
                <th className="px-6 py-4 font-bold">Product</th>
                <th className="px-6 py-4 font-bold">Qty</th>
                <th className="px-6 py-4 font-bold">Cost / Unit</th>
                <th className="px-6 py-4 font-bold">Total Cost</th>
                <th className="px-6 py-4 font-bold">Adjusted By</th>
                <th className="px-6 py-4 font-bold">Notes</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <FileText className="w-8 h-8 mb-2 opacity-50" />
          <span className="text-sm text-gray-500">No stock adjustments with internal use reason recorded for this period.</span>
        </div>
      </div>

    </div>
  );
}
