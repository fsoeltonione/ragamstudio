import { supabase } from "@/lib/supabase";
import { updateMedicalCondition } from "../../actions";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeartPulse } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EditMedicalPage({ params }: { params: { id: string } }) {
  const { data: condition } = await supabase.from("medical").select("*").eq("id", params.id).single();

  if (!condition) notFound();

  const updateWithId = updateMedicalCondition.bind(null, params.id);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/medical" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium">
          &larr; Back to Medical Conditions
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Medical Condition</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form action={updateWithId} className="space-y-0">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label htmlFor="condition_name" className="block text-sm font-medium text-gray-700">
                Condition Name <sup className="text-red-500">*</sup>
              </label>
              <div className="relative">
                <HeartPulse className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
                <input
                  type="text"
                  id="condition_name"
                  name="condition_name"
                  required
                  defaultValue={condition.condition_name}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description & Notes
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={condition.description || ""}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none"
              />
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 flex gap-3 border-t border-gray-200">
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 focus:outline-none transition-colors shadow-sm">
              Save Changes
            </button>
            <Link href="/medical" className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
