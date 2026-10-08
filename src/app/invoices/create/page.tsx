import { supabase } from "@/lib/supabase";
import { createInvoice } from "../actions";
import Link from "next/link";
import { FileText } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CreateInvoicePage() {
  const { data: members } = await supabase
    .from("members")
    .select("id, name, email")
    .order("name", { ascending: true });

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link
          href="/invoices"
          className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block"
        >
          &larr; Back to Invoices
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Create Invoice
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex items-center gap-2">
          <FileText className="w-5 h-5 text-orange-500" />
          <h2 className="font-bold text-gray-700">Invoice Details</h2>
        </div>

        <form action={createInvoice} className="p-6 space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="member_id"
              className="block text-sm font-medium text-gray-700"
            >
              Member
            </label>
            <select
              id="member_id"
              name="member_id"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
            >
              <option value="">Select a member (optional)</option>
              {members?.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} {m.email ? "(" + m.email + ")" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount (Rp) *
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              required
              min="0"
              step="1000"
              placeholder="e.g. 500000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="due_date"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date
            </label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700"
            >
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="Optional notes..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <Link
              href="/invoices"
              className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2 text-sm text-white bg-orange-500 rounded-lg hover:bg-orange-600 font-medium"
            >
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
