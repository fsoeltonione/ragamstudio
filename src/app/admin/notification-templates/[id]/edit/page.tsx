import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Mail, Save } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditNotificationTemplatePage({
  params,
}: {
  params: { id: string };
}) {
  const { data: template } = await supabase
    .from("notification_templates")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!template) {
    notFound();
  }

  // Define a mock action, since we are just mocking the UI
  async function updateTemplate(formData: FormData) {
    "use server";
    // Mock save
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Link
            href="/notification-templates"
            className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium"
          >
            &larr; Back to Notification Templates
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Edit Notification Template
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form action={updateTemplate} className="space-y-0">
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Template Name <sup className="text-red-500">*</sup>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  defaultValue={template.name}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Template Type
              </label>
              <select
                id="type"
                name="type"
                defaultValue={template.type}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white disabled:bg-gray-50 disabled:text-gray-500"
                disabled
              >
                <option value="EMAIL">Email</option>
                <option value="WHATSAPP">WhatsApp</option>
                <option value="SMS">SMS</option>
                <option value="PUSH">Push Notification</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject <sup className="text-red-500">*</sup>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                defaultValue={template.subject || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <div className="flex justify-between items-end mb-1">
                <label htmlFor="body" className="block text-sm font-medium text-gray-700">
                  Body Content
                </label>
                <span className="text-xs text-gray-500 italic">Supports HTML & Variables</span>
              </div>
              <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500">
                <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex items-center gap-2">
                  <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-gray-700 font-bold" title="Bold">B</button>
                  <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-gray-700 italic font-serif" title="Italic">I</button>
                  <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-gray-700 underline" title="Underline">U</button>
                  <div className="w-px h-4 bg-gray-300 mx-1"></div>
                  <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-gray-700 text-sm" title="Insert Variable">&#123;&#123; x &#125;&#125;</button>
                </div>
                <textarea
                  id="body"
                  name="body"
                  rows={10}
                  defaultValue={template.body || ""}
                  className="w-full px-4 py-3 focus:outline-none resize-y border-none"
                ></textarea>
              </div>
            </div>
            
            <div className="md:col-span-2 bg-blue-50 text-blue-800 p-4 rounded-lg text-sm border border-blue-100">
              <p className="font-bold mb-2">Available Variables:</p>
              <ul className="list-disc list-inside space-y-1 font-mono text-xs">
                <li>{`{{ member.name }}`} - Member's full name</li>
                <li>{`{{ member.email }}`} - Member's email address</li>
                <li>{`{{ class.name }}`} - Class name (if applicable)</li>
                <li>{`{{ class.date }}`} - Date and time of class</li>
                <li>{`{{ studio.name }}`} - Ragam Studio</li>
              </ul>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 flex items-center justify-end gap-3 border-t border-gray-200">
            <Link
              href="/notification-templates"
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-[#ea580c] hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
