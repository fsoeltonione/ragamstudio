import { supabase } from "@/lib/supabase";
import { PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import MembersTableClient from "./MembersTableClient";

export const dynamic = 'force-dynamic';

export default async function MembersPage({ searchParams }: { searchParams: { page?: string, search?: string } }) {
  const currentPage = parseInt(searchParams.page || "1", 10);
  const pageSize = 10;
  
  // Calculate range for pagination
  const from = (currentPage - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("members")
    .select(`
      id, 
      name, 
      email, 
      phone, 
      gender,
      status,
      created_at,
      member_packages(count)
    `, { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (searchParams.search) {
    query = query.ilike('name', `%${searchParams.search}%`);
  }

  const { data: members, count } = await query;
  const totalPages = count ? Math.ceil(count / pageSize) : 1;

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

      <div className="mb-4">
        <form className="relative max-w-md" action="/members">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            name="search"
            defaultValue={searchParams.search || ""}
            placeholder="Search members by name..." 
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </form>
      </div>

      <MembersTableClient 
        members={members || []} 
        currentPage={currentPage} 
        totalPages={totalPages} 
      />
    </>
  );
}
