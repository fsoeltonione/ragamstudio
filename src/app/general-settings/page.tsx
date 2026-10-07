import { supabase } from "@/lib/supabase";
import { saveGeneralSettings } from "./actions";
import { Settings, Save } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function GeneralSettingsPage() {
  const { data: settings } = await supabase
    .from("system_settings")
    .select("key_name, value_text")
    .eq("category", "GENERAL");

  const getVal = (key: string) => settings?.find(s => s.key_name === key)?.value_text || '';

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">General Settings</h1>
        <p className="text-gray-500 mt-1">Configure your studio's core identity and contact information.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-400" />
          <h2 className="font-bold text-gray-700">Studio Profile</h2>
        </div>
        
        <form action={saveGeneralSettings} className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="studio_name" className="block text-sm font-medium text-gray-700">Studio Name</label>
            <input type="text" id="studio_name" name="studio_name" defaultValue={getVal('studio_name')} placeholder="e.g. Ragam Studio" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Contact Email</label>
            <input type="email" id="email" name="email" defaultValue={getVal('email')} placeholder="hello@ragamstudio.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="text" id="phone" name="phone" defaultValue={getVal('phone')} placeholder="+62..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}