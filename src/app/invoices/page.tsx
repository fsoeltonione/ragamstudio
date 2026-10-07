import { supabase } from "@/lib/supabase";
import { PlusCircle, Search, FileText, Download } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = 'force-dynamic';

export default async function Page() {
  const { data: records } = await supabase.from("invoices").select("*").order("created_at", { ascending: false }).limit(50);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 capitalize">Invoices</h1>
          <p className="text-gray-500 mt-1">Manage invoices data and print PDF receipts</p>
        </div>
        <Link href="/invoices/create" className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
          <PlusCircle className="w-5 h-5" />
          Add New
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
        </div>
        
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-medium capitalize">Invoice Number</th>
              <th className="px-6 py-4 font-medium">Created At</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {records?.map((rec: any) => (
              <tr key={rec.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-500" /> {String(rec.invoice_number)}
                </td>
                <td className="px-6 py-4 text-gray-500">{rec.created_at ? format(new Date(rec.created_at), "dd MMM yyyy") : '-'}</td>
                <td className="px-6 py-4 text-right font-medium">
                  <button className="text-gray-500 hover:text-gray-900 inline-flex items-center gap-1 text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors">
                    <Download className="w-3 h-3"/> Download PDF
                  </button>
                </td>
              </tr>
            ))}
            {!records?.length && (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No data found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}