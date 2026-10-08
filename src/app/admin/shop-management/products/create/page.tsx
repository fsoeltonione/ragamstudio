import { createShopProduct } from "../../actions";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CreateShopProductPage() {
  const { data: shops } = await supabase.from("shops").select("id, name").eq("is_active", true);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/shop-management/products" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium">
          &larr; Back to Shop Products
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Shop Product</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form action={createShopProduct} className="space-y-0">
          <div className="p-6 space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name <sup className="text-red-500">*</sup></label>
                <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div className="space-y-2">
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU</label>
                <input type="text" id="sku" name="sku" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="barcode" className="block text-sm font-medium text-gray-700">Barcode</label>
                <input type="text" id="barcode" name="barcode" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div className="space-y-2">
                <label htmlFor="uom" className="block text-sm font-medium text-gray-700">Unit of Measure (UOM) <sup className="text-red-500">*</sup></label>
                <select id="uom" name="uom" required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                  <option value="">Select an option</option>
                  <option value="PCS">PCS</option>
                  <option value="BOX">BOX</option>
                  <option value="PAIRS">PAIRS</option>
                  <option value="BOTTLE">BOTTLE</option>
                  <option value="BAG">BAG</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Selling Price <sup className="text-red-500">*</sup></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">IDR</span>
                  <input type="number" id="price" name="price" required min="0" defaultValue={0} className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="low_stock_threshold" className="block text-sm font-medium text-gray-700">Low Stock Threshold</label>
                <input type="number" id="low_stock_threshold" name="low_stock_threshold" min="0" defaultValue={0} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="procurement_type" className="block text-sm font-medium text-gray-700">Procurement Type <sup className="text-red-500">*</sup></label>
                <select id="procurement_type" name="procurement_type" required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                  <option value="">Select an option</option>
                  <option value="Beli Putus">Beli Putus</option>
                  <option value="Konsinyasi">Konsinyasi</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="shop_id" className="block text-sm font-medium text-gray-700">Shop <sup className="text-red-500">*</sup></label>
                <select id="shop_id" name="shop_id" required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                  <option value="">Select an option</option>
                  {shops?.map(shop => (
                    <option key={shop.id} value={shop.id}>{shop.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea id="description" name="description" rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 resize-none" />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="font-medium text-gray-900 text-sm">Is Active</div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="is_active" value="true" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>

          </div>

          <div className="px-6 py-4 bg-gray-50 flex flex-wrap gap-3 border-t border-gray-200">
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 focus:outline-none transition-colors shadow-sm">
              Create
            </button>
            <button type="button" className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors">
              Create & create another
            </button>
            <Link href="/shop-management/products" className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
