"use client";

import { updatePromoCode } from "../../actions";
import Link from "next/link";
import { Tag } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function EditPromoCodePage({ params }: { params: { id: string } }) {
  const [promo, setPromo] = useState<any>(null);
  const [discountType, setDiscountType] = useState("PERCENT");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("promo_codes").select("*").eq("id", params.id).single();
      if (data) {
        setPromo(data);
        if (data.discount_fixed > 0) setDiscountType("FIXED");
      }
      setLoading(false);
    }
    load();
  }, [params.id]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
  if (!promo) return <div className="p-8 text-center text-red-500">Promo code not found.</div>;

  const updateWithId = updatePromoCode.bind(null, params.id);

  // Format datetime-local string (YYYY-MM-DDThh:mm)
  let defaultExpires = "";
  if (promo.expires_at) {
    const d = new Date(promo.expires_at);
    // adjust for local timezone offset crudely
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    defaultExpires = d.toISOString().slice(0, 16);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/promo-codes" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium">
          &larr; Back to Promo Codes
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Promo Code</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form action={updateWithId} className="space-y-0">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Promo Code <sup className="text-red-500">*</sup>
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="code"
                  name="code"
                  required
                  defaultValue={promo.code}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none uppercase font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="discount_type" className="block text-sm font-medium text-gray-700">
                  Discount Type
                </label>
                <select
                  id="discount_type"
                  name="discount_type"
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="PERCENT">Percentage (%)</option>
                  <option value="FIXED">Fixed Amount (Rp)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="discount_value" className="block text-sm font-medium text-gray-700">
                  Discount Value <sup className="text-red-500">*</sup>
                </label>
                <input
                  type="number"
                  id="discount_value"
                  name="discount_value"
                  required
                  min="1"
                  defaultValue={discountType === "PERCENT" ? promo.discount_percent : promo.discount_fixed}
                  max={discountType === "PERCENT" ? "100" : undefined}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-gray-100">
              <div className="space-y-2">
                <label htmlFor="max_uses" className="block text-sm font-medium text-gray-700">
                  Maximum Uses
                </label>
                <input
                  type="number"
                  id="max_uses"
                  name="max_uses"
                  min="1"
                  defaultValue={promo.max_uses || ""}
                  placeholder="Leave blank for unlimited"
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Currently used: {promo.used_count || 0} times</p>
              </div>
              <div className="space-y-2">
                <label htmlFor="expires_at" className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="datetime-local"
                  id="expires_at"
                  name="expires_at"
                  defaultValue={defaultExpires}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-700"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                value="true"
                defaultChecked={promo.is_active}
                className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                Active
              </label>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 flex gap-3 border-t border-gray-200">
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 focus:outline-none transition-colors shadow-sm">
              Save Changes
            </button>
            <Link href="/promo-codes" className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
