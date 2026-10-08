import { supabase } from "@/lib/supabase";
import { createInvoice } from "../actions";
import Link from "next/link";
import { FileText } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CreateInvoicePage() {
  const { data: members } = await supabase.from("members").select("id, name, email").order("name", { ascending: true });
  const { data: packages } = await supabase.from("packages").select("id, name, price").order("name", { ascending: true });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Link href="/invoices" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium">
            &larr; Back to Invoices
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Invoice</h1>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form action={createInvoice} className="space-y-6">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label htmlFor="member_id" className="block text-sm font-medium text-gray-700">Member <sup className="text-red-500">*</sup></label>
              <select id="member_id" name="member_id" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white">
                <option value="">Select an option</option>
                {members?.map((m) => (
                  <option key={m.id} value={m.id}>{m.name} {m.email ? "(" + m.email + ")" : ""}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="package_id" className="block text-sm font-medium text-gray-700">Package <sup className="text-red-500">*</sup></label>
              <select id="package_id" name="package_id" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white">
                <option value="">Select an option</option>
                {packages?.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} (Rp {p.price?.toLocaleString('id-ID')})</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Only active packages are available for purchase</p>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Tax Inclusive</h3>
                <p className="text-xs text-gray-500">If checked, the price already includes tax. If unchecked, tax will be added on total amount.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="tax_inclusive" value="true" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>

            <div className="space-y-2">
              <label htmlFor="tax_rate" className="block text-sm font-medium text-gray-700">Tax Rate (%) <sup className="text-red-500">*</sup></label>
              <input type="number" id="tax_rate" name="tax_rate" defaultValue={10} required min="0" max="100" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 flex flex-wrap gap-3 border-t border-gray-200">
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 focus:outline-none transition-colors shadow-sm">
              Create
            </button>
            <button type="button" className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors">
              Create & create another
            </button>
            <Link href="/invoices" className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
