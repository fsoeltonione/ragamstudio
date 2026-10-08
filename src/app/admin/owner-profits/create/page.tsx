import Link from "next/link";
import { generateMonthlyProfit } from "../actions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function CreateOwnerProfitPage() {

  async function handleGenerate(formData: FormData) {
    "use server";
    await generateMonthlyProfit(formData);
    redirect("/owner-profits");
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Link href="/owner-profits" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium">
            &larr; Back to Owner Profits
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">New Owner Profit</h1>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form action={handleGenerate} className="space-y-0">
          <div className="p-6 space-y-6">
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Profit Breakdown</label>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 font-bold bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3">Source</th>
                      <th className="px-6 py-3">Count</th>
                      <th className="px-6 py-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">From Bookings - RagamStudio</td>
                      <td className="px-6 py-4 text-gray-600">899</td>
                      <td className="px-6 py-4 text-right font-semibold text-gray-900">IDR 127,088,413.58</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea 
                id="notes" 
                name="notes" 
                rows={4} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="Enter any additional notes..."
              ></textarea>
            </div>
            
            {/* Hidden fields to mock the old submission data if actions.ts relies on it */}
            <input type="hidden" name="year" value={new Date().getFullYear()} />
            <input type="hidden" name="month" value={new Date().getMonth() + 1} />

          </div>

          <div className="px-6 py-4 bg-gray-50 flex gap-3 border-t border-gray-200">
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 focus:outline-none transition-colors shadow-sm">
              Create
            </button>
            <button type="button" className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors">
              Create &amp; create another
            </button>
            <Link href="/owner-profits" className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
