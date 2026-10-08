import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { Search, PlusCircle, Eye } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function TrainerPaymentsPage() {
  // Fetch trainers
  const { data: trainers } = await supabase
    .from("users")
    .select("id, name, email, base_rate, per_head_rate")
    .eq("role", "TRAINER");

  // Fetch all class schedules and their bookings
  const { data: schedules } = await supabase
    .from("class_schedules")
    .select("id, trainer_id, bookings(id, status)");

  // Fetch actual paid payments from DB
  const { data: paidPayments } = await supabase
    .from("trainer_payments")
    .select("id, trainer_id, amount, status, created_at")
    .order("created_at", { ascending: false });

  // Calculate realtime unpaid amounts per trainer
  const paymentsData =
    trainers?.map((trainer) => {
      const trainerSchedules =
        schedules?.filter((s) => s.trainer_id === trainer.id) || [];
      const totalClasses = trainerSchedules.length;
      const bookingCount = trainerSchedules.reduce((acc, schedule) => {
        const validBookings = (schedule.bookings as any[]).filter(
          (b) => b.status === "CONFIRMED"
        ).length;
        return acc + validBookings;
      }, 0);
      const amount =
        totalClasses * (Number(trainer.base_rate) || 0) +
        bookingCount * (Number(trainer.per_head_rate) || 0);
      const paidToTrainer = paidPayments
        ?.filter((p) => p.trainer_id === trainer.id)
        .reduce((sum, p) => sum + Number(p.amount), 0) || 0;
      return {
        unpaidAmount: Math.max(0, amount - paidToTrainer),
        paidAmount: paidToTrainer,
      };
    }) || [];

  // Summary widgets
  const totalUnpaid = paymentsData.reduce((acc, p) => acc + p.unpaidAmount, 0);
  const totalPaid = paymentsData.reduce((acc, p) => acc + p.paidAmount, 0);
  const unpaidTrainersCount = paymentsData.filter((p) => p.unpaidAmount > 0).length;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Trainer Payments
          </h1>
          <div className="text-sm text-gray-500 flex gap-2 mt-1">
            <span>Trainer Payments</span> <span>&gt;</span> <span>List</span>
          </div>
        </div>
        <Link
          href="/trainer-payments/create"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          New trainer payment
        </Link>
      </div>

      {/* Summary Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-sm font-medium text-gray-500">Total Unpaid (Realtime)</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {"IDR " + totalUnpaid.toLocaleString("id-ID", { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-red-500 font-medium mt-1">Realtime unpaid amount</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-sm font-medium text-gray-500">Total Paid</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {"IDR " + totalPaid.toLocaleString("id-ID", { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-green-500 font-medium mt-1">Total commission paid</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-sm font-medium text-gray-500">Unpaid Trainers</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {unpaidTrainersCount} / {trainers?.length || 0}
          </div>
          <div className="text-xs text-blue-500 font-medium mt-1">Number of trainers with receivables</div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex gap-2">
            <select className="border border-gray-300 rounded px-3 py-1.5 text-sm">
              <option>All Locations</option>
              <option>RagamStudio</option>
            </select>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 font-bold bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Trainer</th>
                <th className="px-6 py-4 whitespace-nowrap">Amount</th>
                <th className="px-6 py-4 whitespace-nowrap">Payment Date</th>
                <th className="px-6 py-4 whitespace-nowrap">Total Classes</th>
                <th className="px-6 py-4 whitespace-nowrap">Booking Count</th>
                <th className="px-6 py-4 whitespace-nowrap text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paidPayments?.map((payment) => {
                const tr = trainers?.find(t => t.id === payment.trainer_id);
                return (
                  <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {tr?.name || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      {"IDR " + Number(payment.amount).toLocaleString("id-ID", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {payment.created_at ? format(new Date(payment.created_at), "dd MMM yyyy") : "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      -
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      -
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-700 transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {!paidPayments?.length && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No trainer payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
