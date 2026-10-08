import { supabase } from "@/lib/supabase";
import { PlusCircle, Search, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const { data: users } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Users
          </h1>
          <div className="text-sm text-gray-500 flex gap-2 mt-1">
            <span>Users</span> <span>&gt;</span> <span>List</span>
          </div>
        </div>
        <Link
          href="/users/create"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm"
        >
          <PlusCircle className="w-5 h-5" />
          New user
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors">
              Bulk actions ▼
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              Filter
            </button>
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
                <th className="px-6 py-4 whitespace-nowrap">Email</th>
                <th className="px-6 py-4 whitespace-nowrap">Roles</th>
                <th className="px-6 py-4 whitespace-nowrap">Locations</th>
                <th className="px-6 py-4 whitespace-nowrap">Trainer</th>
                <th className="px-6 py-4 whitespace-nowrap">Verified</th>
                <th className="px-6 py-4 whitespace-nowrap">Created at</th>
                <th className="px-6 py-4 whitespace-nowrap text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users?.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    {user.role}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 rounded text-xs font-bold bg-[#fff8e1] text-[#f57f17]">
                      RagamStudio
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    -
                  </td>
                  <td className="px-6 py-4">
                    Yes
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {user.created_at ? format(new Date(user.created_at), "dd MMM yyyy") : "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-gray-400 hover:text-gray-700 transition-colors" title="View">
                        <Eye className="w-4 h-4" />
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
              {!users?.length && (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                    No users found.
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