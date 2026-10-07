import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { PlusCircle, Search, Package } from "lucide-react";
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
          <p className="text-gray-500 mt-1">Manage master data for class packages and memberships</p>
        </div>
        <Link href="/packages/create" className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
          <PlusCircle className="w-5 h-5" />
          New Package
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search packages by name..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Package Name</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Total Sessions</th>
                <th className="px-6 py-4 font-medium">Validity</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {packages?.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                        <Package className="w-4 h-4" />
                      </div>
                      <div className="font-bold">{pkg.name}</div>
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
                    <button className="text-orange-600 hover:text-orange-800 font-medium">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

              {!packages?.length && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
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
