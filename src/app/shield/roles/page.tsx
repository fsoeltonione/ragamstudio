import { supabase } from "@/lib/supabase";
import { PlusCircle, Search, Shield, Trash2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function RolesPage() {
  const { data: roles } = await supabase
    .from("roles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Roles
          </h1>
          <div className="text-sm text-gray-500 flex gap-2 mt-1">
            <span>Roles</span> <span>&gt;</span> <span>List</span>
          </div>
        </div>
        <Link
          href="/shield/roles/create"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm"
        >
          <PlusCircle className="w-5 h-5" />
          New Role
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors">
              Bulk actions ▼
            </button>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 font-bold bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                </th>
                <th className="px-6 py-4 whitespace-nowrap">Name</th>
                <th className="px-6 py-4 whitespace-nowrap">Guard Name</th>
                <th className="px-6 py-4 whitespace-nowrap">Permissions</th>
                <th className="px-6 py-4 whitespace-nowrap">Updated At</th>
                <th className="px-6 py-4 whitespace-nowrap"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {roles?.map((role: any) => {
                const perms = role.permissions_json || {};
                const permCount = Object.values(perms).reduce(
                  (total: number, p: any) =>
                    total + Object.values(p).filter(Boolean).length,
                  0
                );

                return (
                  <tr key={role.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {role.role_name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 rounded text-xs font-bold bg-[#fff8e1] text-[#f57f17]">
                        web
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 rounded text-xs font-bold bg-[#e3f2fd] text-[#1565c0]">
                        {String(permCount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {role.updated_at
                        ? format(new Date(role.updated_at), "dd MMM yyyy")
                        : role.created_at
                        ? format(new Date(role.created_at), "dd MMM yyyy")
                        : "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={"/shield/roles/" + role.id + "/edit"}
                          className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                        >
                          Edit
                        </Link>
                        <button className="text-red-500 hover:text-red-700 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!roles?.length && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <Shield className="w-8 h-8 text-gray-300" />
                      <p className="font-medium">No roles created yet.</p>
                      <Link href="/shield/roles/create" className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                        Create your first role
                      </Link>
                    </div>
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