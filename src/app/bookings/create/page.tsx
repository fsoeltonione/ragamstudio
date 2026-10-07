import { supabase } from "@/lib/supabase";
import { createBooking } from "../actions";
import Link from "next/link";
import { format } from "date-fns";

export default async function CreateBookingPage() {
  // Fetch members
  const { data: members } = await supabase
    .from("members")
    .select("id, name")
    .order("name", { ascending: true });

  // Fetch upcoming class schedules
  const { data: schedules } = await supabase
    .from("class_schedules")
    .select(`
      id,
      start_time,
      class:studio_classes(name),
      trainer:users(name)
    `)
    .order("start_time", { ascending: true });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/bookings" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block">
          &larr; Back to Bookings
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">New Booking</h1>
        <p className="text-gray-500 mt-1">Reserve a class for a member. This will deduct 1 session from their active package.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form action={createBooking} className="space-y-6">
          
          {/* Member Selection */}
          <div className="space-y-2">
            <label htmlFor="member_id" className="block text-sm font-medium text-gray-700">
              Select Member
            </label>
            <select 
              id="member_id" 
              name="member_id" 
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">-- Choose a member --</option>
              {members?.map(member => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          {/* Schedule Selection */}
          <div className="space-y-2">
            <label htmlFor="schedule_id" className="block text-sm font-medium text-gray-700">
              Select Class Schedule
            </label>
            <select 
              id="schedule_id" 
              name="schedule_id" 
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">-- Choose a schedule --</option>
              {schedules?.map(schedule => (
                <option key={schedule.id} value={schedule.id}>
                  {format(new Date(schedule.start_time), "dd MMM yyyy, HH:mm")} - {schedule.class.name} (Trainer: {schedule.trainer?.name})
                </option>
              ))}
            </select>
          </div>

          {/* Warning Note */}
          <div className="bg-orange-50 text-orange-800 p-4 rounded-lg text-sm">
            <strong>Note:</strong> Creating this booking will automatically verify if the member has an active package and deduct 1 session credit from their account.
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end gap-3 border-t">
            <Link 
              href="/bookings" 
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button 
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            >
              Confirm Booking
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
