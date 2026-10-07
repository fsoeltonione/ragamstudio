import { supabase } from "@/lib/supabase";
import { PlusCircle, Search, Dumbbell } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function StudioClassesPage() {
  const { data: classes } = await supabase
    .from("studio_classes")
    .select("*")
    .order("name", { ascending: true });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Studio Classes</h1>
          <p className="text-gray-500 mt-1">Manage master data for class types, capacities, and durations</p>
        </div>
        <Link href="/classes/create" className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
          <PlusCircle className="w-5 h-5" />
          New Class Type
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search class types..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Class Name</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium text-center">Duration</th>
                <th className="px-6 py-4 font-medium text-center">Capacity</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {classes?.map((cls) => (
                <tr key={cls.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                        <Dumbbell className="w-4 h-4" />
                      </div>
                      <div className="font-bold">{cls.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 truncate max-w-[200px]">
                    {cls.description || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium text-center">
                    {cls.duration_min} min
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-bold">
                      {cls.capacity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${cls.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {cls.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-orange-600 hover:text-orange-800 font-medium">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

              {!classes?.length && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No class types found.
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
