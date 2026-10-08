import { createMedicalCondition } from "../actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function CreateMedicalPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <Link
          href="/medical"
          className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium"
        >
          &larr; Back to Medical Questions
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          New medical question
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form action={createMedicalCondition} className="space-y-0">
          <div className="p-6 space-y-6">
            
            <div className="space-y-2">
              <label
                htmlFor="question"
                className="block text-sm font-medium text-gray-700"
              >
                Question <sup className="text-red-500">*</sup>
              </label>
              <textarea
                id="question"
                name="question"
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              ></textarea>
            </div>

            <div className="space-y-2 max-w-md">
              <label
                htmlFor="input_type"
                className="block text-sm font-medium text-gray-700"
              >
                Input type <sup className="text-red-500">*</sup>
              </label>
              <select
                id="input_type"
                name="input_type"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
              >
                <option value="">Select an option</option>
                <option value="text">Text</option>
                <option value="textarea">Textarea</option>
                <option value="checkbox">Checkbox</option>
                <option value="radio">Radio</option>
              </select>
            </div>

            <div className="space-y-2 flex items-center pt-2 gap-3">
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="is_active" id="is_active" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-orange-500" />
                <label htmlFor="is_active" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
              <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Is active <sup className="text-red-500">*</sup></label>
            </div>

          </div>

          <div className="px-6 py-4 bg-gray-50 flex gap-3 border-t border-gray-200">
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 focus:outline-none transition-colors shadow-sm"
            >
              Create
            </button>
            <button
              type="button"
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors"
            >
              Create &amp; create another
            </button>
            <Link
              href="/medical"
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .toggle-checkbox:checked {
          right: 0;
          border-color: #ea580c;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #ea580c;
        }
        .toggle-checkbox {
          right: 0;
          z-index: 1;
          border-color: #e5e7eb;
          transition: all 0.15s ease-out;
        }
        .toggle-label {
          transition: all 0.15s ease-out;
        }
      `}} />
    </div>
  );
}
