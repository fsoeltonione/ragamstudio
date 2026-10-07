import { createPromoCode } from "../actions";
import Link from "next/link";
import { Tag, Percent, DollarSign } from "lucide-react";

export default function CreatePromoPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/promo-codes" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block">
          &larr; Back to Promo Codes
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add Promo Code</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form action={createPromoCode} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">Promo Code String *</label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" id="code" name="code" required placeholder="e.g. FLASH20" className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 uppercase rounded-lg focus:ring-2 focus:ring-orange-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t pt-4">
            <div className="space-y-2">
              <label htmlFor="discount_percent" className="block text-sm font-medium text-gray-700">Discount Percent (%)</label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="number" id="discount_percent" name="discount_percent" defaultValue={0} max={100} className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="discount_fixed" className="block text-sm font-medium text-gray-700">Fixed Discount (Rp)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="number" id="discount_fixed" name="discount_fixed" defaultValue={0} className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t">
            <Link href="/promo-codes" className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg">Cancel</Link>
            <button type="submit" className="px-6 py-2 text-sm text-white bg-orange-500 rounded-lg hover:bg-orange-600">Save Promo</button>
          </div>
        </form>
      </div>
    </div>
  );
}
