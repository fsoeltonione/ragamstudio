import Link from "next/link";
import { HelpCircle } from "lucide-react";

export default function CreateFaqPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/faqs" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium">
          &larr; Back to Faqs
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">New FAQ</h1>
      </div>

      <div className="space-y-6">
        <form className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                  Question <sup className="text-red-500">*</sup>
                </label>
                <div className="relative">
                  <HelpCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    id="question"
                    name="question"
                    required
                    className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
                  Answer <sup className="text-red-500">*</sup>
                </label>
                {/* Mock Rich Text Editor */}
                <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">
                  <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-2">
                    <div className="h-6 w-6 bg-gray-200 rounded text-center text-sm font-bold leading-6">B</div>
                    <div className="h-6 w-6 bg-gray-200 rounded text-center text-sm italic leading-6">I</div>
                    <div className="h-6 w-6 bg-gray-200 rounded text-center text-sm underline leading-6">U</div>
                  </div>
                  <textarea
                    id="answer"
                    name="answer"
                    rows={6}
                    required
                    className="w-full p-4 focus:outline-none resize-y"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="order" className="block text-sm font-medium text-gray-700">
                  Order
                </label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  defaultValue={0}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                  Is active
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="is_active" name="is_active" value="true" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-gray-100">
                <label htmlFor="show_on_booking_details" className="text-sm font-medium text-gray-700">
                  Show on booking details
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="show_on_booking_details" name="show_on_booking_details" value="true" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 flex gap-3 border-t border-gray-200">
              <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 focus:outline-none transition-colors shadow-sm">
                Create
              </button>
              <button type="button" className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors">
                Create &amp; create another
              </button>
              <Link href="/faqs" className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
