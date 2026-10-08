import { supabase } from "@/lib/supabase";
import { createTrainerPayment } from "../actions";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function CreateTrainerPaymentPage() {
  const { data: trainers } = await supabase
    .from("users")
    .select("id, name, email")
    .eq("role", "TRAINER") // from seed: TRAINER/HEAD_COACH etc.
    .order("name", { ascending: true });

  const todayStr = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Link href="/trainer-payments" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium">
            &larr; Back to Trainer Payments
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Trainer Payment</h1>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form action={createTrainerPayment} className="space-y-6">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label htmlFor="trainer_id" className="block text-sm font-medium text-gray-700">Trainer <sup className="text-red-500">*</sup></label>
              <select id="trainer_id" name="trainer_id" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white">
                <option value="">Select an option</option>
                {trainers?.map((t) => (
                  <option key={t.id} value={t.id}>{t.name} {t.email ? "(" + t.email + ")" : ""}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
              <input type="text" id="amount" name="amount" defaultValue={0} readOnly disabled className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="payment_date" className="block text-sm font-medium text-gray-700">Payment Date</label>
                <input type="text" id="payment_date" name="payment_date" defaultValue={todayStr} readOnly disabled className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed" />
              </div>
              <div className="space-y-2">
                <label htmlFor="booking_count" className="block text-sm font-medium text-gray-700">Booking Count</label>
                <input type="number" id="booking_count" name="booking_count" defaultValue={0} readOnly disabled className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed" />
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 flex flex-wrap gap-3 border-t border-gray-200">
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 focus:outline-none transition-colors shadow-sm">
              Create
            </button>
            <button type="button" className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors">
              Create & create another
            </button>
            <Link href="/trainer-payments" className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
