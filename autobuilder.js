const fs = require('fs');
const path = require('path');

const modules = [
  { path: 'shop-management', table: 'shop_products', nameField: 'name', icon: 'ShoppingBag' },
  { path: 'progress-parameters', table: 'progress_parameters', nameField: 'weight_kg', icon: 'Activity' },
  { path: 'invoices', table: 'invoices', nameField: 'invoice_number', icon: 'FileText' },
  { path: 'review-moderation', table: 'reviews', nameField: 'rating', icon: 'Star' },
  { path: 'blogs', table: 'blogs', nameField: 'title', icon: 'FileText' },
  { path: 'faqs', table: 'faqs', nameField: 'question', icon: 'HelpCircle' },
  { path: 'page-contents', table: 'page_contents', nameField: 'page_name', icon: 'Layout' },
  { path: 'users', table: 'users', nameField: 'name', icon: 'Users' },
  { path: 'shield/roles', table: 'roles', nameField: 'role_name', icon: 'Shield' },
  { path: 'authentication-logs', table: 'auth_logs', nameField: 'action', icon: 'Key' },
  { path: 'general-settings', table: 'system_settings', nameField: 'key_name', icon: 'Settings' },
  { path: 'manage-payment', table: 'system_settings', nameField: 'key_name', icon: 'CreditCard' },
  { path: 'seo-settings', table: 'system_settings', nameField: 'key_name', icon: 'Globe' },
  { path: 'topbar-settings', table: 'system_settings', nameField: 'key_name', icon: 'LayoutTemplate' },
  { path: 'notification-templates', table: 'notification_templates', nameField: 'event_name', icon: 'Bell' },
  { path: 'whatsapp-accounts', table: 'whatsapp_accounts', nameField: 'phone_number', icon: 'MessageCircle' }
];

const basePath = path.join(__dirname, '..', 'src', 'app');

modules.forEach(mod => {
  const dirPath = path.join(basePath, mod.path);
  const createDirPath = path.join(dirPath, 'create');
  
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
  if (!fs.existsSync(createDirPath)) fs.mkdirSync(createDirPath, { recursive: true });

  // 1. Write actions.ts
  const actionsContent = `"use server";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createData(formData: FormData) {
  const ${mod.nameField} = formData.get("${mod.nameField}") as string;
  
  if (!${mod.nameField}) return { error: "${mod.nameField} is required." };
  
  const { error } = await supabase.from("${mod.table}").insert({ ${mod.nameField} });
  if (error) return { error: "Failed to save data." };
  
  revalidatePath("/", "layout");
  redirect("/${mod.path}");
}
`;
  fs.writeFileSync(path.join(dirPath, 'actions.ts'), actionsContent);

  // 2. Write page.tsx (List)
  const listContent = `import { supabase } from "@/lib/supabase";
import { PlusCircle, Search, ${mod.icon} } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = 'force-dynamic';

export default async function Page() {
  const { data: records } = await supabase.from("${mod.table}").select("*").order("created_at", { ascending: false }).limit(50);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 capitalize">${mod.path.replace(/-/g, ' ')}</h1>
          <p className="text-gray-500 mt-1">Manage ${mod.table} data</p>
        </div>
        <Link href="/${mod.path}/create" className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
          <PlusCircle className="w-5 h-5" />
          Add New
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
        </div>
        
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-medium capitalize">${mod.nameField.replace(/_/g, ' ')}</th>
              <th className="px-6 py-4 font-medium">Created At</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {records?.map((rec: any) => (
              <tr key={rec.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-2">
                  <${mod.icon} className="w-4 h-4 text-orange-500" /> {String(rec.${mod.nameField})}
                </td>
                <td className="px-6 py-4 text-gray-500">{rec.created_at ? format(new Date(rec.created_at), "dd MMM yyyy") : '-'}</td>
                <td className="px-6 py-4 text-right text-orange-600 font-medium cursor-pointer">Edit</td>
              </tr>
            ))}
            {!records?.length && (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No data found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}`;
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), listContent);

  // 3. Write create/page.tsx
  const createContent = `import { createData } from "../actions";
import Link from "next/link";
import { ${mod.icon} } from "lucide-react";

export default function CreatePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/${mod.path}" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block">
          &larr; Back to List
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 capitalize">Create ${mod.path.replace(/-/g, ' ')}</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form action={createData} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="${mod.nameField}" className="block text-sm font-medium text-gray-700 capitalize">${mod.nameField.replace(/_/g, ' ')} *</label>
            <div className="relative">
              <${mod.icon} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" id="${mod.nameField}" name="${mod.nameField}" required className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t">
            <Link href="/${mod.path}" className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg">Cancel</Link>
            <button type="submit" className="px-6 py-2 text-sm text-white bg-orange-500 rounded-lg hover:bg-orange-600">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}`;
  fs.writeFileSync(path.join(createDirPath, 'page.tsx'), createContent);
});

console.log('Autobuilder finished generating 16 DB-connected modules!');
