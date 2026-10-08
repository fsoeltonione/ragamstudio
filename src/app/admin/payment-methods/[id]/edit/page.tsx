import { supabase } from "@/lib/supabase";
import { updatePaymentMethod } from "../../actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CreditCard } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EditPaymentMethodPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: method } = await supabase
    .from("payment_methods")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!method) notFound();

  const updateWithId = updatePaymentMethod.bind(null, params.id);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/payment-methods" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium">
          &larr; Back to Payment Methods
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Payment Method</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form action={updateWithId} className="space-y-0">
          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Method Name <sup className="text-red-500">*</sup>
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  defaultValue={method.name}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Type <sup className="text-red-500">*</sup>
              </label>
              <select
                id="type"
                name="type"
                required
                defaultValue={method.type}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="CASH">Cash</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
                <option value="QRIS">QRIS</option>
                <option value="CARD">Credit / Debit Card</option>
                <option value="E_WALLET">E-Wallet</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                value="true"
                defaultChecked={method.is_active}
                className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                Active
              </label>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 flex gap-3 border-t border-gray-200">
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
              Save Changes
            </button>
            <Link href="/payment-methods" className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
