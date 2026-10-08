import { supabase } from "@/lib/supabase";
import { PlusCircle, Settings, Search } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ShopVendorsPage() {
  const { data: vendors } = await supabase
    .from("shop_vendors")
    .select("*, shop_purchases(count)")
    .order("name", { ascending: true });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 px-6 pt-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shop Vendors</h1>
        </div>
        <Link href="/shop-management/vendors/create" className="flex items-center gap-2 px-4 py-2 bg-[#ea580c] hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm text-sm">
          <PlusCircle className="w-4 h-4" />
          New shop vendor
        </Link>
      </div>

      <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-white">
        <div></div>
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
              <th className="px-4 py-4 whitespace-nowrap">Vendor Name</th>
              <th className="px-4 py-4 whitespace-nowrap">Phone</th>
              <th className="px-4 py-4 whitespace-nowrap">Total Purchases</th>
              <th className="px-4 py-4 whitespace-nowrap text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {vendors?.map((vendor) => {
              const v = vendor as any;
              return (
              <tr key={vendor.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-4 font-bold text-gray-900 whitespace-nowrap">
                  {vendor.name}
                </td>
                <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                  {vendor.phone || "-"}
                </td>
                <td className="px-4 py-4 font-bold text-gray-900 whitespace-nowrap">
                  {v.shop_purchases?.[0]?.count || 0}
                </td>
                <td className="px-4 py-4 text-right whitespace-nowrap">
                  <button className="text-gray-600 hover:text-gray-900 font-medium text-sm mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900 font-medium text-sm">Delete</button>
                </td>
              </tr>
              );
            })}

            {!vendors?.length && (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center text-gray-500">
                  No vendors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
