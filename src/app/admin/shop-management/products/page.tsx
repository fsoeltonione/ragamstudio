import { supabase } from "@/lib/supabase";
import { PlusCircle, Filter, Settings, Search } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ShopProductsPage() {
  const { data: products } = await supabase
    .from("shop_products")
    .select("*, shop:shops(name)")
    .order("name", { ascending: true });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 px-6 pt-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shop Products</h1>
        </div>
        <Link href="/shop-management/products/create" className="flex items-center gap-2 px-4 py-2 bg-[#ea580c] hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm text-sm">
          <PlusCircle className="w-4 h-4" />
          New shop product
        </Link>
      </div>

      {/* Toolbar */}
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
      
      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-4 font-medium whitespace-nowrap">Name</th>
              <th className="px-4 py-4 font-medium whitespace-nowrap">SKU</th>
              <th className="px-4 py-4 font-medium whitespace-nowrap">Barcode</th>
              <th className="px-4 py-4 font-medium whitespace-nowrap">UOM</th>
              <th className="px-4 py-4 font-medium whitespace-nowrap">Price</th>
              <th className="px-4 py-4 font-medium whitespace-nowrap">Avg Cost</th>
              <th className="px-4 py-4 font-medium whitespace-nowrap">Stock</th>
              <th className="px-4 py-4 font-medium whitespace-nowrap">Shop</th>
              <th className="px-4 py-4 font-medium whitespace-nowrap text-center">Is active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {products?.map((prod) => {
              const p = prod as any;
              return (
              <tr key={prod.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-4 font-bold text-gray-900 whitespace-nowrap">
                  {prod.name}
                </td>
                <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                  {prod.sku || "-"}
                </td>
                <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                  {prod.barcode || "-"}
                </td>
                <td className="px-4 py-4 text-gray-500 whitespace-nowrap uppercase">
                  {prod.uom || "PCS"}
                </td>
                <td className="px-4 py-4 text-gray-900 font-medium whitespace-nowrap">
                  IDR {prod.price?.toLocaleString('id-ID')}
                </td>
                <td className="px-4 py-4 text-gray-900 font-medium whitespace-nowrap">
                  IDR {prod.avg_cost?.toLocaleString('id-ID')}
                </td>
                <td className="px-4 py-4 text-gray-900 font-medium whitespace-nowrap">
                  {prod.stock}
                </td>
                <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                  {p.shop?.name || "-"}
                </td>
                <td className="px-4 py-4 text-center">
                  {prod.is_active ? <span className="text-green-600 font-bold">Yes</span> : <span className="text-gray-400">No</span>}
                </td>
              </tr>
              );
            })}

            {!products?.length && (
              <tr>
                <td colSpan={10} className="px-6 py-20 text-center text-gray-500">
                  No shop products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
