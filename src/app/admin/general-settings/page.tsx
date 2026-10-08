"use client";

import { saveGeneralSettings } from "./actions";
import { Save, UploadCloud } from "lucide-react";
import { useState } from "react";

export default function GeneralSettingsPage() {
  const [activeTab, setActiveTab] = useState("General & Branding");

  const tabs = [
    "General & Branding",
    "Booking & Operations",
    "Company Info",
    "Features",
    "Chat & Socials"
  ];

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          General Settings
        </h1>
        <div className="text-sm text-gray-500 flex gap-2 mt-1">
          <span>Settings</span>
          <span>&gt;</span>
          <span>General</span>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <form action={saveGeneralSettings} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 space-y-6">
            
            {activeTab === "General & Branding" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <h3 className="col-span-full font-bold text-lg border-b pb-2">General &amp; Branding</h3>
                
                <div className="space-y-2">
                  <label htmlFor="app_name" className="block text-sm font-medium text-gray-700">
                    App Name <sup className="text-red-500">*</sup>
                  </label>
                  <input type="text" id="app_name" name="app_name" defaultValue="Ragam Studio" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="brand_color" className="block text-sm font-medium text-gray-700">
                    Default Primary Brand Color <sup className="text-red-500">*</sup>
                  </label>
                  <div className="flex gap-2">
                    <input type="color" id="brand_color_picker" defaultValue="#ea580c" className="h-10 w-10 rounded border border-gray-300 cursor-pointer p-0.5" />
                    <input type="text" id="brand_color" name="brand_color" defaultValue="#ea580c" required className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none uppercase" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Favicon</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer">
                    <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
                    <span className="text-sm">Click or drag file to upload</span>
                    <input type="file" className="hidden" accept="image/png, image/jpeg, image/ico" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Default App Logo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer">
                    <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
                    <span className="text-sm">Click or drag file to upload</span>
                    <input type="file" className="hidden" accept="image/png, image/jpeg, image/svg+xml" />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">PWA Icon</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer">
                    <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
                    <span className="text-sm">Upload 512x512 PNG for PWA icon</span>
                    <input type="file" className="hidden" accept="image/png" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency <sup className="text-red-500">*</sup></label>
                  <select id="currency" name="currency" defaultValue="IDR" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white">
                    <option value="IDR">IDR - Indonesian Rupiah</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="SGD">SGD - Singapore Dollar</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number <sup className="text-red-500">*</sup></label>
                  <input type="text" id="phone_number" name="phone_number" required defaultValue="+62" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">Timezone <sup className="text-red-500">*</sup></label>
                  <select id="timezone" name="timezone" defaultValue="Asia/Jakarta" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white">
                    <option value="Asia/Jakarta">Asia/Jakarta</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="default_language" className="block text-sm font-medium text-gray-700">Default Language</label>
                  <select id="default_language" name="default_language" defaultValue="en" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white">
                    <option value="en">English</option>
                    <option value="id">Indonesian</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === "Booking & Operations" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <h3 className="col-span-full font-bold text-lg border-b pb-2">Booking &amp; Operations</h3>
                <div className="space-y-2 md:col-span-2 text-gray-500 italic">Settings regarding maximum capacity, cancellation policies, and operation hours.</div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Cancellation Policy (Hours)</label>
                  <input type="number" defaultValue={24} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Booking Window (Days)</label>
                  <input type="number" defaultValue={30} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                </div>
              </div>
            )}

            {activeTab === "Company Info" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <h3 className="col-span-full font-bold text-lg border-b pb-2">Company Info</h3>
                <div className="space-y-2 md:col-span-2 text-gray-500 italic">Legal and public company information.</div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input type="text" defaultValue="Ragam Studio LLC" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea rows={3} defaultValue="Jakarta, Indonesia" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none resize-y" />
                </div>
              </div>
            )}

            {activeTab === "Features" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <h3 className="col-span-full font-bold text-lg border-b pb-2">Features</h3>
                <div className="space-y-2 md:col-span-2 text-gray-500 italic">Toggle system-wide features.</div>
                
                <div className="space-y-2 flex items-center pt-2 gap-3 md:col-span-2">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="enable_waitlist" id="enable_waitlist" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-orange-500" />
                    <label htmlFor="enable_waitlist" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                  </div>
                  <label htmlFor="enable_waitlist" className="text-sm font-medium text-gray-700">Enable Class Waitlists</label>
                </div>
              </div>
            )}

            {activeTab === "Chat & Socials" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <h3 className="col-span-full font-bold text-lg border-b pb-2">Chat &amp; Socials</h3>
                <div className="space-y-2 md:col-span-2 text-gray-500 italic">Integrations with chat widgets.</div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Live Chat Script</label>
                  <textarea rows={4} placeholder="Paste script here..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none resize-y font-mono text-sm" />
                </div>
              </div>
            )}

          </div>

          <div className="px-6 py-4 bg-gray-50 flex items-center justify-end gap-3 border-t border-gray-200">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-[#ea580c] hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              Save changes
            </button>
          </div>
        </div>
      </form>
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
      `}} />
    </div>
  );
}