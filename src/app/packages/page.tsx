import { supabase } from "@/lib/supabase";
import { PlusCircle, Search, Package, MoreVertical } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function PackagesPage() {
  const { data: packages } = await supabase
    .from("packages")
    .select("*")
    .order("price", { ascending: true });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Packages</h1>
        </div>
        <Link href="/packages/create" className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm text-sm">
          <PlusCircle className="w-4 h-4" />
          New Package
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[500px]">
        
        {/* Filament-style Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50/50 px-2 pt-2 scrollbar-hide">
          <button className="whitespace-nowrap px-4 py-2.5 text-sm font-medium border-b-2 border-orange-500 text-orange-600 bg-white rounded-t-lg">
            Active Packages
            <span className="ml-2 inline-flex items-center justify-center bg-orange-100 text-orange-600 rounded-full h-5 px-2 text-[10px]">
              {packages?.filter(p => p.is_active).length || 0}
            </span>
          </button>
          <button className="whitespace-nowrap px-4 py-2.5 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-t-lg transition-colors">
            Trial Packages
          </button>
          <button className="whitespace-nowrap px-4 py-2.5 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-t-lg transition-colors">
            Promotional Packages
          </button>
          <button className="whitespace-nowrap px-4 py-2.5 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-t-lg transition-colors">
            Pending Promo
          </button>
          <button className="whitespace-nowrap px-4 py-2.5 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-t-lg transition-colors">
            Inactive Packages
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
              placeholder="Search packages by name..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto w-full flex-1">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                </th>
                <th className="px-6 py-4 font-bold whitespace-nowrap cursor-pointer hover:text-gray-900">
                  <div className="flex items-center gap-1">Package Name <span className="text-[10px]">▼</span></div>
                </th>
                <th className="px-6 py-4 font-bold whitespace-nowrap">Price</th>
                <th className="px-6 py-4 font-bold whitespace-nowrap">Total Sessions</th>
                <th className="px-6 py-4 font-bold whitespace-nowrap">Validity</th>
                <th className="px-6 py-4 font-bold whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {packages?.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                        <Package className="w-4 h-4" />
                      </div>
                      {pkg.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    Rp {pkg.price.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    {pkg.total_sessions} Sessions
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {pkg.duration_days} Days
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-orange-600 hover:text-orange-800 font-medium text-sm">Edit</button>
                      <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}

              {!packages?.length && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-gray-500">
                    No packages created yet.
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
