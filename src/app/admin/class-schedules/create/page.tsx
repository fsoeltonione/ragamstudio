import { supabase } from "@/lib/supabase";
import { createClassSchedule } from "../actions";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function CreateClassSchedulePage() {
  // Fetch available classes
  const { data: classes } = await supabase
    .from("studio_classes")
    .select("id, name, duration_min")
    .order("name", { ascending: true });

  // Fetch trainers
  const { data: trainers } = await supabase
    .from("users")
    .select("id, name")
    // Note: Assuming 'role' or similar denotes a trainer in actual schema
    .order("name", { ascending: true });

  // Fetch locations
  const { data: locations } = await supabase
    .from("locations")
    .select("id, name")
    .order("name", { ascending: true });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/class-schedules" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium">
          &larr; Back to Schedules
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">New Class Schedule</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form action={createClassSchedule} className="space-y-0">
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label htmlFor="class_id" className="block text-sm font-medium text-gray-700">
                Class Name <sup className="text-red-500">*</sup>
              </label>
              <select id="class_id" name="class_id" required className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="">-- Choose a class --</option>
                {classes?.map(cls => <option key={cls.id} value={cls.id}>{cls.name}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="trainer_id" className="block text-sm font-medium text-gray-700">
                Trainer <sup className="text-red-500">*</sup>
              </label>
              <select id="trainer_id" name="trainer_id" required className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="">-- Choose a trainer --</option>
                {trainers?.map(trainer => <option key={trainer.id} value={trainer.id}>{trainer.name}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">
                Date time <sup className="text-red-500">*</sup>
              </label>
              <input type="datetime-local" id="start_time" name="start_time" required className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>

            <div className="space-y-2">
              <label htmlFor="location_id" className="block text-sm font-medium text-gray-700">
                Location <sup className="text-red-500">*</sup>
              </label>
              <select id="location_id" name="location_id" required className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="">-- Choose a location --</option>
                {locations?.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="room" className="block text-sm font-medium text-gray-700">
                Room <sup className="text-red-500">*</sup>
              </label>
              <input type="text" id="room" name="room" required className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>

            <div className="space-y-2 flex items-center pt-6 gap-3">
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="is_outdoor" id="is_outdoor" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-orange-500" />
                <label htmlFor="is_outdoor" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
              <label htmlFor="is_outdoor" className="text-sm font-medium text-gray-700">Is Outdoor Event?</label>
            </div>

            <div className="space-y-2">
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                Capacity <sup className="text-red-500">*</sup>
              </label>
              <input type="number" id="capacity" name="capacity" defaultValue="10" required className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>

            <div className="space-y-2">
              <label htmlFor="minimum_bookings" className="block text-sm font-medium text-gray-700">
                Minimum Bookings <sup className="text-red-500">*</sup>
              </label>
              <input type="number" id="minimum_bookings" name="minimum_bookings" defaultValue="1" required className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select id="status" name="status" disabled className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none text-gray-500">
                <option value="UPCOMING">Upcoming</option>
              </select>
            </div>

            <div className="space-y-2 flex flex-col justify-center gap-4 pt-6">
              <div className="flex items-center gap-3">
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="is_visible" id="is_visible" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-orange-500" />
                  <label htmlFor="is_visible" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
                <label htmlFor="is_visible" className="text-sm font-medium text-gray-700">Is Visible?</label>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="is_custom_image" id="is_custom_image" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-orange-500" />
                  <label htmlFor="is_custom_image" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
                <label htmlFor="is_custom_image" className="text-sm font-medium text-gray-700">Is Custom Image?</label>
              </div>
            </div>

          </div>
          
          <div className="px-6 py-4 bg-gray-50 flex gap-3 border-t border-gray-200">
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 focus:outline-none transition-colors shadow-sm">
              Create
            </button>
            <button type="button" className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors">
              Create &amp; create another
            </button>
            <Link href="/class-schedules" className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .toggle-checkbox:checked {
          right: 0;
          border-color: #ea580c;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #ea580c;
        }
        .toggle-checkbox {
          right: 0;
          z-index: 1;
          border-color: #e5e7eb;
          transition: all 0.15s ease-out;
        }
        .toggle-label {
          transition: all 0.15s ease-out;
        }
      `}} />
    </div>
  );
}
