import { createPaymentMethod } from "../actions";
import Link from "next/link";
import { CreditCard } from "lucide-react";

export default function CreatePaymentMethodPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/payment-methods" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block">
          &larr; Back to Payment Methods
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add Payment Method</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form action={createPaymentMethod} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Method Name *</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" id="name" name="name" required placeholder="e.g. BCA Transfer" className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type *</label>
            <select id="type" name="type" className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
              <option value="BANK_TRANSFER">Bank Transfer</option>
              <option value="QRIS">QRIS</option>
              <option value="CASH">Cash</option>
              <option value="EDC">EDC Machine</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t">
            <Link href="/payment-methods" className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg">Cancel</Link>
            <button type="submit" className="px-6 py-2 text-sm text-white bg-orange-500 rounded-lg hover:bg-orange-600">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
