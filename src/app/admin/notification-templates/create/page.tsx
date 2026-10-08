import { createNotificationTemplate } from "../actions";
import Link from "next/link";
import { Bell } from "lucide-react";

export default function CreateNotificationTemplatePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/notification-templates" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium">
          &larr; Back to Notification Templates
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">New Notification Template</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form action={createNotificationTemplate} className="space-y-0">
          <div className="p-6 space-y-5">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
              <strong>Tip:</strong> Use placeholders like{" "}
              <code className="bg-blue-100 px-1 rounded">{"{{member_name}}"}</code>,{" "}
              <code className="bg-blue-100 px-1 rounded">{"{{booking_date}}"}</code>,{" "}
              <code className="bg-blue-100 px-1 rounded">{"{{invoice_number}}"}</code> in the body template.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Type <sup className="text-red-500">*</sup>
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
                >
                  <option value="">Select type</option>
                  <option value="EMAIL">Email</option>
                  <option value="PUSH">Push Notification</option>
                  <option value="WHATSAPP">WhatsApp</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="event_name" className="block text-sm font-medium text-gray-700">
                  Event Name <sup className="text-red-500">*</sup>
                </label>
                <div className="relative">
                  <Bell className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    id="event_name"
                    name="event_name"
                    required
                    placeholder="e.g. booking_confirmed"
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none font-mono"
                  />
                </div>
                <p className="text-xs text-gray-500">Snake_case identifier, e.g. booking_confirmed</p>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject / Title
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="e.g. Booking Confirmed - {{studio_name}}"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="body_template" className="block text-sm font-medium text-gray-700">
                Body Template
              </label>
              <textarea
                id="body_template"
                name="body_template"
                rows={8}
                placeholder={"Hi {{member_name}},\n\nYour booking on {{booking_date}} has been confirmed.\n\nSee you at the studio!\n\n- {{studio_name}} Team"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none resize-y font-mono text-sm"
              />
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 flex gap-3 border-t border-gray-200">
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 focus:outline-none transition-colors shadow-sm">
              Create
            </button>
            <button type="button" className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors">
              Create &amp; create another
            </button>
            <Link href="/notification-templates" className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
