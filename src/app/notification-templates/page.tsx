import { supabase } from "@/lib/supabase";
import { PlusCircle, Search, Mail, Bell } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = 'force-dynamic';

export default async function NotificationTemplatesPage() {
  const { data: templates } = await supabase
    .from("notification_templates")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Notification Templates</h1>
          <p className="text-gray-500 mt-1">Configure automated email and push notifications</p>
        </div>
        <Link href="/notification-templates/create" className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
          <PlusCircle className="w-5 h-5" />
          Add New
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search templates..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Event Name</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Subject</th>
                <th className="px-6 py-4 font-medium">Created At</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {templates?.map((tpl) => (
                <tr key={tpl.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-bold text-gray-900">
                      {tpl.type === 'EMAIL' ? <Mail className="w-4 h-4 text-blue-500" /> : <Bell className="w-4 h-4 text-orange-500" />}
                      {tpl.event_name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={
                      "inline-flex px-2 py-1 rounded text-xs font-bold uppercase " + 
                      (tpl.type === 'EMAIL' ? "bg-blue-50 text-blue-700" : "bg-orange-50 text-orange-700")
                    }>
                      {tpl.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 truncate max-w-xs">
                    {tpl.subject}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {tpl.created_at ? format(new Date(tpl.created_at), "dd MMM yyyy") : "-"}
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
              {!templates?.length && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <Bell className="w-8 h-8 text-gray-300" />
                      <p className="font-medium">No notification templates found.</p>
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