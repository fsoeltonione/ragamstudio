import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { PlusCircle, Search, Calendar } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function ClassSchedulesPage() {
  const { data: schedules } = await supabase
    .from("class_schedules")
    .select(`
      id,
      start_time,
      end_time,
      class:studio_classes(name, duration_min, capacity),
      trainer:users(name)
    `)
    .order("start_time", { ascending: true });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Class Schedules</h1>
          <p className="text-gray-500 mt-1">Manage upcoming classes and trainer assignments</p>
        </div>
        <Link href="/class-schedules/create" className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
          <PlusCircle className="w-5 h-5" />
          New Schedule
        </Link>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-6">
        <Link href="/class-schedules" className="pb-2 px-1 text-sm font-medium border-b-2 border-orange-500 text-orange-600 transition-colors">All</Link>
        <Link href="/class-schedules" className="pb-2 px-1 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 transition-colors">Upcoming</Link>
        <Link href="/class-schedules" className="pb-2 px-1 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 transition-colors">Past</Link>
        <Link href="/class-schedules" className="pb-2 px-1 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 transition-colors">Cancelled</Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-wrap gap-4 justify-between items-center bg-gray-50/50">
          <div className="flex gap-2 items-center">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
              Filter
            </button>
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
            <Link href="/class-schedules?view=calendar" className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 shadow-sm">
              <Calendar className="w-4 h-4" /> Calendar View
            </Link>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 w-10 text-center"><input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" /></th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Class</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Trainer</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Date & Time</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Status</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Locked</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Room</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Capacity</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Booked</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap text-center">Visible</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Package Types</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {schedules?.map((schedule) => {
                const sAny = schedule as any;
                return (
                <tr key={schedule.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4 text-center">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  </td>
                  <td className="px-4 py-4 font-bold text-gray-900 whitespace-nowrap">
                    {sAny.class?.name || "Unknown"}
                  </td>
                  <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                    {sAny.trainer?.name || "Unassigned"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {format(new Date(schedule.start_time), "dd MMM yyyy")}
                    </div>
                    <div className="text-gray-500">
                      {format(new Date(schedule.start_time), "HH:mm")} - {format(new Date(schedule.end_time), "HH:mm")}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Upcoming
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-gray-400">No</span>
                  </td>
                  <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                    {sAny.room || "-"}
                  </td>
                  <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                    {sAny.capacity || sAny.class?.capacity || 10}
                  </td>
                  <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                    0
                  </td>
                  <td className="px-4 py-4 text-center whitespace-nowrap">
                    {sAny.is_visible !== false ? <span className="text-green-600 font-bold">Yes</span> : <span className="text-gray-400">No</span>}
                  </td>
                  <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                    -
                  </td>
                  <td className="px-4 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-gray-600 hover:text-gray-900 font-medium text-sm">View</button>
                      <button className="text-gray-600 hover:text-gray-900 font-medium text-sm">Edit</button>
                      <button className="text-red-600 hover:text-red-900 font-medium text-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              )})}
              {!schedules?.length && (
                <tr>
                  <td colSpan={12} className="px-6 py-12 text-center text-gray-500">
                    No schedules found.
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
