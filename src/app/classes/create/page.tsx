import { createStudioClass } from "../actions";
import Link from "next/link";
import { Dumbbell, Clock, Users, FileText } from "lucide-react";

export default function CreateClassPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/classes" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block">
          &larr; Back to Classes
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Class Type</h1>
        <p className="text-gray-500 mt-1">Add a new class format to the studio offering.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form action={createStudioClass} className="space-y-6">
          
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Class Name *
            </label>
            <div className="relative">
              <Dumbbell className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                id="name" 
                name="name" 
                required
                placeholder="e.g. Vinyasa Yoga"
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <textarea 
                id="description" 
                name="description" 
                rows={3}
                placeholder="Brief description of the class..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="duration_min" className="block text-sm font-medium text-gray-700">
                Duration (Minutes) *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="number" 
                  id="duration_min" 
                  name="duration_min"
                  required
                  min="15"
                  placeholder="60"
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                Max Capacity (Pax) *
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="number" 
                  id="capacity" 
                  name="capacity"
                  required
                  min="1"
                  placeholder="10"
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t">
            <Link 
              href="/classes" 
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button 
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            >
              Save Class Type
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
