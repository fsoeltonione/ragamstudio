import { supabase } from "@/lib/supabase";
import { PlusCircle, MessageSquare, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { createWhatsappAccount, deleteWhatsappAccount } from "./actions";

export const dynamic = "force-dynamic";

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
          <div className="text-sm text-gray-500 flex gap-2 mt-1">
            <span>Settings</span>
            <span>&gt;</span>
            <span>WhatsApp Accounts</span>
          </div>
        </div>
        <Link
          href="/whatsapp-accounts/create"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm"
        >
          <PlusCircle className="w-5 h-5" />
          New WhatsApp account
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="p-6 space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="master_switch" id="master_switch" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-orange-500" />
                  <label htmlFor="master_switch" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
                <label htmlFor="master_switch" className="font-bold text-gray-900 cursor-pointer">Master Switch: Enable WhatsApp Notifications</label>
              </div>
              <p className="text-sm text-gray-500 mt-1 ml-14">Turn off to completely disable all outgoing WhatsApp messages system-wide.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 border-t border-gray-100 pt-6">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="otp_switch" id="otp_switch" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-orange-500" />
                  <label htmlFor="otp_switch" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
                <label htmlFor="otp_switch" className="font-bold text-gray-900 cursor-pointer">Enable OTP for Registration</label>
              </div>
              <p className="text-sm text-gray-500 mt-1 ml-14">Require new members to verify their phone number via WhatsApp OTP.</p>
            </div>
          </div>
          
          <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm flex items-start gap-3 mt-4 border border-blue-100">
            <MessageSquare className="w-5 h-5 text-blue-500 flex-shrink-0" />
            <div>
              <p className="font-bold mb-1">Configuration Health</p>
              <p>Your WhatsApp integration is healthy. Ensure your provider API keys remain valid.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <style dangerouslySetInnerHTML={{__html: `
          .toggle-checkbox:checked { right: 0; border-color: #ea580c; }
          .toggle-checkbox:checked + .toggle-label { background-color: #ea580c; }
          .toggle-checkbox { right: 0; z-index: 1; border-color: #e5e7eb; transition: all 0.15s ease-out; }
        `}} />
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors">
              Bulk actions ▾
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
                <th className="px-6 py-4 whitespace-nowrap">Phone Number</th>
                <th className="px-6 py-4 whitespace-nowrap">Provider API Key</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
                <th className="px-6 py-4 whitespace-nowrap">Created At</th>
                <th className="px-6 py-4 whitespace-nowrap text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {accounts?.map((acc) => (
                <tr key={acc.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-bold text-gray-900">
                      <MessageSquare className="w-4 h-4 text-green-500" />
                      {acc.phone_number}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                    {acc.provider_api_key
                      ? acc.provider_api_key.substring(0, 12) + "..."
                      : "-"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {acc.is_connected ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Connected
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                        <XCircle className="w-3.5 h-3.5" />
                        Disconnected
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {acc.created_at
                      ? format(new Date(acc.created_at), "dd MMM yyyy")
                      : "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={"/whatsapp-accounts/" + acc.id + "/edit"}
                        className="text-orange-600 hover:text-orange-800 font-medium text-sm"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {!accounts?.length && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <MessageSquare className="w-8 h-8 text-gray-300" />
                      <p className="font-medium">No WhatsApp accounts configured yet.</p>
                      <Link href="/whatsapp-accounts/create" className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                        Connect your first account
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