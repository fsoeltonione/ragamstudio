import { supabase } from "@/lib/supabase";
import { createShopPurchase } from "../actions";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function CreateShopPurchasePage() {
  const { data: vendors } = await supabase.from("shop_vendors").select("id, name").order("name");
  const { data: products } = await supabase.from("shop_products").select("id, name, uom, avg_cost").eq("is_active", true).order("name");
  const { data: shops } = await supabase.from("locations").select("id, name").order("name"); // assuming shop=location

  const todayStr = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Link href="/shop-management/purchases" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium">
          &larr; Back to Shop Purchases
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Shop Purchase</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form action={createShopPurchase} className="space-y-0">
          <div className="p-6 space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label htmlFor="shop_id" className="block text-sm font-medium text-gray-700">Shop <sup className="text-red-500">*</sup></label>
                <select id="shop_id" name="shop_id" required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                  <option value="">Select an option</option>
                  {shops?.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="vendor_id" className="block text-sm font-medium text-gray-700">Vendor</label>
                <select id="vendor_id" name="vendor_id" className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                  <option value="">Select an option</option>
                  {vendors?.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="purchase_date" className="block text-sm font-medium text-gray-700">Purchase Date <sup className="text-red-500">*</sup></label>
                <input type="date" id="purchase_date" name="purchase_date" defaultValue={todayStr} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
              <div className="space-y-2">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select id="status" name="status" className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                  <option value="PENDING">Pending</option>
                  <option value="RECEIVED">Received / Completed</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea id="notes" name="notes" rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 resize-none" />
            </div>

            {/* Purchase Items */}
            <div className="space-y-3 pt-4">
              <h3 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">Purchase Items</h3>

              <div className="border border-gray-200 rounded-lg overflow-x-auto">
                <table className="w-full text-sm min-w-[800px]">
                  <thead className="bg-gray-50 text-xs text-gray-700 font-bold border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 font-medium text-left">Product *</th>
                      <th className="px-4 py-3 font-medium text-left w-20">Qty *</th>
                      <th className="px-4 py-3 font-medium text-left w-28">Purchase UOM *</th>
                      <th className="px-4 py-3 font-medium text-left w-24">Conversion *</th>
                      <th className="px-4 py-3 font-medium text-left w-32">Cost per UOM *</th>
                      <th className="px-4 py-3 font-medium text-left w-20">Base Qty</th>
                      <th className="px-4 py-3 font-medium text-left w-24">Base Cost</th>
                      <th className="px-4 py-3 font-medium text-left w-32">Subtotal</th>
                      <th className="px-4 py-3 font-medium text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[0, 1, 2].map(i => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <select name="product_id[]" className="w-full px-2 py-1.5 bg-white border border-gray-300 rounded text-sm focus:ring-1 focus:ring-orange-500">
                            <option value="">-- Select Product --</option>
                            {products?.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <input type="number" name="qty[]" defaultValue={1} min={1} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-orange-500" />
                        </td>
                        <td className="px-4 py-3">
                          <select name="purchase_uom[]" className="w-full px-2 py-1.5 bg-white border border-gray-300 rounded text-sm focus:ring-1 focus:ring-orange-500">
                            <option value="PCS">PCS</option>
                            <option value="BOX">BOX</option>
                            <option value="PAIRS">PAIRS</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <input type="number" name="conversion[]" defaultValue={1} min={1} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-orange-500" />
                        </td>
                        <td className="px-4 py-3">
                          <input type="number" name="cost_per_uom[]" defaultValue={0} min={0} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-orange-500" />
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs">auto</td>
                        <td className="px-4 py-3 text-gray-500 text-xs">auto</td>
                        <td className="px-4 py-3 text-gray-500 text-xs font-bold">0</td>
                        <td className="px-4 py-3">
                          <input type="text" name="item_notes[]" className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-orange-500" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          <div className="px-6 py-4 bg-gray-50 flex flex-wrap gap-3 border-t border-gray-200">
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 focus:outline-none transition-colors shadow-sm">
              Create
            </button>
            <button type="button" className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors">
              Create &amp; create another
            </button>
            <Link href="/shop-management/purchases" className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
