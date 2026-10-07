import { supabase } from "@/lib/supabase";
import { saveSeoSettings } from "./actions";
import { Globe, Save } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function SeoSettingsPage() {
  const { data: settings } = await supabase
    .from("system_settings")
    .select("key_name, value_text")
    .eq("category", "SEO");

  const getVal = (key: string) => settings?.find(s => s.key_name === key)?.value_text || '';

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">SEO Settings</h1>
        <p className="text-gray-500 mt-1">Configure search engine meta tags and indexing parameters.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex items-center gap-2">
          <Globe className="w-5 h-5 text-gray-400" />
          <h2 className="font-bold text-gray-700">Meta Information</h2>
        </div>
        
        <form action={saveSeoSettings} className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="meta_title" className="block text-sm font-medium text-gray-700">Meta Title</label>
            <input type="text" id="meta_title" name="meta_title" defaultValue={getVal('meta_title')} placeholder="Ragam Studio | Pilates & Yoga" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
          </div>

          <div className="space-y-2">
            <label htmlFor="meta_desc" className="block text-sm font-medium text-gray-700">Meta Description</label>
            <textarea id="meta_desc" name="meta_desc" defaultValue={getVal('meta_desc')} rows={4} placeholder="Find the best fitness studio in town..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"></textarea>
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