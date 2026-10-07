import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { PlusCircle, Search, User, MapPin } from "lucide-react";
import Link from "next/link";

// Using server component to fetch data directly
export default async function BookingsPage() {
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select(`
      id,
      status,
      created_at,
      member:members(name),
      schedule:class_schedules(
        start_time,
        trainer:users(name),
        class:studio_classes(name)
      )
    `)
    .order('created_at', { ascending: false });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bookings</h1>
          <p className="text-gray-500 mt-1">Manage class reservations and attendance</p>
        </div>
        <Link href="/bookings/create" className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
          <PlusCircle className="w-5 h-5" />
          New Booking
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by member or class..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Member</th>
                <th className="px-6 py-4 font-medium">Class & Schedule</th>
                <th className="px-6 py-4 font-medium">Trainer</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings?.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                        {booking.member.name.charAt(0)}
                      </div>
                      {booking.member.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{booking.schedule.class.name}</div>
                    <div className="text-gray-500 mt-1">{format(new Date(booking.schedule.start_time), "dd MMM yyyy, HH:mm")}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {booking.schedule.trainer?.name || "Unassigned"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/bookings/${booking.id}`} className="text-orange-600 hover:text-orange-800 font-medium">
                      View
                    </Link>
                  </td>
                </tr>
              ))}

              {!bookings?.length && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No bookings found.
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
