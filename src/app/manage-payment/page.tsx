import { supabase } from "@/lib/supabase";
import { savePaymentSettings } from "./actions";
import { CreditCard, Save } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function PaymentGatewaySettingsPage() {
  const { data: settings } = await supabase
    .from("system_settings")
    .select("key_name, value_text")
    .eq("category", "PAYMENT");

  const getVal = (key: string) => settings?.find(s => s.key_name === key)?.value_text || '';

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Payment Gateway Settings</h1>
        <p className="text-gray-500 mt-1">Configure Midtrans and Xendit API integrations securely.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-gray-400" />
          <h2 className="font-bold text-gray-700">API Credentials</h2>
        </div>
        
        <form action={savePaymentSettings} className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="midtrans_key" className="block text-sm font-medium text-gray-700">Midtrans Server Key</label>
            <input type="password" id="midtrans_key" name="midtrans_key" defaultValue={getVal('midtrans_key')} placeholder="SB-Mid-server-..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
          </div>

          <div className="space-y-2">
            <label htmlFor="xendit_key" className="block text-sm font-medium text-gray-700">Xendit Secret Key</label>
            <input type="password" id="xendit_key" name="xendit_key" defaultValue={getVal('xendit_key')} placeholder="xnd_development_..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}