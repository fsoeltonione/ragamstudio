import { supabase } from "@/lib/supabase";
import { PlusCircle, Settings, Search } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ShopsPage() {
  const { data: shops } = await supabase
    .from("shops")
    .select("*, location:locations(name)")
    .order("name", { ascending: true });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 px-6 pt-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shops</h1>
        </div>
        <Link href="/shop-management/shops/create" className="flex items-center gap-2 px-4 py-2 bg-[#ea580c] hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm text-sm">
          <PlusCircle className="w-4 h-4" />
          New shop
        </Link>
      </div>

      <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-white">
        <div></div>
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

      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 bg-gray-50 border-b border-gray-200 uppercase">
            <tr>
              <th className="px-4 py-4 font-medium whitespace-nowrap">Name</th>
              <th className="px-4 py-4 font-medium whitespace-nowrap">Location (Studio)</th>
              <th className="px-4 py-4 font-medium whitespace-nowrap text-center">Is active</th>
              <th className="px-4 py-4 font-medium whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {shops?.map((shop) => {
              const s = shop as any;
              return (
                <tr key={shop.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4 font-bold text-gray-900 whitespace-nowrap">
                    {shop.name}
                  </td>
                  <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                    {s.location?.name || "RagamStudio"}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button className={"relative inline-flex h-5 w-9 items-center rounded-full " + (shop.is_active ? "bg-orange-500" : "bg-gray-200")}>
                      <span className={"inline-block h-3.5 w-3.5 transform rounded-full bg-white transition " + (shop.is_active ? "translate-x-4" : "translate-x-1")} />
                    </button>
                  </td>
                  <td className="px-4 py-4 text-right whitespace-nowrap">
                    <button className="text-gray-600 hover:text-gray-900 font-medium text-sm mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900 font-medium text-sm">Delete</button>
                  </td>
                </tr>
              );
            })}

            {!shops?.length && (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center text-gray-500">
                  No shops found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
