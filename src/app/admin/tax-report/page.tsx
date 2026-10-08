import { supabase } from "@/lib/supabase";
import { Download } from "lucide-react";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function TaxReportPage() {
  const { data: transactions } = await supabase
    .from("transactions")
    .select("amount, created_at, members(name)")
    .order("created_at", { ascending: false })
    .limit(50);

  const totalGross = transactions?.reduce((sum, tx) => sum + Number(tx.amount || 0), 0) || 0;
  const taxRate = 10; // Assuming 10% for display
  const taxByGross = totalGross * (taxRate / 100);
  const taxByNet = (totalGross / (1 + (taxRate / 100))) * (taxRate / 100);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Monthly Tax Report
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500 font-medium">Gross Revenue</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {"IDR " + totalGross.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500 font-medium">Tax by Net Amount (2026-10-01 → 2026-10-31)</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {"IDR " + taxByNet.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500 font-medium">Tax by Gross (2026-10-01 → 2026-10-31)</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {"IDR " + taxByGross.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Start Date*</label>
              <input type="date" className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-orange-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">End Date*</label>
              <input type="date" className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-orange-500" />
            </div>
          </div>
          <button className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors">
            Export Report
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 font-bold bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                </th>
                <th className="px-6 py-4 whitespace-nowrap">Date</th>
                <th className="px-6 py-4 whitespace-nowrap">Customer</th>
                <th className="px-6 py-4 whitespace-nowrap">Gross Amount</th>
                <th className="px-6 py-4 whitespace-nowrap">Net Amount</th>
                <th className="px-6 py-4 whitespace-nowrap">Tax Rate</th>
                <th className="px-6 py-4 whitespace-nowrap">Tax Amount by Net Amount</th>
                <th className="px-6 py-4 whitespace-nowrap">Tax Amount by Gross</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions?.map((tx: any) => {
                const gross = Number(tx.amount || 0);
                const net = gross / 1.1;
                const taxNet = net * 0.1;
                const taxGross = gross * 0.1;

                return (
                  <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {tx.created_at ? format(new Date(tx.created_at), "MMM d, yyyy") : "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-bold">
                      {tx.members?.name || ((tx as any).members)?.[0]?.name || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      IDR {gross.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      IDR {net.toLocaleString("id-ID", { maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      10.00%
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      IDR {taxNet.toLocaleString("id-ID", { maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      IDR {taxGross.toLocaleString("id-ID", { maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                );
              })}
              {!transactions?.length && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
          <div>Showing 1 to {transactions?.length} of {transactions?.length} results</div>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">Previous</button>
            <button className="px-2 py-1 border border-orange-500 bg-orange-50 text-orange-600 rounded">1</button>
            <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </>
  );
}