import { supabase } from "@/lib/supabase";
import { updateBlog } from "../../actions";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const { data: blog } = await supabase.from("blogs").select("*").eq("id", params.id).single();

  if (!blog) notFound();

  const updateWithId = updateBlog.bind(null, params.id);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/blogs" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium">
          &larr; Back to Blogs
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Blog Post</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form action={updateWithId} className="space-y-0">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title <sup className="text-red-500">*</sup>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                defaultValue={blog.title}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none font-bold text-lg"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                Slug <sup className="text-red-500">*</sup>
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                required
                defaultValue={blog.slug}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="content_html" className="block text-sm font-medium text-gray-700">
                Content (HTML)
              </label>
              <textarea
                id="content_html"
                name="content_html"
                rows={10}
                defaultValue={blog.content_html || ""}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none font-mono text-sm resize-y"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="is_published"
                name="is_published"
                value="true"
                defaultChecked={blog.is_published}
                className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="is_published" className="text-sm font-medium text-gray-700">
                Published
              </label>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 flex gap-3 border-t border-gray-200">
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 focus:outline-none transition-colors shadow-sm">
              Save Changes
            </button>
            <Link href="/blogs" className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
