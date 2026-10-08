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
          <div className="space-y-2 flex items-center gap-3">
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input type="checkbox" name="enable_topbar" id="enable_topbar" defaultChecked={getVal('enable_topbar') === 'true'} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-orange-500" />
              <label htmlFor="enable_topbar" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
            </div>
            <label htmlFor="enable_topbar" className="text-sm font-medium text-gray-700">Enable Topbar</label>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors">
              <Save className="w-4 h-4" /> Save Changes
            </button>
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
      `}} />
    </div>
  );
}