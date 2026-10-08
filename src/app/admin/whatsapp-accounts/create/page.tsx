import { createWhatsappAccount } from "../actions";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

export default function CreateWhatsappAccountPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/whatsapp-accounts" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium">
          &larr; Back to WhatsApp Accounts
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">New WhatsApp Account</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form action={createWhatsappAccount} className="space-y-0">
          <div className="p-6 space-y-5">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
              <strong>Note:</strong> Enter the WhatsApp Business phone number and your provider API key (e.g. WA Cloud API, Fonnte, Wablas). The connection status will be set to Disconnected until verified.
            </div>

            <div className="space-y-2">
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                Phone Number <sup className="text-red-500">*</sup>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  required
                  placeholder="+62812345678"
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="provider_api_key" className="block text-sm font-medium text-gray-700">
                Provider API Key
              </label>
              <input
                type="password"
                id="provider_api_key"
                name="provider_api_key"
                placeholder="Your API key"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none font-mono"
              />
              <p className="text-xs text-gray-500">API key will be stored securely. Leave blank if not using an API-based provider.</p>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 flex gap-3 border-t border-gray-200">
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 focus:outline-none transition-colors shadow-sm">
              Create
            </button>
            <button type="button" className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors">
              Create &amp; create another
            </button>
            <Link href="/whatsapp-accounts" className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
