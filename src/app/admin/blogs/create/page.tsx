import { createBlog } from "../actions";
import Link from "next/link";
import { FileText } from "lucide-react";

export default function CreateBlogPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/blogs" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium">
          &larr; Back to Blogs
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">New Blog Post</h1>
      </div>

      <div className="space-y-6">
        <form action={createBlog} className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-bold text-gray-700">Content</h2>
            </div>
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
                  placeholder="e.g. 5 Benefits of Yoga"
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none font-bold text-lg"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                  Slug
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  disabled
                  placeholder="Auto-generated from title"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="content_html" className="block text-sm font-medium text-gray-700">
                  Content <sup className="text-red-500">*</sup>
                </label>
                {/* Mock Rich Text Editor */}
                <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-2">
                    <div className="h-6 w-6 bg-gray-200 rounded text-center text-sm font-bold leading-6">B</div>
                    <div className="h-6 w-6 bg-gray-200 rounded text-center text-sm italic leading-6">I</div>
                    <div className="h-6 w-6 bg-gray-200 rounded text-center text-sm underline leading-6">U</div>
                  </div>
                  <textarea
                    id="content_html"
                    name="content_html"
                    rows={12}
                    className="w-full p-4 focus:outline-none resize-y"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-bold text-gray-700">Status &amp; Meta</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="text-sm text-gray-500">Click to upload or drag and drop</div>
                  <div className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 2MB)</div>
                  <input type="file" className="hidden" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    id="type"
                    name="type"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    <option value="Article">Article</option>
                    <option value="Promotion">Promotion</option>
                    <option value="Tips &amp; Tricks">Tips &amp; Tricks</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    id="status"
                    name="status"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="published_at" className="block text-sm font-medium text-gray-700">Published At</label>
                <input
                  type="datetime-local"
                  id="published_at"
                  name="published_at"
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-700"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 focus:outline-none transition-colors shadow-sm">
              Create
            </button>
            <button type="button" className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors">
              Create &amp; create another
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
