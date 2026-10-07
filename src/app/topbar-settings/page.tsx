import { supabase } from "@/lib/supabase";
import { saveTopbarSettings } from "./actions";
import { LayoutTemplate, Save } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function TopbarSettingsPage() {
  const { data: settings } = await supabase
    .from("system_settings")
    .select("key_name, value_text")
    .eq("category", "TOPBAR");

  const getVal = (key: string) => settings?.find(s => s.key_name === key)?.value_text || '';

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Topbar Settings</h1>
        <p className="text-gray-500 mt-1">Configure global announcement banners across the website.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex items-center gap-2">
          <LayoutTemplate className="w-5 h-5 text-gray-400" />
          <h2 className="font-bold text-gray-700">Announcement Banner</h2>
        </div>
        
        <form action={saveTopbarSettings} className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="announcement_text" className="block text-sm font-medium text-gray-700">Announcement Text</label>
            <input type="text" id="announcement_text" name="announcement_text" defaultValue={getVal('announcement_text')} placeholder="e.g. Diskon 50% untuk Pendaftar Baru!" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
          </div>

          <div className="space-y-2">
            <label htmlFor="announcement_link" className="block text-sm font-medium text-gray-700">Call to Action Link</label>
            <input type="url" id="announcement_link" name="announcement_link" defaultValue={getVal('announcement_link')} placeholder="https://..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
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