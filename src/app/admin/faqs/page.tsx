import { FileText, PlusCircle, Search } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Faqs
          </h1>
          <div className="text-sm text-gray-500 flex gap-2 mt-1">
            <span>Content</span>
            <span>&gt;</span>
            <span>Faqs</span>
          </div>
        </div>
        <Link
          href="/faqs/create"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm"
        >
          <PlusCircle className="w-5 h-5" />
          New faq
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <select className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none">
              <option>All Is Active</option>
              <option>Yes</option>
              <option>No</option>
            </select>
            <select className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none">
              <option>English</option>
              <option>Indonesian</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 font-bold bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                </th>
                <th className="px-6 py-4 whitespace-nowrap">Question</th>
                <th className="px-6 py-4 whitespace-nowrap">Language</th>
                <th className="px-6 py-4 whitespace-nowrap">Order</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Is active</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="w-8 h-8 text-gray-300" />
                    <p className="font-medium">No FAQs found.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}