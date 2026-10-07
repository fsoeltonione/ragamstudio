import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { Search } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function TrainerPaymentsPage() {
  // Fetch trainers with their rates
  const { data: trainers } = await supabase
    .from("users")
    .select("id, name, base_rate, per_head_rate")
    .eq("role", "TRAINER");

  // Fetch all class schedules and their bookings
  const { data: schedules } = await supabase
    .from("class_schedules")
    .select(`
      id,
      trainer_id,
      bookings(id, status)
    `);

  // Calculate aggregation
  const paymentsData = trainers?.map(trainer => {
    const trainerSchedules = schedules?.filter(s => s.trainer_id === trainer.id) || [];
    
    const totalClasses = trainerSchedules.length;
    
    // Sum all confirmed/attended bookings for this trainer's classes
    const bookingCount = trainerSchedules.reduce((acc, schedule) => {
      // In a real app, you might filter by status === 'CONFIRMED' or attendance_status === 'ATTENDED'
      const validBookings = schedule.bookings.filter((b: any) => b.status === 'CONFIRMED').length;
      return acc + validBookings;
    }, 0);

    const amount = (totalClasses * (trainer.base_rate || 0)) + (bookingCount * (trainer.per_head_rate || 0));

    return {
      id: trainer.id,
      trainerName: trainer.name,
      totalClasses,
      bookingCount,
      amount,
      // Just a placeholder payment date for demonstration
      paymentDate: new Date().toISOString(),
    };
  }) || [];

  // Summary Widgets
  const totalUnpaid = paymentsData.reduce((acc, p) => acc + p.amount, 0);
  const totalPaid = 5250000; // Mock data matching the screenshot roughly
  const unpaidTrainersCount = paymentsData.filter(p => p.amount > 0).length;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="#" className="hover:text-gray-900">Trainer Payments</Link>
            <span>&gt;</span>
            <span>List</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Trainer Payments</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
          New trainer payment
        </button>
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <span className="text-sm font-medium">Total Unpaid (Realtime)</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            IDR {totalUnpaid.toLocaleString('id-ID', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-sm text-red-500 font-medium">Realtime unpaid amount</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <span className="text-sm font-medium">Total Paid</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            IDR {totalPaid.toLocaleString('id-ID', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-sm text-green-500 font-medium">Total commission paid</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <span className="text-sm font-medium">Unpaid Trainers</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {unpaidTrainersCount} / {trainers?.length || 0}
          </div>
          <div className="text-sm text-blue-500 font-medium">Number of trainers with receivables</div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-end bg-gray-50/50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Trainer</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Payment Date</th>
                <th className="px-6 py-4 font-medium">Total Classes</th>
                <th className="px-6 py-4 font-medium">Booking Count</th>
                <th className="px-6 py-4 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paymentsData.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {payment.trainerName}
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    IDR {payment.amount.toLocaleString('id-ID', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {format(new Date(payment.paymentDate), "dd MMM yyyy HH:mm")}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {payment.totalClasses}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {payment.bookingCount}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-500 hover:text-gray-900 font-medium text-sm flex items-center gap-1 justify-end w-full">
                      👁 View
                    </button>
                  </td>
                </tr>
              ))}

              {paymentsData.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No trainers found.
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
