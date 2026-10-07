import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { TrendingUp, Users, DollarSign, Calendar, MoreVertical, CreditCard } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const [
    { count: membersCount },
    { data: transactions },
    { count: upcomingSchedules },
    { data: recentBookings }
  ] = await Promise.all([
    supabase.from("members").select("*", { count: "exact", head: true }),
    supabase.from("transactions").select("amount"),
    supabase.from("studio_schedules").select("*", { count: "exact", head: true }).gte("start_time", new Date().toISOString()),
    supabase.from("bookings").select(\`
      id, status, created_at,
      member:members(name),
      schedule:studio_schedules(start_time, class:studio_classes(name))
    \`).order("created_at", { ascending: false }).limit(5)
  ]);

  const grossRevenue = transactions?.reduce((sum, tx) => sum + Number(tx.amount), 0) || 0;

  return (
    <div className="space-y-6">
      
      {/* Filament Stats Overview Widget */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat 1 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Gross Revenue</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">Rp {grossRevenue.toLocaleString('id-ID')}</h3>
            </div>
          </div>
          <div className="flex items-center text-sm mt-4 text-green-600 font-medium">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>3% increase</span>
            <span className="text-gray-400 font-normal ml-2">from last month</span>
          </div>
          {/* Decorative Sparkline Illusion */}
          <svg className="absolute bottom-0 left-0 w-full h-12 text-green-100 opacity-50 preserve-3d" preserveAspectRatio="none" viewBox="0 0 100 100">
            <polygon fill="currentColor" points="0,100 0,80 20,60 40,75 60,40 80,50 100,20 100,100" />
          </svg>
        </div>

        {/* Stat 2 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Members</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{membersCount || 0}</h3>
            </div>
          </div>
          <div className="flex items-center text-sm mt-4 text-green-600 font-medium">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>9% increase</span>
            <span className="text-gray-400 font-normal ml-2">from last month</span>
          </div>
          <svg className="absolute bottom-0 left-0 w-full h-12 text-green-100 opacity-50 preserve-3d" preserveAspectRatio="none" viewBox="0 0 100 100">
            <polygon fill="currentColor" points="0,100 0,90 25,70 50,80 75,40 100,30 100,100" />
          </svg>
        </div>

        {/* Stat 3 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Upcoming Classes</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{upcomingSchedules || 0}</h3>
            </div>
          </div>
          <div className="flex items-center text-sm mt-4 text-gray-500 font-medium">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Scheduled for the future</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Filament Chart Widget Illusion */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-900">Revenue per Month</h2>
            <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5"/></button>
          </div>
          <div className="p-6 flex-1 flex items-end gap-2 h-64 relative">
             {/* Fake Bars representing Chart.js */}
             <div className="w-full h-full flex items-end justify-between px-2 pb-6 border-b border-l border-gray-100 pt-4">
                {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                  <div key={i} className="w-[10%] bg-orange-500 rounded-t-sm hover:bg-orange-600 transition-colors relative group" style={{ height: \`\${h}%\` }}>
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Rp {h}M
                     </div>
                  </div>
                ))}
             </div>
             <div className="absolute bottom-0 left-0 w-full flex justify-between px-8 text-xs text-gray-400">
               <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
             </div>
          </div>
        </div>

        {/* Filament Table Widget */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-900">Latest Bookings</h2>
            <Link href="/bookings" className="text-sm font-medium text-orange-600 hover:text-orange-700">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium">Member</th>
                  <th className="px-4 py-3 font-medium">Class</th>
                  <th className="px-4 py-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentBookings?.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-bold text-gray-900">{booking.member?.name}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {booking.schedule?.class?.name} <br/>
                      <span className="text-xs">{format(new Date(booking.schedule?.start_time), "dd MMM HH:mm")}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase bg-green-100 text-green-700">
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {!recentBookings?.length && (
                  <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No bookings yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
