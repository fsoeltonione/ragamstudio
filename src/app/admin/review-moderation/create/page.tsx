import { createReview } from "../actions";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function CreateReviewPage() {
  const { data: members } = await supabase.from("members").select("id, name").order("name", { ascending: true });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/review-moderation" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium">
          &larr; Back to Reviews
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add Manual Review</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form action={createReview} className="space-y-0">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label htmlFor="member_id" className="block text-sm font-medium text-gray-700">
                Member <sup className="text-red-500">*</sup>
              </label>
              <select
                id="member_id"
                name="member_id"
                required
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="">Select a member</option>
                {members?.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                Rating <sup className="text-red-500">*</sup>
              </label>
              <select
                id="rating"
                name="rating"
                required
                defaultValue="5"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Good</option>
                <option value="3">3 - Average</option>
                <option value="2">2 - Poor</option>
                <option value="1">1 - Terrible</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                Comment
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <textarea
                  id="comment"
                  name="comment"
                  rows={4}
                  placeholder="What did they say?"
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="is_approved"
                name="is_approved"
                value="true"
                defaultChecked
                className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="is_approved" className="text-sm font-medium text-gray-700">
                Approved (visible on site)
              </label>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 flex gap-3 border-t border-gray-200">
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 focus:outline-none transition-colors shadow-sm">
              Create
            </button>
            <Link href="/review-moderation" className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
