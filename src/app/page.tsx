import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { Activity, Users, User, Package, DollarSign, Calendar, TrendingUp, CreditCard } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // 1. Fetch Aggregated Data
  const { count: membersCount } = await supabase.from("members").select("*", { count: 'exact', head: true });
  const { count: packagesCount } = await supabase.from("packages").select("*", { count: 'exact', head: true });
  
  // Get upcoming schedules
  const now = new Date().toISOString();
  const { count: upcomingSchedules } = await supabase
    .from("class_schedules")
    .select("*", { count: 'exact', head: true })
    .gte("start_time", now);

  // Get total revenue
  const { data: transactions } = await supabase.from("transactions").select("amount");
  const grossRevenue = transactions?.reduce((acc, tx) => acc + Number(tx.amount), 0) || 0;

  // 2. Fetch Recent Activity (Last 5 Bookings)
  const { data: recentBookings } = await supabase
    .from("bookings")
    .select(`
      id,
      status,
      created_at,
      member:members(name),
      schedule:class_schedules(
        start_time,
        class:studio_classes(name)
      )
    `)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard Analytics</h1>
        <p className="text-gray-500 mt-1">Welcome back, Super Admin! Here is what's happening today.</p>
      </div>

      {/* Primary KPI Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Widget 1 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Gross Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">Rp {grossRevenue.toLocaleString('id-ID')}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium mr-2">+12.5%</span>
            <span className="text-gray-400">from last month</span>
          </div>
        </div>

        {/* Widget 2 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Members</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{membersCount || 0}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-blue-500 font-medium mr-2">Growing</span>
            <span className="text-gray-400">active clients</span>
          </div>
        </div>

        {/* Widget 3 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Upcoming Classes</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{upcomingSchedules || 0}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-500">Scheduled for the future</span>
          </div>
        </div>

        {/* Widget 4 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Package Types</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{packagesCount || 0}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-500">Master data available</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link href="/pos" className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-700">Open POS</span>
              </Link>
              
              <Link href="/bookings/create" className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-700">New Booking</span>
              </Link>

              <Link href="/members/create" className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-700">Add Member</span>
              </Link>

              <Link href="/class-schedules/create" className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-700">Schedule Class</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar / Recent Activity */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-base font-bold text-gray-900">Recent Bookings</h2>
              <Link href="/bookings" className="text-sm font-medium text-orange-600 hover:text-orange-700">
                View all
              </Link>
            </div>
            <div className="p-0">
              <ul className="divide-y divide-gray-100">
                {recentBookings?.map((booking) => (
                  <li key={booking.id} className="p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {booking.member?.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {booking.schedule?.class?.name} • {format(new Date(booking.schedule?.start_time), "dd MMM")}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700">
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
                
                {!recentBookings?.length && (
                  <li className="p-8 text-center text-sm text-gray-500">
                    No recent bookings found.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
