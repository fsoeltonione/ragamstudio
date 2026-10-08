import { supabase } from "@/lib/supabase";
import { createBooking } from "../actions";
import Link from "next/link";
import { format } from "date-fns";

export default async function CreateBookingPage() {
  const { data: members } = await supabase.from("members").select("id, name").order("name", { ascending: true });
  const { data: schedules } = await supabase.from("class_schedules").select("id, start_time, class:studio_classes(name), trainer:users(name)").order("start_time", { ascending: true });
  const { data: packages } = await supabase.from("packages").select("id, name").order("name", { ascending: true });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/bookings" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium">
          &larr; Back to Bookings
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Booking</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form action={createBooking} className="space-y-6">
          
          <div className="space-y-2">
            <label htmlFor="member_id" className="block text-sm font-medium text-gray-700">
              Member <sup className="text-red-500">*</sup>
            </label>
            <select id="member_id" name="member_id" required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
              <option value="">Select an option</option>
              {members?.map(member => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="package_id" className="block text-sm font-medium text-gray-700">
              Package <sup className="text-red-500">*</sup>
            </label>
            <select id="package_id" name="package_id" required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
              <option value="">Select an option</option>
              {packages?.map(pkg => (
                <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="schedule_id" className="block text-sm font-medium text-gray-700">
              Class Schedule <sup className="text-red-500">*</sup>
            </label>
            <select id="schedule_id" name="schedule_id" required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
              <option value="">Select an option</option>
              {schedules?.map(schedule => (
                <option key={schedule.id} value={schedule.id}>
                  {format(new Date(schedule.start_time), "dd MMM yyyy, HH:mm")} - {((schedule as any).class)?.name || "Unknown"} (Trainer: {((schedule as any).trainer)?.name || "Unknown"})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="attendance_status" className="block text-sm font-medium text-gray-700">
              Attendance Status
            </label>
            <select id="attendance_status" name="attendance_status" disabled className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed">
              <option value="PENDING">Pending</option>
              <option value="PRESENT">Attended</option>
              <option value="NO_SHOW">No Show</option>
            </select>
          </div>

          {/* Form Actions */}
          <div className="pt-6 flex flex-wrap gap-3">
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 focus:outline-none transition-colors shadow-sm">
              Create
            </button>
            <button type="button" className="px-6 py-2 text-sm font-medium text-gray-700 bg-[oklab(0.999994_0.000045_0.00002/0.05)] border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none transition-colors">
              Create & create another
            </button>
            <Link href="/bookings" className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors bg-transparent border-0 flex items-center">
              Cancel
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}
