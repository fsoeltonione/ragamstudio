import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { PlusCircle, Search, Settings, Filter, Download, XCircle, FilePlus, CalendarCheck } from "lucide-react";
import Link from "next/link";
import AttendanceButtons from "./AttendanceButtons";

export const dynamic = 'force-dynamic';

export default async function BookingsPage({ searchParams }: { searchParams: { tab?: string } }) {
  const currentTab = searchParams.tab || 'all';

  let query = supabase
    .from("bookings")
    .select(`
      id,
      status,
      is_waitlist,
      attendance_status,
      created_at,
      member:members(name),
      schedule:class_schedules(
        start_time,
        class:studio_classes(name),
        trainer:users(name)
      )
    `)
    .order("created_at", { ascending: false });

  if (currentTab === 'bookings') query = query.eq('is_waitlist', false);
  if (currentTab === 'waitlists') query = query.eq('is_waitlist', true);

  const { data: bookings } = await query;

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bookings</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-white !bg-[oklab(0.999994_0.000045_0.00002/0.05)] !text-gray-700 border border-gray-300 rounded-lg font-medium transition-colors text-sm">
            <Download className="w-4 h-4" />
            Export Selected
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-white !bg-[oklab(0.999994_0.000045_0.00002/0.05)] !text-gray-700 border border-gray-300 rounded-lg font-medium transition-colors text-sm">
            <Download className="w-4 h-4" />
            Export All
          </button>
          <button className="flex items-center gap-2 px-4 py-2 !bg-[#ea580c] hover:bg-orange-600 text-white rounded-lg font-medium transition-colors text-sm">
            <CalendarCheck className="w-4 h-4" />
            Mark Attendance
          </button>
          <button className="flex items-center gap-2 px-4 py-2 !bg-[#ea580c] hover:bg-orange-600 text-white rounded-lg font-medium transition-colors text-sm">
            <FilePlus className="w-4 h-4" />
            Mass Booking
          </button>
          <Link href="/bookings/create" className="flex items-center gap-2 px-4 py-2 !bg-[#ea580c] hover:bg-orange-600 text-white rounded-lg font-medium transition-colors text-sm">
            <PlusCircle className="w-4 h-4" />
            New booking
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-6">
        <Link href="/bookings?tab=all" className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${currentTab === 'all' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>All</Link>
        <Link href="/bookings?tab=bookings" className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${currentTab === 'bookings' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Bookings</Link>
        <Link href="/bookings?tab=waitlists" className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${currentTab === 'waitlists' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Waitlists</Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-wrap gap-4 justify-between items-center bg-gray-50/50">
          <div className="flex gap-2 items-center">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 shadow-sm">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <select className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 shadow-sm outline-none">
              <option>Group by</option>
            </select>
            <select className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 shadow-sm outline-none">
              <option>Group direction</option>
            </select>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 shadow-sm" title="Column manager">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-4 w-10 text-center"><input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" /></th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Member</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Class</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Schedule</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Trainer</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Location</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Package</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Type</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Status</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Attendance Status</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Booked At</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings?.map((booking) => {
                const b = booking as any;
                const memberName = b.member?.name || (b.member?.[0]?.name);
                const className = b.schedule?.class?.name || b.schedule?.[0]?.class?.name;
                const trainerName = b.schedule?.trainer?.name || b.schedule?.[0]?.trainer?.name;
                const startTime = b.schedule?.start_time || b.schedule?.[0]?.start_time;

                let badgeColor = "bg-green-100 text-green-700";
                if (booking.is_waitlist) badgeColor = "bg-[oklab(0.828_0.05_0.1/0.1)] !text-[#ea580c]"; // Amber/Warning
                else if (booking.status === 'PENDING') badgeColor = "bg-[oklab(0.828_0.05_0.1/0.1)] !text-[#ea580c]";

                return (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-center"><input type="checkbox" className="rounded border-gray-300" /></td>
                  <td className="px-4 py-4 font-medium text-gray-900">
                    {memberName}
                  </td>
                  <td className="px-4 py-4 text-gray-700">
                    {className}
                  </td>
                  <td className="px-4 py-4 text-gray-700 whitespace-nowrap">
                    {startTime ? format(new Date(startTime), "dd MMM yyyy, HH:mm") : "-"}
                  </td>
                  <td className="px-4 py-4 text-gray-700">
                    {trainerName}
                  </td>
                  <td className="px-4 py-4 text-gray-700">
                    RagamStudio
                  </td>
                  <td className="px-4 py-4 text-gray-700">
                    Group Regular
                  </td>
                  <td className="px-4 py-4 text-gray-700">
                    Booking
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColor}`}>
                      {booking.is_waitlist ? 'Waitlisted' : (booking.status === 'CONFIRMED' ? 'Booked' : 'Pending Payment')}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-sm ${
                      booking.attendance_status === 'PRESENT' ? 'text-green-600' :
                      booking.attendance_status === 'NO_SHOW' ? 'text-red-600' :
                      'text-orange-500'
                    }`}>
                      {booking.attendance_status === 'PRESENT' ? 'Attended' : 
                       booking.attendance_status === 'NO_SHOW' ? 'No Show' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-500 whitespace-nowrap text-sm">
                    {format(new Date(booking.created_at), "dd MMM yyyy")}
                  </td>
                  <td className="px-4 py-4 text-right whitespace-nowrap">
                    <button className="text-gray-600 hover:text-gray-900 font-medium text-sm mr-3">View</button>
                    <button className="text-red-600 hover:text-red-900 font-medium text-sm">Cancel Booking</button>
                  </td>
                </tr>
                );
              })}

              {!bookings?.length && (
                <tr>
                  <td colSpan={12} className="px-6 py-12 text-center text-gray-500">
                    No bookings found in this view.
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
