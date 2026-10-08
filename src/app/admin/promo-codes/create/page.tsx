"use client";

import { createPromoCode } from "../actions";
import Link from "next/link";
import { Tag } from "lucide-react";
import { useState } from "react";

export default function CreatePromoCodePage() {
  const [discountType, setDiscountType] = useState("PERCENT");

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/promo-codes" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium">
          &larr; Back to Promo Codes
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">New Promo Code</h1>
      </div>

        <form action={createPromoCode} className="space-y-6 p-6">
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-bold text-gray-700">Basic Information</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                  Code <sup className="text-red-500">*</sup>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="code"
                    name="code"
                    required
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none uppercase font-mono"
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
                    max={discountType === "PERCENT" ? "100" : undefined}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                  Active
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="is_active" name="is_active" value="true" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-bold text-gray-700">Usage Limits &amp; Validity</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="max_uses" className="block text-sm font-medium text-gray-700">
                    Total Usage Limit
                  </label>
                  <input
                    type="number"
                    id="max_uses"
                    name="max_uses"
                    min="1"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="usage_limit_per_member" className="block text-sm font-medium text-gray-700">
                    Usage Limit Per Member
                  </label>
                  <input
                    type="number"
                    id="usage_limit_per_member"
                    name="usage_limit_per_member"
                    min="1"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="datetime-local"
                    id="start_date"
                    name="start_date"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="expires_at" className="block text-sm font-medium text-gray-700">
                    Valid until
                  </label>
                  <input
                    type="datetime-local"
                    id="expires_at"
                    name="expires_at"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 focus:outline-none transition-colors shadow-sm">
              Create
            </button>
            <button type="button" className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors">
              Create &amp; create another
            </button>
            <Link href="/promo-codes" className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center">
              Cancel
            </Link>
          </div>
        </form>
    </div>
  );
}
