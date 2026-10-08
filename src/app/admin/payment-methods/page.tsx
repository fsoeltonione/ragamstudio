import { supabase } from "@/lib/supabase";
import { PlusCircle, CreditCard, Banknote, Smartphone, QrCode, Search } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

function MethodIcon({ type }: { type: string }) {
  if (type === "CASH") return <Banknote className="w-4 h-4 text-green-600" />;
  if (type === "QRIS") return <QrCode className="w-4 h-4 text-purple-600" />;
  if (type === "CARD") return <CreditCard className="w-4 h-4 text-blue-600" />;
  return <Smartphone className="w-4 h-4 text-orange-600" />;
}

function typeLabel(type: string) {
  const map: Record<string, string> = {
    CASH: "Cash",
    BANK_TRANSFER: "Bank Transfer",
    QRIS: "QRIS",
    CARD: "Credit / Debit Card",
    E_WALLET: "E-Wallet",
  };
  return map[type] || type;
}

export default async function PaymentMethodsPage() {
  const { data: methods } = await supabase
    .from("payment_methods")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Payment Methods
          </h1>
          <div className="text-sm text-gray-500 flex gap-2 mt-1">
            <span>Settings</span>
            <span>&gt;</span>
            <span>Payment Methods</span>
          </div>
        </div>
        <Link
          href="/payment-methods/create"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm"
        >
          <PlusCircle className="w-5 h-5" />
          New payment method
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
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search" className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 font-bold bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                </th>
                <th className="px-6 py-4 whitespace-nowrap">Type</th>
                <th className="px-6 py-4 whitespace-nowrap">Name</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Active</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Show on Invoice</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Created at</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {methods?.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 rounded text-xs font-bold bg-gray-100 text-gray-600">
                      {typeLabel(m.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-bold text-gray-900">
                      <MethodIcon type={m.type} />
                      {m.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {m.is_active ? (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-[#e6f4ea] text-[#137333]">Yes</span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-gray-100 text-gray-500">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {m.show_on_invoice !== false ? (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-[#e6f4ea] text-[#137333]">Yes</span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-gray-100 text-gray-500">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-500">
                    {m.created_at ? new Date(m.created_at).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={"/payment-methods/" + m.id + "/edit"}
                        className="text-orange-600 hover:text-orange-800 font-medium text-sm"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {!methods?.length && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <CreditCard className="w-8 h-8 text-gray-300" />
                      <p className="font-medium">No payment methods configured yet.</p>
                      <Link href="/payment-methods/create" className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                        Add your first payment method
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
