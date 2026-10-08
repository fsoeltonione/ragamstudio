import { supabase } from "@/lib/supabase";
import { PlusCircle, Search, Copy, Globe, Image as ImageIcon, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function StudioClassesPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const activeTab = searchParams.tab || 'classes';

  const { data: classes } = await supabase
    .from("studio_classes")
    .select("*, class_levels(name), class_types(name)")
    .order("name", { ascending: true });

  const { data: levels } = await supabase
    .from("class_levels")
    .select("*")
    .order("name", { ascending: true });

  const { data: typesRaw } = await supabase
    .from("class_types")
    .select("*, studio_classes(count)")
    .order("name", { ascending: true });

  const types = typesRaw?.map((t: any) => ({
    ...t,
    class_count: t.studio_classes?.[0]?.count || 0
  }));

  const getTabClass = (tab: string) => 
    activeTab === tab 
      ? "px-4 py-2.5 text-sm font-medium border-b-2 border-orange-500 text-orange-600 bg-white rounded-t-lg"
      : "px-4 py-2.5 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-t-lg transition-colors";

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {activeTab === 'classes' ? 'Classes' : activeTab === 'levels' ? 'Levels' : 'Class Types'}
          </h1>
        </div>
        <div className="flex gap-2">
          {activeTab === 'classes' && (
            <select className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors text-sm shadow-sm">
              <option>English</option>
              <option>Indonesian</option>
            </select>
          )}
          <Link
            href={activeTab === 'levels' ? '/classes/levels/create' : activeTab === 'types' ? '/classes/types/create' : '/classes/create'}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors text-sm shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            New {activeTab === 'levels' ? 'level' : activeTab === 'types' ? 'class type' : 'class'}
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[500px]">
        
        {/* Filament-style Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50/50 px-2 pt-2">
          <Link href="/classes?tab=classes" className={getTabClass('classes')}>Classes</Link>
          <Link href="/classes?tab=levels" className={getTabClass('levels')}>Levels</Link>
          <Link href="/classes?tab=types" className={getTabClass('types')}>Class Types</Link>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors">
              Bulk actions ▼
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            {activeTab === 'classes' && (
              <button className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                Filter
              </button>
            )}
          </div>
        </div>
        
        {/* Rich Table Container */}
        <div className="overflow-x-auto w-full flex-1">
          {activeTab === 'classes' && (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 font-bold bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 w-10">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap">Name</th>
                  <th className="px-6 py-4 whitespace-nowrap">Slug</th>
                  <th className="px-6 py-4 whitespace-nowrap">Class Type</th>
                  <th className="px-6 py-4 whitespace-nowrap">Level</th>
                  <th className="px-6 py-4 whitespace-nowrap">Package Types</th>
                  <th className="px-6 py-4 whitespace-nowrap">Image</th>
                  <th className="px-6 py-4 whitespace-nowrap">Duration</th>
                  <th className="px-6 py-4 whitespace-nowrap text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {classes?.map((cls) => (
                  <tr key={cls.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {cls.name}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {cls.slug || '-'}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {((cls as any).class_types)?.name || '-'}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {((cls as any).class_levels)?.name || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {(cls.package_types_json || []).map((pt: string, i: number) => (
                          <span key={i} className="inline-flex px-2 py-1 rounded text-xs font-bold bg-[#fff8e1] text-[#f57f17]">
                            {pt}
                          </span>
                        ))}
                      </div>
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
                    <td className="px-6 py-4 text-gray-500">
                      {cls.duration_min || 0} mins
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button className="text-gray-400 hover:text-gray-700 transition-colors" title="Replicate">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button className="text-orange-600 hover:text-orange-800 font-medium text-sm">
                          Edit
                        </button>
                        <button className="text-red-500 hover:text-red-700 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!classes?.length && (
                  <tr>
                    <td colSpan={9} className="px-6 py-20 text-center text-gray-500">
                      No classes found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {activeTab === 'levels' && (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 font-bold bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 w-10">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap">Name</th>
                  <th className="px-6 py-4 whitespace-nowrap">Active</th>
                  <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {levels?.map((lvl) => (
                  <tr key={lvl.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {lvl.name}
                    </td>
                    <td className="px-6 py-4">
                      {lvl.is_active ? (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-[#e6f4ea] text-[#137333]">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-gray-100 text-gray-500">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={"/classes/levels/" + lvl.id + "/edit"} className="text-orange-600 hover:text-orange-800 font-medium text-sm">Edit</Link>
                        <button className="text-red-500 hover:text-red-700 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!levels?.length && (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center text-gray-500">
                      No class levels found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {activeTab === 'types' && (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 font-bold bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 w-10">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap">Name</th>
                  <th className="px-6 py-4 whitespace-nowrap">Classes</th>
                  <th className="px-6 py-4 whitespace-nowrap">Active</th>
                  <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {types?.map((typ: any) => (
                  <tr key={typ.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {typ.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 rounded text-xs font-bold bg-[#e3f2fd] text-[#1565c0]">
                        {typ.class_count !== undefined ? String(typ.class_count) : '0'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {typ.is_active ? (
                        <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-orange-500">
                          <span className="inline-block h-3.5 w-3.5 transform rounded-full bg-white transition translate-x-4"/>
                        </button>
                      ) : (
                        <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-300">
                          <span className="inline-block h-3.5 w-3.5 transform rounded-full bg-white transition translate-x-1"/>
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button className="text-gray-400 hover:text-gray-700 transition-colors" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <Link href={"/classes/types/" + typ.id + "/edit"} className="text-orange-600 hover:text-orange-800 font-medium text-sm">Edit</Link>
                        <button className="text-red-500 hover:text-red-700 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!types?.length && (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center text-gray-500">
                      No class types found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
