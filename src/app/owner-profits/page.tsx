import { supabase } from "@/lib/supabase";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { DollarSign, TrendingUp, Search } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function OwnerProfitsPage() {
  // 1. Calculate Total Revenue from POS Transactions
  const { data: transactions } = await supabase
    .from("transactions")
    .select("amount, created_at");

  const totalRevenue = transactions?.reduce((acc, tx) => acc + Number(tx.amount), 0) || 0;

  // 2. Calculate Total Trainer Payments
  // Fetch trainers with their rates
  const { data: trainers } = await supabase
    .from("users")
    .select("id, name, base_rate, per_head_rate")
    .eq("role", "TRAINER");

  const { data: schedules } = await supabase
    .from("class_schedules")
    .select(`
      id,
      trainer_id,
      bookings(id, status)
    `);

  let totalTrainerPayments = 0;
  let totalBookings = 0;

  trainers?.forEach(trainer => {
    const trainerSchedules = schedules?.filter(s => s.trainer_id === trainer.id) || [];
    const classesCount = trainerSchedules.length;
    
    let bookingCount = 0;
    trainerSchedules.forEach(schedule => {
      const validBookings = schedule.bookings.filter((b: any) => b.status === 'CONFIRMED').length;
      bookingCount += validBookings;
      totalBookings += validBookings;
    });

    const amount = (classesCount * (trainer.base_rate || 0)) + (bookingCount * (trainer.per_head_rate || 0));
    totalTrainerPayments += amount;
  });

  // 3. Net Profit
  const netProfit = totalRevenue - totalTrainerPayments;

  // Formatting for UI (Mocking a monthly row for the table view)
  const currentMonth = new Date();
  const profitsData = [
    {
      id: 1,
      dateTaken: currentMonth,
      totalProfit: netProfit,
      totalRevenue: totalRevenue,
      trainerPayments: totalTrainerPayments,
      bookingsCount: totalBookings,
      packagesCount: transactions?.length || 0,
      status: "COMPLETED"
    }
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="#" className="hover:text-gray-900">Finance</Link>
            <span>&gt;</span>
            <span>Owner Profits</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Owner Profits</h1>
          <p className="text-gray-500 mt-1">Real-time financial overview and net profit calculation</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
          Export Report
        </button>
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Gross Revenue (POS)</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            Rp {totalRevenue.toLocaleString('id-ID')}
          </div>
          <div className="text-sm text-green-500 font-medium">From package sales</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm font-medium">Trainer Payments</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            Rp {totalTrainerPayments.toLocaleString('id-ID')}
          </div>
          <div className="text-sm text-red-500 font-medium">Total commissions</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-sm border border-gray-900 p-6 flex flex-col justify-between text-white">
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <span className="text-sm font-medium">Net Studio Profit</span>
          </div>
          <div className="text-4xl font-black mb-1">
            Rp {netProfit.toLocaleString('id-ID')}
          </div>
          <div className="text-sm text-orange-400 font-medium">Revenue - Trainer Payments</div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-end bg-gray-50/50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Period</th>
                <th className="px-6 py-4 font-medium">Total Revenue</th>
                <th className="px-6 py-4 font-medium">Trainer Expense</th>
                <th className="px-6 py-4 font-medium font-bold text-orange-600">Net Profit</th>
                <th className="px-6 py-4 font-medium">Sales Count</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {profitsData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {format(row.dateTaken, "MMMM yyyy")}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    Rp {row.totalRevenue.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    Rp {row.trainerPayments.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-bold">
                    Rp {row.totalProfit.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {row.packagesCount} Packages
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
