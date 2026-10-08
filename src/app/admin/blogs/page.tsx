import { supabase } from "@/lib/supabase";
import { PlusCircle, Search, FileText, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Blogs
          </h1>
          <div className="text-sm text-gray-500 flex gap-2 mt-1">
            <span>Content</span>
            <span>&gt;</span>
            <span>Blogs</span>
          </div>
        </div>
        <Link
          href="/blogs/create"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm"
        >
          <PlusCircle className="w-5 h-5" />
          New blog
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <select className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none">
              <option>All Status</option>
              <option>Draft</option>
              <option>Published</option>
              <option>Archived</option>
            </select>
            <select className="border border-gray-300 rounded px-3 py-1.5 text-sm outline-none">
              <option>All Types</option>
              <option>Article</option>
              <option>Promotion</option>
              <option>Tips &amp; Tricks</option>
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
                <th className="px-6 py-4 whitespace-nowrap">Image</th>
                <th className="px-6 py-4 whitespace-nowrap">Title</th>
                <th className="px-6 py-4 whitespace-nowrap">Type</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
                <th className="px-6 py-4 whitespace-nowrap">Published at</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {blogs?.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                      <FileText className="w-5 h-5" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">
                      {blog.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {blog.type || "Article"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold " +
                        (blog.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : blog.status === "Archived"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600")
                      }
                    >
                      <div
                        className={
                          "w-1.5 h-1.5 rounded-full " +
                          (blog.status === "Published" ? "bg-green-500" : blog.status === "Archived" ? "bg-red-500" : "bg-gray-400")
                        }
                      />
                      {blog.status || (blog.is_published ? "Published" : "Draft")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {blog.published_at ? format(new Date(blog.published_at), "dd MMM yyyy") : "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={"/blogs/" + blog.id + "/edit"}
                        className="text-orange-600 hover:text-orange-800 font-medium text-sm"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {!blogs?.length && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="w-8 h-8 text-gray-300" />
                      <p className="font-medium">No blog posts yet.</p>
                      <Link
                        href="/blogs/create"
                        className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                      >
                        Create your first post
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