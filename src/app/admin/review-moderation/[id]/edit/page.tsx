import { supabase } from "@/lib/supabase";
import { updateReview } from "../../actions";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageSquare } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EditReviewPage({ params }: { params: { id: string } }) {
  const { data: review } = await supabase.from("reviews").select("*, member:members(name)").eq("id", params.id).single();

  if (!review) notFound();

  const updateWithId = updateReview.bind(null, params.id);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/review-moderation" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium">
          &larr; Back to Reviews
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Review</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form action={updateWithId} className="space-y-0">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Member</label>
              <input
                type="text"
                disabled
                value={review.member?.name || "Unknown Member"}
                className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <select
                id="rating"
                name="rating"
                required
                defaultValue={review.rating.toString()}
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
                  defaultValue={review.comment || ""}
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
                defaultChecked={review.is_approved}
                className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="is_approved" className="text-sm font-medium text-gray-700">
                Approved (visible on site)
              </label>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 flex gap-3 border-t border-gray-200">
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 focus:outline-none transition-colors shadow-sm">
              Save Changes
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
