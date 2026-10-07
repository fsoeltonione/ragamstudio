import { Search, Filter, X, Columns } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export default async function ShopsPage() {
  const { data: shops } = await supabase
    .from("shops")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[500px]">
      
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-100 flex justify-end gap-2 bg-gray-50/50">
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
        </div>
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-300 bg-white flex items-center justify-center">
          <Columns className="w-4 h-4" />
        </button>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm text-left text-gray-500 min-w-max">
          <thead className="text-xs text-gray-700 bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-bold whitespace-nowrap">Name</th>
              <th className="px-6 py-4 font-bold whitespace-nowrap">Location (Studio)</th>
              <th className="px-6 py-4 font-bold text-right whitespace-nowrap">Is active</th>
            </tr>
          </thead>
          <tbody>
            {shops && shops.length > 0 ? (
              shops.map((shop) => (
                <tr key={shop.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{shop.name}</td>
                  <td className="px-6 py-4 text-gray-500">RagamStudio</td>
                  <td className="px-6 py-4 text-right">
                    <button className={["relative inline-flex h-5 w-9 items-center rounded-full", shop.is_active ? 'bg-orange-500' : 'bg-gray-200'].join(' ')}>
                      <span className={["inline-block h-3.5 w-3.5 transform rounded-full bg-white transition", shop.is_active ? 'translate-x-4' : 'translate-x-1'].join(' ')}/>
                    </button>
                  </td>
                </tr>
              ))
            ) : null}
          </tbody>
        </table>
      </div>

      {(!shops || shops.length === 0) && (
        <div className="flex-1 flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
            <X className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-gray-900">No shops</h3>
        </div>
      )}
      
    </div>
  );
}
