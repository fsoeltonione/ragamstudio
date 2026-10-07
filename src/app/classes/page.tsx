import { supabase } from "@/lib/supabase";
import { PlusCircle, Search, Copy, Globe, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function StudioClassesPage() {
  const { data: classes } = await supabase
    .from("studio_classes")
    .select("*, class_levels(name), class_types(name)")
    .order("name", { ascending: true });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Classes</h1>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors text-sm shadow-sm">
            <Globe className="w-4 h-4" />
            English
          </button>
          <Link href="/classes/create" className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors text-sm shadow-sm">
            <PlusCircle className="w-4 h-4" />
            New Class
          </Link>
        </div>
      </div>

      {/* Tabs Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[500px]">
        
        {/* Filament-style Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50/50 px-2 pt-2">
          <button className="px-4 py-2.5 text-sm font-medium border-b-2 border-orange-500 text-orange-600 bg-white rounded-t-lg">
            Classes
          </button>
          <button className="px-4 py-2.5 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-t-lg transition-colors">
            Levels
          </button>
          <button className="px-4 py-2.5 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-t-lg transition-colors">
            Class Types
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors">
              Bulk Actions ▼
            </button>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Rich Table */}
        <div className="overflow-x-auto w-full flex-1">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                </th>
                <th className="px-6 py-4 font-bold whitespace-nowrap">Image</th>
                <th className="px-6 py-4 font-bold whitespace-nowrap cursor-pointer hover:text-gray-900">
                  <div className="flex items-center gap-1">Name <span className="text-[10px]">▼</span></div>
                </th>
                <th className="px-6 py-4 font-bold whitespace-nowrap">Slug</th>
                <th className="px-6 py-4 font-bold whitespace-nowrap">Level</th>
                <th className="px-6 py-4 font-bold whitespace-nowrap">Package Types</th>
                <th className="px-6 py-4 font-bold whitespace-nowrap">Is Active</th>
                <th className="px-6 py-4 font-bold whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {classes?.map((cls) => (
                <tr key={cls.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  </td>
                  <td className="px-6 py-4">
                    {cls.image_url ? (
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 relative">
                        <img src={cls.image_url} alt={cls.name} className="object-cover w-full h-full" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200">
                        <ImageIcon className="w-5 h-5 text-gray-300" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {cls.name}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs font-mono">
                    {cls.slug || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700">
                      {cls.class_levels?.name || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {(cls.package_types_json || []).map((pt: string, i: number) => (
                        <span key={i} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                          {pt}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className={["relative inline-flex h-5 w-9 items-center rounded-full", cls.is_active ? 'bg-orange-500' : 'bg-gray-200'].join(' ')}>
                      <span className={["inline-block h-3.5 w-3.5 transform rounded-full bg-white transition", cls.is_active ? 'translate-x-4' : 'translate-x-1'].join(' ')}/>
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-gray-400 hover:text-gray-700 transition-colors" title="Replicate">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-800 font-medium text-sm">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!classes?.length && (
                <tr>
                  <td colSpan={8} className="px-6 py-20 text-center text-gray-500">
                    No classes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
