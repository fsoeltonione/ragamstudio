import { Download, Search, FileText } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function ShopReportsPage() {
  const { data: sales } = await supabase.from("shop_sales").select("total").eq("status", "COMPLETED");
  const { data: purchases } = await supabase.from("shop_purchases").select("total_amount").eq("status", "COMPLETED");

  const totalRevenue = sales?.reduce((sum, s) => sum + Number(s.total), 0) || 0;
  const totalSpent = purchases?.reduce((sum, p) => sum + Number(p.total_amount), 0) || 0;
  const grossProfit = totalRevenue - totalSpent;

  return (
    <div className="p-6 space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shop Reports</h1>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Download className="w-4 h-4" />
          Export to PDF
        </button>
      </div>

      {/* Date Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-40 px-3 py-2 shadow-sm outline-none">
          <option>All Shops</option>
        </select>
        <div className="flex items-center gap-2">
          <input type="date" className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block px-3 py-2 shadow-sm outline-none" />
          <span className="text-gray-400 text-sm">to</span>
          <input type="date" className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block px-3 py-2 shadow-sm outline-none" />
        </div>
      </div>

      {/* Stat Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-900">Rp {totalRevenue.toLocaleString("id-ID")}</p>
          <p className="text-sm text-gray-500 mt-1">Total income from completed sales</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Gross Profit</h3>
          <p className="text-3xl font-bold text-green-600">Rp {grossProfit.toLocaleString("id-ID")}</p>
          <p className="text-sm text-gray-500 mt-1">Revenue minus cost of goods sold (COGS)</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Spent</h3>
          <p className="text-3xl font-bold text-red-600">Rp {totalSpent.toLocaleString("id-ID")}</p>
          <p className="text-sm text-gray-500 mt-1">Total cost of completed purchases</p>
        </div>
      </div>

      {/* Table 1: Product Sales Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
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
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Qty Sold</th>
                <th className="px-6 py-4 font-medium">Total Revenue</th>
                <th className="px-6 py-4 font-medium">Est. Profit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <FileText className="w-8 h-8 mb-2 opacity-30 mx-auto" />
                  <span className="text-sm text-gray-500">No sales data for selected period.</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
