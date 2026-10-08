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

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search schedules..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Class Name</th>
                <th className="px-6 py-4 font-medium">Date & Time</th>
                <th className="px-6 py-4 font-medium">Trainer</th>
                <th className="px-6 py-4 font-medium">Duration</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {schedules?.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div>{((schedule as any).class)?.name || "Unknown"}</div>
                        <div className="text-xs text-gray-500 font-normal">Capacity: {((schedule as any).class)?.capacity || 0} pax</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {format(new Date(schedule.start_time), "dd MMM yyyy")}
                    </div>
                    <div className="text-gray-500">
                      {format(new Date(schedule.start_time), "HH:mm")} - {format(new Date(schedule.end_time), "HH:mm")}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                      {schedule.trainer?.name || "Unassigned"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {((schedule as any).class)?.duration_min || 0} mins
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-orange-600 hover:text-orange-800 font-medium">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

              {!schedules?.length && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
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
