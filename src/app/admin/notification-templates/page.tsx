import { supabase } from "@/lib/supabase";
import { PlusCircle, Bell, Mail, Smartphone } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

function TypeBadge({ type }: { type: string }) {
  if (type === "EMAIL")
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
        <Mail className="w-3 h-3" />
        Email
      </span>
    );
  if (type === "PUSH")
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
        <Smartphone className="w-3 h-3" />
        Push
      </span>
    );
  if (type === "WHATSAPP")
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
        <Bell className="w-3 h-3" />
        WhatsApp
      </span>
    );
  return (
    <span className="inline-flex px-2 py-1 rounded text-xs font-bold bg-gray-100 text-gray-600">
      {type}
    </span>
  );
}

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
          <div className="text-sm text-gray-500 flex gap-2 mt-1">
            <span>Settings</span>
            <span>&gt;</span>
            <span>Notification Templates</span>
          </div>
        </div>
        <Link
          href="/notification-templates/create"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm"
        >
          <PlusCircle className="w-5 h-5" />
          New notification template
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                <th className="px-6 py-4 whitespace-nowrap">Event Name</th>
                <th className="px-6 py-4 whitespace-nowrap">Type</th>
                <th className="px-6 py-4 whitespace-nowrap">Subject</th>
                <th className="px-6 py-4 whitespace-nowrap">Created At</th>
                <th className="px-6 py-4 whitespace-nowrap text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {templates?.map((tpl) => (
                <tr key={tpl.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-bold text-gray-900">
                      <Bell className="w-4 h-4 text-orange-500" />
                      <span className="font-mono text-sm">{tpl.event_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <TypeBadge type={tpl.type} />
                  </td>
                  <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                    {tpl.subject || "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {tpl.created_at
                      ? format(new Date(tpl.created_at), "dd MMM yyyy")
                      : "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={"/notification-templates/" + tpl.id + "/edit"}
                        className="text-orange-600 hover:text-orange-800 font-medium text-sm"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {!templates?.length && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <Bell className="w-8 h-8 text-gray-300" />
                      <p className="font-medium">No notification templates yet.</p>
                      <Link href="/notification-templates/create" className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                        Create your first template
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