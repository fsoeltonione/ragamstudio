import { supabase } from "@/lib/supabase";
import { PlusCircle, Filter, Settings, Search } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function ShopStockAdjustmentsPage() {
  const { data: adjustments } = await supabase
    .from("shop_stock_adjustments")
    .select("*, shop:shops(name), product:shop_products(name), user:users(name)")
    .order("created_at", { ascending: false });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 px-6 pt-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shop Stock Adjustments</h1>
        </div>
        <Link href="/shop-management/stock-adjustments/create" className="flex items-center gap-2 px-4 py-2 bg-[#ea580c] hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm text-sm">
          <PlusCircle className="w-4 h-4" />
          New shop stock adjustment
        </Link>
      </div>

      <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-white">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
        <div className="flex items-center gap-2 relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button className="flex items-center p-1.5 text-gray-500 hover:bg-gray-100 rounded border border-transparent">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 bg-gray-50 border-b border-gray-200 uppercase">
            <tr>
              <th className="px-4 py-4 font-medium whitespace-nowrap">Date</th>
              <th className="px-4 py-4 font-medium whitespace-nowrap">Shop</th>
              <th className="px-4 py-4 font-medium whitespace-nowrap">Product</th>
              <th className="px-4 py-4 font-medium whitespace-nowrap">Type</th>
              <th className="px-4 py-4 font-medium whitespace-nowrap">Qty</th>
              <th className="px-4 py-4 font-medium whitespace-nowrap">Reason</th>
              <th className="px-4 py-4 font-medium whitespace-nowrap">Adjusted By</th>
              <th className="px-4 py-4 font-medium whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {adjustments?.map((adj) => {
              const a = adj as any;
              return (
              <tr key={adj.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-4 text-gray-900 font-medium whitespace-nowrap">
                  {format(new Date(adj.created_at), "dd MMM yyyy, HH:mm")}
                </td>
                <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                  {a.shop?.name || "-"}
                </td>
                <td className="px-4 py-4 font-bold text-gray-900 whitespace-nowrap">
                  {a.product?.name || "-"}
                </td>
                <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                  <span className={"inline-flex px-2 py-1 rounded-md text-xs font-bold uppercase " + (adj.type === 'ADD' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
                    {adj.type}
                  </span>
                </td>
                <td className="px-4 py-4 font-bold text-gray-900 whitespace-nowrap">
                  {adj.type === 'ADD' ? '+' : '-'}{adj.qty}
                </td>
                <td className="px-4 py-4 text-gray-500 whitespace-nowrap max-w-[200px] truncate">
                  {adj.reason || "-"}
                </td>
                <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                  {a.user?.name || "-"}
                </td>
                <td className="px-4 py-4 text-right whitespace-nowrap">
                  <button className="text-gray-600 hover:text-gray-900 font-medium text-sm">View</button>
                </td>
              </tr>
              );
            })}

            {!adjustments?.length && (
              <tr>
                <td colSpan={8} className="px-6 py-20 text-center text-gray-500">
                  No stock adjustments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
