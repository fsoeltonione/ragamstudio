import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { PlusCircle, Search, MapPin, Check, X } from "lucide-react";
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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bookings</h1>
          <p className="text-gray-500 mt-1">Manage class registrations, waitlists, and attendance</p>
        </div>
        <Link href="/bookings/create" className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
          <PlusCircle className="w-5 h-5" />
          New Booking
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-6">
        <Link href="/bookings?tab=all" className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${currentTab === 'all' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>All</Link>
        <Link href="/bookings?tab=bookings" className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${currentTab === 'bookings' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Bookings</Link>
        <Link href="/bookings?tab=waitlists" className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${currentTab === 'waitlists' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Waitlists</Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search bookings..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Member</th>
                <th className="px-6 py-4 font-medium">Class / Trainer</th>
                <th className="px-6 py-4 font-medium">Schedule</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Attendance</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings?.map((booking) => {
                const b = booking as any;
                return (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {b.member?.name || (b.member?.[0]?.name)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900 font-bold">{b.schedule?.class?.name || b.schedule?.[0]?.class?.name}</div>
                    <div className="text-gray-500 text-xs">Trainer: {b.schedule?.trainer?.name || b.schedule?.[0]?.trainer?.name}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {format(new Date(b.schedule?.start_time || b.schedule?.[0]?.start_time || new Date()), "dd MMM yyyy, HH:mm")}
                  </td>
                  <td className="px-6 py-4">
                    {booking.is_waitlist ? (
                      <span className="inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase bg-yellow-100 text-yellow-800">
                        WAITLIST
                      </span>
                    ) : (
                      <span className="inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase bg-green-100 text-green-700">
                        {booking.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                      booking.attendance_status === 'PRESENT' ? 'bg-blue-100 text-blue-700' :
                      booking.attendance_status === 'NO_SHOW' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {booking.attendance_status || 'PENDING'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <AttendanceButtons id={booking.id} currentStatus={booking.attendance_status} />
                  </td>
                </tr>
                );
              })}

              {!bookings?.length && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
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
