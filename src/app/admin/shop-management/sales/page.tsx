import { supabase } from "@/lib/supabase";
import { Filter, Settings, Search, Download, Calculator } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function ShopSalesPage() {
  const { data: sales } = await supabase
    .from("shop_sales")
    .select("*, shop:shops(name)")
    .order("sold_at", { ascending: false });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 px-6 pt-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shop Sales</h1>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-lg font-medium transition-colors text-sm">
            <Download className="w-4 h-4" />
            Export All
          </button>
          <Link href="/pos" className="flex items-center gap-2 px-4 py-2 bg-[#ea580c] hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm text-sm">
            <Calculator className="w-4 h-4" />
            Point of Sale
          </Link>
        </div>
      </div>

      <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-white">
        <div className="flex items-center gap-2">
          <select className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option>Group by</option>
            <option value="sale_date">Sale Date</option>
          </select>
          <select className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option>Group direction</option>
            <option value="desc">Descending</option>
          </select>
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
          <thead className="text-xs text-gray-700 font-bold bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-4 whitespace-nowrap">Sale number</th>
              <th className="px-4 py-4 whitespace-nowrap">Customer</th>
              <th className="px-4 py-4 whitespace-nowrap">Shop</th>
              <th className="px-4 py-4 whitespace-nowrap">Payment Method</th>
              <th className="px-4 py-4 whitespace-nowrap">Total</th>
              <th className="px-4 py-4 whitespace-nowrap text-center">Status</th>
              <th className="px-4 py-4 whitespace-nowrap">Sold at</th>
              <th className="px-4 py-4 whitespace-nowrap text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {sales?.map((sale) => {
              const s = sale as any;
              return (
                <tr key={sale.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4 font-bold text-gray-900 whitespace-nowrap">
                    {sale.sale_number || "-"}
                  </td>
                  <td className="px-4 py-4 text-gray-900 whitespace-nowrap font-medium">
                    {sale.customer_name || "-"}
                  </td>
                  <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                    {s.shop?.name || "-"}
                  </td>
                  <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                    {sale.payment_method || "-"}
                  </td>
                  <td className="px-4 py-4 text-gray-900 font-medium whitespace-nowrap">
                    IDR {Number(sale.total).toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={"inline-flex px-2 py-1 rounded-md text-xs font-bold uppercase " + (sale.status === "COMPLETED" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700")}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                    {sale.sold_at ? format(new Date(sale.sold_at), "dd MMM yyyy, HH:mm") : "-"}
                  </td>
                  <td className="px-4 py-4 text-right whitespace-nowrap">
                    <button className="text-gray-600 hover:text-gray-900 font-medium text-sm mr-3">View</button>
                    <button className="text-red-600 hover:text-red-900 font-medium text-sm">Delete</button>
                  </td>
                </tr>
              );
            })}

            {!sales?.length && (
              <tr>
                <td colSpan={8} className="px-6 py-20 text-center text-gray-500">
                  No shop sales found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
