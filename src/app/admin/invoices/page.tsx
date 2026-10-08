import { supabase } from "@/lib/supabase";
import { PlusCircle, Search, FileText, Download, Eye, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function InvoicesPage({ searchParams }: { searchParams: { tab?: string } }) {
  const activeTab = searchParams.tab || 'all';

  let query = supabase
    .from("invoices")
    .select("*, member:members(name, email), package:packages(name)")
    .order("created_at", { ascending: false })
    .limit(100);

  if (activeTab === 'paid') query = query.eq('status', 'PAID');
  else if (activeTab === 'pending') query = query.eq('status', 'UNPAID');
  else if (activeTab === 'refunded') query = query.eq('status', 'REFUNDED');
  else if (activeTab === 'cancelled') query = query.eq('status', 'CANCELLED');

  const { data: records, error } = await query;

  const getTabClass = (tab: string) => 
    activeTab === tab 
      ? "px-4 py-2.5 text-sm font-medium border-b-2 border-orange-500 text-orange-600 bg-white rounded-t-lg"
      : "px-4 py-2.5 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-t-lg transition-colors";

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Invoices
          </h1>
          <div className="text-sm text-gray-500 flex gap-2 mt-1">
            <span>Invoices</span> <span>&gt;</span> <span>List</span>
          </div>
        </div>
        <Link
          href="/invoices/create"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          New invoice
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[500px]">
        
        {/* Filament-style Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50/50 px-2 pt-2">
          <Link href="/invoices?tab=all" className={getTabClass('all')}>All</Link>
          <Link href="/invoices?tab=paid" className={getTabClass('paid')}>Paid</Link>
          <Link href="/invoices?tab=pending" className={getTabClass('pending')}>Pending</Link>
          <Link href="/invoices?tab=refunded" className={getTabClass('refunded')}>Refunded</Link>
          <Link href="/invoices?tab=cancelled" className={getTabClass('cancelled')}>Cancelled</Link>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors">
              Mass Create
            </button>
            <button className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors">
              Export All
            </button>
            <select className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors outline-none ml-2">
              <option>Group by</option>
            </select>
            <select className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors outline-none">
              <option>Group direction</option>
            </select>
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
            <button className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-2">
              Filter <span className="bg-gray-200 text-gray-700 rounded-full px-1.5 py-0.5 text-[10px]">0</span>
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
                <th className="px-6 py-4 whitespace-nowrap">Member</th>
                <th className="px-6 py-4 whitespace-nowrap">Package</th>
                <th className="px-6 py-4 whitespace-nowrap">Package Types</th>
                <th className="px-6 py-4 whitespace-nowrap">Type</th>
                <th className="px-6 py-4 whitespace-nowrap">Amount</th>
                <th className="px-6 py-4 whitespace-nowrap">Invoice number</th>
                <th className="px-6 py-4 whitespace-nowrap">Invoice date</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap">Payment Proof</th>
                <th className="px-6 py-4 whitespace-nowrap">Payment Method</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {records?.map((rec: any) => (
                <tr key={rec.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    {((rec as any).member)?.name || ((rec as any).member)?.[0]?.name || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {((rec as any).package)?.name || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    -
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 rounded text-xs font-bold bg-[#e6f4ea] text-[#137333]">
                      Purchase
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {rec.amount ? "IDR " + Number(rec.amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "-"}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {rec.invoice_number || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {rec.created_at ? format(new Date(rec.created_at), "dd MMM yyyy") : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {rec.status === 'PAID' ? (
                      <span className="inline-flex px-2 py-1 rounded text-xs font-bold bg-[#e6f4ea] text-[#137333]">Paid</span>
                    ) : rec.status === 'UNPAID' ? (
                      <span className="inline-flex px-2 py-1 rounded text-xs font-bold bg-gray-100 text-gray-600">Pending</span>
                    ) : rec.status === 'REFUNDED' ? (
                      <span className="inline-flex px-2 py-1 rounded text-xs font-bold bg-blue-100 text-blue-700">Refunded</span>
                    ) : (
                      <span className="inline-flex px-2 py-1 rounded text-xs font-bold bg-gray-100 text-gray-600 capitalize">{rec.status?.toLowerCase() || "-"}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-400">-</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {rec.payment_method || "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-gray-400 hover:text-gray-700 transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-800 font-medium text-sm">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!records?.length && (
                <tr>
                  <td colSpan={12} className="px-6 py-12 text-center text-gray-500">
                    No invoices found.
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