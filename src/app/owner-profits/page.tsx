import { supabase } from "@/lib/supabase";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function OwnerProfitsPage() {
  const { data: profits } = await supabase
    .from("owner_profits")
    .select("*")
    .order("period_start", { ascending: false });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Owner Profits
          </h1>
          <div className="text-sm text-gray-500 flex gap-2 mt-1">
            <span>Owner Profits</span> <span>&gt;</span> <span>List</span>
          </div>
        </div>
        <Link
          href="/owner-profits/create"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          New owner profit
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 font-bold bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Date Taken</th>
                <th className="px-6 py-4 whitespace-nowrap">Total Profit</th>
                <th className="px-6 py-4 whitespace-nowrap">Bookings</th>
                <th className="px-6 py-4 whitespace-nowrap">Packages</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {profits?.map((profit: any) => (
                <tr key={profit.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {profit.period_end ? format(new Date(profit.period_end), "dd MMM yyyy") : "-"}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {profit.net_profit ? "IDR " + Number(profit.net_profit).toLocaleString("id-ID") : "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {profit.sales_count || 0}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    -
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 rounded text-xs font-bold bg-gray-100 text-gray-600">
                      {profit.status || "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
              {!profits?.length && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">
                    No owner profits
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
