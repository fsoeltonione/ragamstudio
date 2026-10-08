import { createUser } from "../actions";
import Link from "next/link";
import { UserCog } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function CreateUserPage() {
  const { data: locations } = await supabase.from("locations").select("id, name").order("name");

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Link
            href="/users"
            className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium"
          >
            &larr; Back to Users
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            New user
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form action={createUser} className="space-y-0">
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name <sup className="text-red-500">*</sup>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email <sup className="text-red-500">*</sup>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="roles" className="block text-sm font-medium text-gray-700">
                Roles <sup className="text-red-500">*</sup>
              </label>
              <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white flex flex-wrap gap-2 items-center cursor-text">
                <span className="bg-gray-100 border border-gray-200 text-gray-700 text-sm px-2 py-0.5 rounded flex items-center gap-1">
                  Staff <span className="text-gray-400 cursor-pointer hover:text-gray-600">×</span>
                </span>
                <input type="text" className="outline-none flex-1 min-w-[50px] text-sm" placeholder="Select an option" />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="assigned_locations" className="block text-sm font-medium text-gray-700">
                Assigned Locations
              </label>
              <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white flex flex-wrap gap-2 items-center cursor-text">
                <input type="text" className="outline-none flex-1 min-w-[50px] text-sm" placeholder="Select an option" />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="is_trainer" className="block text-sm font-medium text-gray-700">
                Trainer
              </label>
              <select
                id="is_trainer"
                name="is_trainer"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2 pt-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password <sup className="text-red-500">*</sup>
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  autoComplete="new-password"
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
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
            <Link href="/users" className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center">
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
