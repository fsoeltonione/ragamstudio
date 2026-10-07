import { supabase } from "@/lib/supabase";
import { PlusCircle, Search, CreditCard } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function PaymentMethodsPage() {
  const { data: methods } = await supabase.from("payment_methods").select("*").order("created_at", { ascending: false });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Payment Methods</h1>
          <p className="text-gray-500 mt-1">Configure accepted payment channels</p>
        </div>
        <Link href="/payment-methods/create" className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
          <PlusCircle className="w-5 h-5" />
          Add Method
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-medium">Method Name</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium text-center">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {methods?.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-orange-500" /> {m.name}
                </td>
                <td className="px-6 py-4 text-gray-600 font-medium">{m.type}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase ${m.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {m.is_active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-orange-600 font-medium cursor-pointer">Edit</td>
              </tr>
            ))}
            {!methods?.length && (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No payment methods found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
