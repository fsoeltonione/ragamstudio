import { createLocation } from "../actions";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function CreateLocationPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/locations" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium">
          &larr; Back to Locations
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">New Location</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form action={createLocation} className="space-y-0">
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name <sup className="text-red-500">*</sup>
              </label>
              <input type="text" id="name" name="name" required className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            </div>

            <div className="space-y-2">
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                Slug
              </label>
              <input type="text" id="slug" name="slug" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea id="address" name="address" rows={3} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none" />
            </div>

            <div className="space-y-2">
              <label htmlFor="google_maps_link" className="block text-sm font-medium text-gray-700">
                Google Maps Link
              </label>
              <input type="url" id="google_maps_link" name="google_maps_link" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input type="text" id="phone" name="phone" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            </div>

            <div className="space-y-2">
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                Logo (URL)
              </label>
              <input type="text" id="logo" name="logo" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            </div>

            <div className="space-y-2">
              <label htmlFor="app_logo" className="block text-sm font-medium text-gray-700">
                App Logo (URL)
              </label>
              <input type="text" id="app_logo" name="app_logo" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea id="description" name="description" rows={3} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none" />
            </div>

            <div className="space-y-2">
              <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                Timezone
              </label>
              <select id="timezone" name="timezone" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none">
                <option value="Asia/Jakarta">Asia/Jakarta</option>
                <option value="UTC">UTC</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                Color (Hex)
              </label>
              <input type="text" id="color" name="color" defaultValue="#ea580c" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            </div>

            <div className="space-y-2 flex items-center gap-3 pt-6">
              <input type="checkbox" id="allow_cancellations" name="allow_cancellations" value="true" defaultChecked className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
              <label htmlFor="allow_cancellations" className="text-sm font-medium text-gray-700">
                Allow cancellations
              </label>
            </div>

            <div className="space-y-2">
              <label htmlFor="cancellation_window" className="block text-sm font-medium text-gray-700">
                Cancellation window (hours)
              </label>
              <input type="number" id="cancellation_window" name="cancellation_window" defaultValue="24" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            </div>
            
            {/* hidden is_active to not break previous schema completely */}
            <input type="hidden" name="is_active" value="true" />
          </div>

          <div className="px-6 py-4 bg-gray-50 flex gap-3 border-t border-gray-200">
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 focus:outline-none transition-colors shadow-sm">
              Create
            </button>
            <button type="button" className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors">
              Create &amp; create another
            </button>
            <Link href="/locations" className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
