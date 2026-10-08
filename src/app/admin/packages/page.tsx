import { supabase } from "@/lib/supabase";
import { PlusCircle, Search, Filter, Settings, Settings2 } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function PackagesPage({ searchParams }: { searchParams: { tab?: string } }) {
  const currentTab = searchParams?.tab || 'all';
  
  let query = supabase.from("packages").select("*, class_types(name)").order("price", { ascending: true });
  
  if (currentTab === 'active') query = query.eq('is_active', true);
  if (currentTab === 'inactive') query = query.eq('is_active', false);
  if (currentTab === 'trial') query = query.eq('type', 'TRIAL');
  if (currentTab === 'promotional') query = query.eq('type', 'PROMO');
  
  const { data: packages } = await query;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Packages</h1>
        </div>
        <Link href="/packages/create" className="flex items-center gap-2 px-4 py-2 bg-[#ea580c] hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm text-sm">
          <PlusCircle className="w-4 h-4" />
          New package
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[500px]">
        
        {/* Filament-style Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50/50 px-2 pt-2 scrollbar-hide">
          <Link href="/packages?tab=all" className={"whitespace-nowrap px-4 py-2.5 text-sm font-medium border-b-2 rounded-t-lg " + (currentTab === 'all' ? "border-orange-500 text-orange-600 bg-white" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100")}>
            All
          </Link>
          <Link href="/packages?tab=active" className={"whitespace-nowrap px-4 py-2.5 text-sm font-medium border-b-2 rounded-t-lg " + (currentTab === 'active' ? "border-orange-500 text-orange-600 bg-white" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100")}>
            Active Packages
          </Link>
          <Link href="/packages?tab=trial" className={"whitespace-nowrap px-4 py-2.5 text-sm font-medium border-b-2 rounded-t-lg " + (currentTab === 'trial' ? "border-orange-500 text-orange-600 bg-white" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100")}>
            Trial Packages
          </Link>
          <Link href="/packages?tab=promotional" className={"whitespace-nowrap px-4 py-2.5 text-sm font-medium border-b-2 rounded-t-lg " + (currentTab === 'promotional' ? "border-orange-500 text-orange-600 bg-white" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100")}>
            Promotional Packages
          </Link>
          <Link href="/packages?tab=pending" className={"whitespace-nowrap px-4 py-2.5 text-sm font-medium border-b-2 rounded-t-lg " + (currentTab === 'pending' ? "border-orange-500 text-orange-600 bg-white" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100")}>
            Pending Promo
          </Link>
          <Link href="/packages?tab=inactive" className={"whitespace-nowrap px-4 py-2.5 text-sm font-medium border-b-2 rounded-t-lg " + (currentTab === 'inactive' ? "border-orange-500 text-orange-600 bg-white" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100")}>
            Inactive Packages
          </Link>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
          <div className="flex items-center gap-2 relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button className="flex items-center p-1.5 text-gray-500 hover:bg-gray-100 rounded border border-transparent">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto w-full flex-1">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 w-10 text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                </th>
                <th className="px-4 py-4 font-medium whitespace-nowrap cursor-pointer hover:text-gray-900">Package Name</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Package Types</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Locations</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Price</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Normal Price Per Session</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Duration (Days)</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap">Credits / Sessions</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap text-center">Active</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap text-center">Payment Gateway</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap text-center">Trial</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap text-center">Promotional</th>
                <th className="px-4 py-4 font-medium whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {packages?.map((pkg) => {
                const p = pkg as any;
                return (
                <tr key={pkg.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4 text-center">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  </td>
                  <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {pkg.name}
                  </td>
                  <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                    {p.class_types?.name || "-"}
                  </td>
                  <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                    RagamStudio
                  </td>
                  <td className="px-4 py-4 text-gray-900 font-medium whitespace-nowrap">
                    IDR {pkg.price?.toLocaleString('id-ID')}
                  </td>
                  <td className="px-4 py-4 text-gray-900 font-medium whitespace-nowrap">
                    IDR {(pkg.price / (pkg.sessions || 1))?.toLocaleString('id-ID')}
                  </td>
                  <td className="px-4 py-4 text-gray-900 font-medium whitespace-nowrap">
                    {pkg.valid_days}
                  </td>
                  <td className="px-4 py-4 text-gray-900 font-medium whitespace-nowrap">
                    {pkg.sessions}
                  </td>
                  <td className="px-4 py-4 text-center">
                    {pkg.is_active ? <span className="text-green-600 font-bold">Yes</span> : <span className="text-gray-400">No</span>}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-green-600 font-bold">Yes</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {pkg.type === 'TRIAL' ? <span className="text-green-600 font-bold">Yes</span> : <span className="text-gray-400">No</span>}
                  </td>
                  <td className="px-4 py-4 text-center">
                    {pkg.type === 'PROMO' ? <span className="text-green-600 font-bold">Yes</span> : <span className="text-gray-400">No</span>}
                  </td>
                  <td className="px-4 py-4 text-right whitespace-nowrap">
                    <button className="text-gray-600 hover:text-gray-900 font-medium text-sm mr-3">Replicate</button>
                    <button className="text-gray-600 hover:text-gray-900 font-medium text-sm mr-3">View</button>
                    <button className="text-gray-600 hover:text-gray-900 font-medium text-sm mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900 font-medium text-sm">Delete</button>
                  </td>
                </tr>
                );
              })}

              {!packages?.length && (
                <tr>
                  <td colSpan={13} className="px-6 py-20 text-center text-gray-500">
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
