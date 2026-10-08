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
  const taxRate = getVal('tax_rate') || '11';
  const isTaxInclusive = getVal('tax_inclusive') === 'true';

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Payment Settings</h1>
        <div className="text-sm text-gray-500 flex gap-2 mt-1">
          <span>Settings</span>
          <span>&gt;</span>
          <span>Payment Settings</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-gray-400" />
          <h2 className="font-bold text-gray-700">Payment Configuration</h2>
        </div>
        
        <form action={savePaymentSettings} className="p-6 space-y-8">
          
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-2">Active Gateways</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Manual Payment (Bank Transfer / QRIS)', 'Xendit Gateway', 'Midtrans Gateway', 'DOKU Gateway', 'Flip Gateway'].map(gateway => (
                <label key={gateway} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input type="checkbox" name="gateways" value={gateway} defaultChecked={gateway === 'Manual Payment (Bank Transfer / QRIS)' || gateway === 'Midtrans Gateway'} className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  <span className="text-sm font-medium text-gray-700">{gateway}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-2">Tax Settings</h3>
            
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <label htmlFor="tax_rate" className="block text-sm font-medium text-gray-700">Tax Rate <sup className="text-red-500">*</sup></label>
                <input type="number" id="tax_rate" name="tax_rate" defaultValue={taxRate} min={0} max={100} step="0.1" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="tax_inclusive" id="tax_inclusive" value="true" defaultChecked={isTaxInclusive} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-orange-500" />
                  <label htmlFor="tax_inclusive" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
                <div>
                  <label htmlFor="tax_inclusive" className="text-sm font-medium text-gray-700 block cursor-pointer">Tax Inclusive Pricing</label>
                  <span className="text-xs text-gray-500">If active, product prices already include the tax amount.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex gap-3">
            <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors">
              <Save className="w-4 h-4" /> Save changes
            </button>
          </div>
        </form>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .toggle-checkbox:checked { right: 0; border-color: #ea580c; }
        .toggle-checkbox:checked + .toggle-label { background-color: #ea580c; }
        .toggle-checkbox { right: 0; z-index: 1; border-color: #e5e7eb; transition: all 0.15s ease-out; }
      `}} />
    </div>
  );
}