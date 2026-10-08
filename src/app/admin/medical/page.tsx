import { supabase } from "@/lib/supabase";
import { PlusCircle, Search, Columns } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function MedicalQuestionsPage() {
  const { data: questions } = await supabase
    .from("medical")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Medical Questions
          </h1>
          <div className="text-sm text-gray-500 flex gap-2 mt-1">
            <span>Medical Management</span>
            <span>&gt;</span>
            <span>Medical Questions</span>
            <span>&gt;</span>
            <span>List</span>
          </div>
        </div>
        <Link
          href="/medical/create"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm"
        >
          <PlusCircle className="w-5 h-5" />
          New medical question
        </Link>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-6">
        <a href="#" className="pb-2 px-1 text-sm font-medium border-b-2 border-orange-500 text-orange-600 transition-colors">Medical Questions</a>
        <a href="#" className="pb-2 px-1 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 transition-colors">Medical Answers</a>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded">
              {questions?.length || 0} results
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-2" title="Column manager">
              <Columns className="w-4 h-4" />
            </button>
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
                <th className="px-6 py-4 whitespace-nowrap">Input type</th>
                <th className="px-6 py-4 whitespace-nowrap">Is active</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {questions?.map((q) => (
                <tr key={q.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900 max-w-lg">
                      {q.condition_name || q.question || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-bold capitalize">
                      {q.input_type || "Text"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${q.is_active !== false ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={"/medical/" + q.id + "/edit"}
                        className="text-orange-600 hover:text-orange-800 font-medium text-sm"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {!questions?.length && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <p className="font-medium">No medical questions configured yet.</p>
                      <Link
                        href="/medical/create"
                        className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                      >
                        New medical question
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
