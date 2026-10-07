import { Search, Filter, X, Columns } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";

export const dynamic = 'force-dynamic';

export default async function ShopSalesPage() {
  const { data: sales } = await supabase
    .from("shop_sales")
    .select("*, shops(name)")
    .order("sold_at", { ascending: false });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[500px]">
      
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-100 flex justify-end gap-2 bg-gray-50/50">
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
        </div>
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-300 bg-white flex items-center justify-center relative">
          <Filter className="w-4 h-4" />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-300 bg-white flex items-center justify-center">
          <Columns className="w-4 h-4" />
        </button>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm text-left text-gray-500 min-w-max">
          <thead className="text-xs text-gray-700 bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-bold whitespace-nowrap">Sale number</th>
              <th className="px-6 py-4 font-bold whitespace-nowrap">Customer</th>
              <th className="px-6 py-4 font-bold whitespace-nowrap">Shop</th>
              <th className="px-6 py-4 font-bold whitespace-nowrap">Payment Method</th>
              <th className="px-6 py-4 font-bold whitespace-nowrap cursor-pointer hover:text-gray-900">
                <div className="flex items-center gap-1">Total <span className="text-[10px]">▼</span></div>
              </th>
              <th className="px-6 py-4 font-bold whitespace-nowrap">Status</th>
              <th className="px-6 py-4 font-bold whitespace-nowrap cursor-pointer hover:text-gray-900">
                <div className="flex items-center gap-1">Sold at <span className="text-[10px]">▼</span></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sales && sales.length > 0 ? (
              sales.map((sale) => (
                <tr key={sale.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{sale.sale_number}</td>
                  <td className="px-6 py-4">{sale.customer_name || 'Guest'}</td>
                  <td className="px-6 py-4">{sale.shops?.name || 'All Shops'}</td>
                  <td className="px-6 py-4 text-gray-500">{sale.payment_method || '-'}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">Rp {Number(sale.total).toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4">
                    <span className={["px-2.5 py-1 rounded-full text-xs font-bold", sale.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'].join(' ')}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{format(new Date(sale.sold_at), 'dd MMM yyyy, HH:mm')}</td>
                </tr>
              ))
            ) : null}
          </tbody>
        </table>
      </div>

      {(!sales || sales.length === 0) && (
        <div className="flex-1 flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
            <X className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-gray-900">No shop sales</h3>
        </div>
      )}
      
    </div>
  );
}
