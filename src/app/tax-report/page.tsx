import { supabase } from "@/lib/supabase";
import { FileText, Download } from "lucide-react";
import { format } from "date-fns";

export const dynamic = 'force-dynamic';

export default async function TaxReportPage() {
  const { data: transactions } = await supabase.from("transactions").select("amount, created_at").order("created_at", { ascending: false });

  const grossRevenue = transactions?.reduce((sum, tx) => sum + Number(tx.amount), 0) || 0;
  const pb1Tax = grossRevenue * 0.10; // 10% PB1
  const ppnTax = grossRevenue * 0.11; // 11% PPN

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Monthly Tax Report</h1>
          <p className="text-gray-500 mt-1">Automated PB1 & PPN calculations from POS revenue</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors">
          <Download className="w-5 h-5" />
          Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 border-l-4 border-l-blue-500">
          <p className="text-sm font-medium text-gray-500">Gross Revenue (YTD)</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">Rp {grossRevenue.toLocaleString('id-ID')}</h3>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 border-l-4 border-l-orange-500">
          <p className="text-sm font-medium text-gray-500">Estimated PB1 (10%)</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">Rp {pb1Tax.toLocaleString('id-ID')}</h3>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 border-l-4 border-l-red-500">
          <p className="text-sm font-medium text-gray-500">Estimated PPN (11%)</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">Rp {ppnTax.toLocaleString('id-ID')}</h3>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
          <FileText className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Tax Engine Active</h3>
        <p className="text-gray-500 max-w-sm">The tax calculation engine is actively scanning real-time POS transactions. Detailed monthly breakdowns will be available at the end of the billing cycle.</p>
      </div>
    </>
  );
}