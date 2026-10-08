import { supabase } from "@/lib/supabase";
import { PlusCircle, Search, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const { data: users } = await supabase
    .from("users")
    .select("*, location:locations(name)")
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
            <select className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none hidden">
              <option>Bulk actions ▾</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <select className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none">
              <option>All Deleted records</option>
              <option>Only deleted records</option>
              <option>With deleted records</option>
            </select>
            <select className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none">
              <option>All Roles</option>
              <option>Superadmin</option>
              <option>Admin</option>
              <option>Trainer</option>
            </select>
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
                <th className="px-6 py-4 whitespace-nowrap"><button className="font-bold">Name</button></th>
                <th className="px-6 py-4 whitespace-nowrap"><button className="font-bold">Email</button></th>
                <th className="px-6 py-4 whitespace-nowrap"><button className="font-bold">Roles</button></th>
                <th className="px-6 py-4 whitespace-nowrap"><button className="font-bold">Locations</button></th>
                <th className="px-6 py-4 whitespace-nowrap"><button className="font-bold">Trainer</button></th>
                <th className="px-6 py-4 whitespace-nowrap"><button className="font-bold">Verified</button></th>
                <th className="px-6 py-4 whitespace-nowrap"><button className="font-bold">Created at</button></th>
                <th className="px-6 py-4 whitespace-nowrap text-right" role="columnheader">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users?.map((user: any) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {user.name || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 rounded text-xs font-bold bg-[#e3f2fd] text-[#1565c0]">
                      {user.role?.toLowerCase() || "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 rounded text-xs font-bold bg-[#fff8e1] text-[#f57f17]">
                      {user.location?.name || ((user.location as any)?.[0]?.name) || "All Locations"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.role === 'TRAINER' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                        Trainer
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.is_verified ? (
                      <Eye className="w-5 h-5 text-green-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-300" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {user.created_at ? format(new Date(user.created_at), "dd MMM yyyy") : "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/users/${user.id}`} className="text-gray-400 hover:text-gray-700 transition-colors" title="View" aria-label="View user">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link href={`/users/${user.id}/edit`} className="text-orange-600 hover:text-orange-800 font-medium text-sm" aria-label="Edit user">
                        Edit
                      </Link>
                      <button className="text-red-500 hover:text-red-700 transition-colors" aria-label="Delete user">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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