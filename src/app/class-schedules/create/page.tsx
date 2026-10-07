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
    .eq("role", "TRAINER")
    .order("name", { ascending: true });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/class-schedules" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block">
          &larr; Back to Schedules
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">New Class Schedule</h1>
        <p className="text-gray-500 mt-1">Assign a trainer and date for an upcoming class.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form action={createClassSchedule} className="space-y-6">
          
          <div className="space-y-2">
            <label htmlFor="class_id" className="block text-sm font-medium text-gray-700">
              Select Class
            </label>
            <select 
              id="class_id" 
              name="class_id" 
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">-- Choose a class type --</option>
              {classes?.map(cls => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} ({cls.duration_min} mins)
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="trainer_id" className="block text-sm font-medium text-gray-700">
              Assign Trainer
            </label>
            <select 
              id="trainer_id" 
              name="trainer_id" 
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">-- Choose a trainer --</option>
              {trainers?.map(trainer => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">
              Start Date & Time
            </label>
            <input 
              type="datetime-local" 
              id="start_time" 
              name="start_time" 
              required
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500">End time will be calculated automatically based on class duration.</p>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t">
            <Link 
              href="/class-schedules" 
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button 
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            >
              Save Schedule
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
