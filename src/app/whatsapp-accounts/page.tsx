import { supabase } from "@/lib/supabase";
import { PlusCircle, Search, MessageSquare, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = 'force-dynamic';

export default async function WhatsappAccountsPage() {
  const { data: accounts } = await supabase
    .from("whatsapp_accounts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">WhatsApp Accounts</h1>
          <p className="text-gray-500 mt-1">Manage WhatsApp API integrations</p>
        </div>
        <Link href="/whatsapp-accounts/create" className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
          <PlusCircle className="w-5 h-5" />
          Add New
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search whatsapp accounts..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Phone Number</th>
                <th className="px-6 py-4 font-medium">Provider API Key</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Created At</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {accounts?.map((acc) => (
                <tr key={acc.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-bold text-gray-900">
                      <MessageSquare className="w-4 h-4 text-green-500" />
                      {acc.phone_number}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                    {(acc.provider_api_key || "").substring(0, 10)}••••••••••
                  </td>
                  <td className="px-6 py-4">
                    {acc.is_connected ? (
                      <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-bold uppercase">
                        <CheckCircle2 className="w-3 h-3" /> Connected
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs bg-red-50 text-red-700 px-2 py-1 rounded-full font-bold uppercase">
                        <XCircle className="w-3 h-3" /> Disconnected
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {acc.created_at ? format(new Date(acc.created_at), "dd MMM yyyy") : "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-orange-600 hover:text-orange-800 text-sm font-medium">Edit</button>
                      <span className="text-gray-300">|</span>
                      <button className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {!accounts?.length && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <MessageSquare className="w-8 h-8 text-gray-300" />
                      <p className="font-medium">No WhatsApp accounts configured.</p>
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