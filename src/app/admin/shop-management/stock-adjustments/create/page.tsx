import { supabase } from "@/lib/supabase";
import { createStockAdjustment } from "../actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CreateStockAdjustmentPage() {
  const { data: shops } = await supabase.from("shops").select("id, name").eq("is_active", true);
  const { data: products } = await supabase.from("shop_products").select("id, name, stock, uom").eq("is_active", true).order("name");

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/shop-management/stock-adjustments" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium">
          &larr; Back to Stock Adjustments
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Stock Adjustment</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form action={createStockAdjustment} className="space-y-0">
          <div className="p-6 space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="shop_id" className="block text-sm font-medium text-gray-700">Shop <sup className="text-red-500">*</sup></label>
                <select id="shop_id" name="shop_id" required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                  <option value="">Select an option</option>
                  {shops?.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="product_id" className="block text-sm font-medium text-gray-700">Product <sup className="text-red-500">*</sup></label>
                <select id="product_id" name="product_id" required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                  <option value="">Select an option</option>
                  {products?.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (Stock: {p.stock} {p.uom})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Adjustment Type <sup className="text-red-500">*</sup></label>
                <select id="type" name="type" required defaultValue="ADD" className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                  <option value="ADD">Add Stock</option>
                  <option value="SUBTRACT">Subtract Stock (Internal Use)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="qty" className="block text-sm font-medium text-gray-700">Quantity <sup className="text-red-500">*</sup></label>
                <input type="number" id="qty" name="qty" defaultValue={1} min={1} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason <sup className="text-red-500">*</sup></label>
              <select id="reason" name="reason" required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                <option value="">Select an option</option>
                <option value="Initial Stock">Initial Stock</option>
                <option value="Damaged">Damaged / Broken</option>
                <option value="Expired">Expired</option>
                <option value="Internal Use">Internal Use (Pemakaian Sendiri)</option>
                <option value="Count Correction">Stock Count Correction</option>
                <option value="Return to Vendor">Return to Vendor</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
              <strong>Note:</strong> Subtracting stock using "Internal Use" reason will appear in Shop Reports as internal consumption cost.
            </div>

          </div>

          <div className="px-6 py-4 bg-gray-50 flex flex-wrap gap-3 border-t border-gray-200">
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 focus:outline-none transition-colors shadow-sm">
              Create
            </button>
            <Link href="/shop-management/stock-adjustments" className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
