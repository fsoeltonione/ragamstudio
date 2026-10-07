import { createData } from "../actions";
import Link from "next/link";
import { FileText, Type, CheckCircle } from "lucide-react";
import { RichTextEditor } from "@/components/ui/RichTextEditor";

export default function CreateBlogPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/blogs" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block">
          &larr; Back to Blogs
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create New Article</h1>
      </div>

      <form action={createData} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Content Area */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Article Title *</label>
            <div className="relative">
              <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" id="title" name="title" required placeholder="e.g. 5 Benefits of Pilates" className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Article Content (Markdown)</label>
            <RichTextEditor name="content_html" />
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-gray-500" /> Publishing
            </h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" name="is_published" value="true" className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500" />
                <div>
                  <div className="font-medium text-gray-900 text-sm">Publish Immediately</div>
                  <div className="text-xs text-gray-500">Make this article visible to public.</div>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
             <button type="submit" className="w-full py-3 text-sm font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600 shadow-sm">
                Save & Publish
             </button>
             <button type="button" className="w-full mt-2 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                Save Draft
             </button>
          </div>
        </div>

      </form>
    </div>
  );
}
