import { supabase } from "@/lib/supabase";
import { PlusCircle, Search, MapPin, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function LocationsPage() {
  const { data: locations } = await supabase
    .from("locations")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Locations
          </h1>
          <div className="text-sm text-gray-500 flex gap-2 mt-1">
            <span>Settings</span>
            <span>&gt;</span>
            <span>Locations</span>
          </div>
        </div>
        <Link
          href="/locations/create"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm"
        >
          <PlusCircle className="w-5 h-5" />
          New location
        </Link>
      </div>

      {/* Sub-tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <Link href="/locations" className="border-orange-500 text-orange-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
            Locations
          </Link>
          <Link href="/locations/rooms" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
            Rooms
          </Link>
        </nav>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors">
              Bulk actions ▾
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
            <button className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 font-medium bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                </th>
                <th className="px-6 py-4 whitespace-nowrap">Name</th>
                <th className="px-6 py-4 whitespace-nowrap">Slug</th>
                <th className="px-6 py-4 whitespace-nowrap">Color</th>
                <th className="px-6 py-4 whitespace-nowrap">Address</th>
                <th className="px-6 py-4 whitespace-nowrap">Phone</th>
                <th className="px-6 py-4 whitespace-nowrap">Logo</th>
                <th className="px-6 py-4 whitespace-nowrap">Timezone</th>
                <th className="px-6 py-4 whitespace-nowrap">Allow cancellations</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {locations?.map((loc) => {
                const locAny = loc as any;
                return (
                <tr key={loc.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">
                    {loc.name}
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    {locAny.slug || loc.name.toLowerCase().replace(/ /g, '-')}
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: locAny.color || '#ea580c' }}></div>
                      {locAny.color || '#ea580c'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                    {loc.address}
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    {locAny.phone || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    {locAny.logo ? <img src={locAny.logo} alt="Logo" className="h-8 w-auto object-contain" /> : "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    {locAny.timezone || "Asia/Jakarta"}
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    {locAny.allow_cancellations !== false ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/locations/${loc.id}/edit`} className="text-gray-600 hover:text-gray-900 font-medium text-sm">Edit</Link>
                    </div>
                  </td>
                </tr>
              )})}
              {!locations?.length && (
                <tr>
                  <td colSpan={10} className="px-6 py-12 text-center text-gray-500">
                    No locations found.
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
