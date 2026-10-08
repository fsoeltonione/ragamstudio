import { supabase } from "@/lib/supabase";
import { createTrainerPayment } from "../actions";
import Link from "next/link";
import { DollarSign } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CreateTrainerPaymentPage({
  searchParams,
}: {
  searchParams: { trainer_id?: string };
}) {
  const { data: trainers } = await supabase
    .from("users")
    .select("id, name, email, base_rate, per_head_rate")
    .eq("role", "TRAINER")
    .order("name", { ascending: true });

  const preselectedTrainer = trainers?.find(
    (t) => t.id === searchParams.trainer_id
  );

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link
          href="/trainer-payments"
          className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block"
        >
          &larr; Back to Trainer Payments
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Record Trainer Payment
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-orange-500" />
          <h2 className="font-bold text-gray-700">Payment Details</h2>
        </div>

        <form action={createTrainerPayment} className="p-6 space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="trainer_id"
              className="block text-sm font-medium text-gray-700"
            >
              Trainer *
            </label>
            <select
              id="trainer_id"
              name="trainer_id"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
              defaultValue={searchParams.trainer_id || ""}
            >
              <option value="">Select a trainer</option>
              {trainers?.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}{" "}
                  {t.email ? "(" + t.email + ")" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount (IDR) *
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="payment_date"
                className="block text-sm font-medium text-gray-700"
              >
                Payment Date *
              </label>
              <input
                type="date"
                id="payment_date"
                name="payment_date"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Period
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  name="period_start"
                  placeholder="Start"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                <input
                  type="date"
                  name="period_end"
                  placeholder="End"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="total_classes"
                className="block text-sm font-medium text-gray-700"
              >
                Total Classes
              </label>
              <input
                type="number"
                id="total_classes"
                name="total_classes"
                min="0"
                defaultValue={0}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="booking_count"
                className="block text-sm font-medium text-gray-700"
              >
                Booking Count
              </label>
              <input
                type="number"
                id="booking_count"
                name="booking_count"
                min="0"
                defaultValue={0}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
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
              placeholder="Optional payment notes..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <Link
              href="/trainer-payments"
              className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2 text-sm text-white bg-orange-500 rounded-lg hover:bg-orange-600 font-medium"
            >
              Record Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
