import { supabase } from "@/lib/supabase";
import { Search, Star, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { toggleReviewApproval } from "./actions";

export const dynamic = "force-dynamic";

export default async function ReviewModerationPage() {
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*, member:members(name)")
    .order("created_at", { ascending: false });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Reviews Moderation
          </h1>
          <div className="text-sm text-gray-500 flex gap-2 mt-1">
            <span>Community</span>
            <span>&gt;</span>
            <span>Reviews</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <select className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none">
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
            </select>
            <select className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none">
              <option>All Public Status</option>
              <option>Public</option>
              <option>Hidden</option>
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
                <th className="px-6 py-4 whitespace-nowrap">Member</th>
                <th className="px-6 py-4 whitespace-nowrap">Class</th>
                <th className="px-6 py-4 whitespace-nowrap">Date &amp; Time</th>
                <th className="px-6 py-4 whitespace-nowrap">Trainer</th>
                <th className="px-6 py-4 whitespace-nowrap">Rating</th>
                <th className="px-6 py-4 whitespace-nowrap">Comment</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Public</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
                <th className="px-6 py-4 whitespace-nowrap">Created at</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reviews?.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {review.member?.name || "Unknown Member"}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    -
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    -
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    -
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-orange-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-200"}`} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                    {review.comment || <span className="italic text-gray-400">No comment</span>}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-gray-100 text-gray-600">Hidden</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {review.is_approved ? (
                      <span className="inline-flex px-2 py-1 rounded text-xs font-bold bg-[#e6f4ea] text-[#137333]">Approved</span>
                    ) : (
                      <span className="inline-flex px-2 py-1 rounded text-xs font-bold bg-amber-100 text-amber-700">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {format(new Date(review.created_at), "dd MMM yyyy")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <form action={toggleReviewApproval.bind(null, review.id, !review.is_approved)}>
                        <button
                          type="submit"
                          title={review.is_approved ? "Reject" : "Approve"}
                          className={`hover:bg-gray-100 p-1 rounded-md transition-colors ${
                            review.is_approved ? "text-red-500" : "text-green-600"
                          }`}
                        >
                          {review.is_approved ? <XCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                        </button>
                      </form>
                      <Link
                        href={"/review-moderation/" + review.id + "/edit"}
                        className="text-orange-600 hover:text-orange-800 font-medium text-sm ml-2"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {!reviews?.length && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <MessageSquare className="w-8 h-8 text-gray-300" />
                      <p className="font-medium">No reviews to moderate.</p>
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