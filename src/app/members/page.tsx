import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { PlusCircle, Search, User } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function MembersPage() {
  const { data: members } = await supabase
    .from("members")
    .select(`
      id, 
      name, 
      email, 
      phone, 
      created_at,
      member_packages(count)
    `)
    .order("created_at", { ascending: false });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Members</h1>
          <p className="text-gray-500 mt-1">Manage studio members and client database</p>
        </div>
        <Link href="/members/create" className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
          <PlusCircle className="w-5 h-5" />
          New Member
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search members by name or email..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Contact Info</th>
                <th className="px-6 py-4 font-medium">Joined Date</th>
                <th className="px-6 py-4 font-medium text-center">Packages Owned</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {members?.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="font-bold">{member.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900 font-medium">{member.email}</div>
                    <div className="text-gray-500 text-xs">{member.phone || "No phone provided"}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {format(new Date(member.created_at), "dd MMM yyyy")}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">
                      {member.member_packages[0]?.count || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-orange-600 hover:text-orange-800 font-medium">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

              {!members?.length && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No members registered yet.
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
