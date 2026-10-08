import { createStudioClass } from "../actions";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function CreateClassPage() {
  const { data: levels } = await supabase.from("class_levels").select("id, name");
  const { data: types } = await supabase.from("class_types").select("id, name");
  const { data: locations } = await supabase.from("locations").select("id, name");
  const { data: packages } = await supabase.from("packages").select("id, name");

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Link href="/classes" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium">
            &larr; Back to Classes
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Class</h1>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button className="px-3 py-1 bg-white text-gray-900 rounded shadow-sm text-sm font-medium">English</button>
          <button className="px-3 py-1 text-gray-500 hover:text-gray-900 text-sm font-medium">Indonesian</button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form action={createStudioClass} className="space-y-6">
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Class Name <sup className="text-red-500">*</sup></label>
                <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div className="space-y-2">
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug <sup className="text-red-500">*</sup></label>
                <input type="text" id="slug" name="slug" required className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500 focus:outline-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Class Description</label>
              <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500">
                <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex gap-2">
                  <span className="text-xs font-bold text-gray-500">B</span>
                  <span className="text-xs italic text-gray-500">I</span>
                  <span className="text-xs underline text-gray-500">U</span>
                </div>
                <textarea id="description" name="description" rows={4} className="w-full px-4 py-2 focus:outline-none"></textarea>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">What you will need</label>
              <p className="text-xs text-gray-500">Specify requirements or what members need to bring (e.g., anti-slip socks, ID card).</p>
              <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500">
                <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex gap-2">
                  <span className="text-xs font-bold text-gray-500">B</span>
                  <span className="text-xs italic text-gray-500">I</span>
                </div>
                <textarea id="requirements" name="requirements" rows={3} className="w-full px-4 py-2 focus:outline-none"></textarea>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="level_id" className="block text-sm font-medium text-gray-700">Class Level <sup className="text-red-500">*</sup></label>
                <select id="level_id" name="level_id" required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                  <option value="">Select an option</option>
                  {levels?.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="duration_min" className="block text-sm font-medium text-gray-700">Duration (minutes) <sup className="text-red-500">*</sup></label>
                <input type="number" id="duration_min" name="duration_min" defaultValue={60} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Default Capacity</label>
                <input type="number" id="capacity" name="capacity" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div className="space-y-2">
                <label htmlFor="min_bookings" className="block text-sm font-medium text-gray-700">Default Minimum Bookings</label>
                <input type="number" id="min_bookings" name="min_bookings" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="location_id" className="block text-sm font-medium text-gray-700">Location <sup className="text-red-500">*</sup></label>
                <select id="location_id" name="location_id" required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                  <option value="">Select an option</option>
                  {locations?.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="room_id" className="block text-sm font-medium text-gray-700">Default Room <sup className="text-red-500">*</sup></label>
                <select id="room_id" name="room_id" required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                  <option value="">Select an option</option>
                  <option value="room1">Main Studio</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="type_id" className="block text-sm font-medium text-gray-700">Class Type <sup className="text-red-500">*</sup></label>
              <select id="type_id" name="type_id" required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                <option value="">Select an option</option>
                {types?.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="package_types" className="block text-sm font-medium text-gray-700">Package Types <sup className="text-red-500">*</sup></label>
              <select id="package_types" name="package_types" multiple required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 h-24">
                <option value="group">Group Classes</option>
                <option value="private">Private Classes</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="recommended_packages" className="block text-sm font-medium text-gray-700">Recommended Packages (Max 3)</label>
              <select id="recommended_packages" name="recommended_packages" multiple className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 h-24">
                {packages?.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="font-medium text-gray-900">Visible to Public</div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="is_visible" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Class Image <sup className="text-red-500">*</sup></label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" required />
                </label>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 flex flex-wrap gap-3 border-t border-gray-200">
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 focus:outline-none transition-colors shadow-sm">
              Create
            </button>
            <button type="button" className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors">
              Create & create another
            </button>
            <Link href="/classes" className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
