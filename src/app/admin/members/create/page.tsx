"use client";

import { createMember } from "../actions";
import Link from "next/link";
import { useState } from "react";
import { Info } from "lucide-react";

export default function CreateMemberPage() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const res = await createMember(formData);
    
    if (res?.error) {
      setError(res.error);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Link href="/members" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block font-medium">
            &larr; Back to Members
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Member</h1>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit}>
          
          <div className="p-6">
            {error && (
              <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
                {error}
              </div>
            )}

            <div className="mb-6 p-4 bg-[oklab(0.968_0.021_286.643/0.3)] text-[oklch(0.552_0.016_285.938)] rounded-lg flex items-start gap-3 border border-[oklab(0.968_0.021_286.643)]">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="text-sm font-medium">
                Informasi Penting: Nomor HP dan email tidak diwajibkan lagi dan bisa dikosongkan, namun sangat disarankan mengedit datanya nanti.
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name <sup className="text-red-500">*</sup></label>
                  <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                  <input type="text" id="company" name="company" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender <sup className="text-red-500">*</sup></label>
                  <select id="gender" name="gender" required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                    <option value="">Select an option</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <input type="tel" id="phone" name="phone" defaultValue="+62" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status <sup className="text-red-500">*</sup></label>
                  <select id="status" name="status" required defaultValue="ACTIVE" className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                    <option value="">Select an option</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="SUSPENDED">Suspended</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 flex flex-wrap gap-3 border-t border-gray-200">
            <button type="submit" disabled={isSubmitting} className="px-6 py-2 text-sm font-medium text-white bg-[#ea580c] rounded-lg hover:bg-orange-600 focus:outline-none transition-colors shadow-sm disabled:opacity-50">
              {isSubmitting ? "Creating..." : "Create"}
            </button>
            <button type="button" className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors">
              Create & create another
            </button>
            <Link href="/members" className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center">
              Cancel
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}
