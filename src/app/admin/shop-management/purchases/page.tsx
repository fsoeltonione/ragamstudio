import { supabase } from "@/lib/supabase";
import { PlusCircle, Filter, Settings, Search } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function ShopPurchasesPage() {
  const { data: purchases } = await supabase
    .from("shop_purchases")
    .select("*, vendor:shop_vendors(name)")
    .order("created_at", { ascending: false });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 px-6 pt-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shop Purchases</h1>
        </div>
        <Link href="/shop-management/purchases/create" className="flex items-center gap-2 px-4 py-2 bg-[#ea580c] hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm text-sm">
          <PlusCircle className="w-4 h-4" />
          New shop purchase
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
          <thead className="text-xs text-gray-700 font-bold bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-4 whitespace-nowrap">Purchase date</th>
              <th className="px-4 py-4 whitespace-nowrap">Vendor</th>
              <th className="px-4 py-4 whitespace-nowrap">Total amount</th>
              <th className="px-4 py-4 whitespace-nowrap text-center">Status</th>
              <th className="px-4 py-4 whitespace-nowrap text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {purchases?.map((purchase) => {
              const p = purchase as any;
              return (
              <tr key={purchase.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-4 text-gray-900 whitespace-nowrap font-medium">
                  {format(new Date(purchase.purchase_date || purchase.created_at), "dd MMM yyyy")}
                </td>
                <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                  {p.vendor?.name || "-"}
                </td>
                <td className="px-4 py-4 text-gray-900 font-medium whitespace-nowrap">
                  IDR {purchase.total_amount?.toLocaleString('id-ID')}
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={"inline-flex px-2 py-1 rounded-md text-xs font-bold uppercase " + (purchase.status === 'RECEIVED' ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700")}>
                    {purchase.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-right whitespace-nowrap">
                  <button className="text-gray-600 hover:text-gray-900 font-medium text-sm mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900 font-medium text-sm">Delete</button>
                </td>
              </tr>
              );
            })}

            {!purchases?.length && (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-gray-500">
                  No shop purchases found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
