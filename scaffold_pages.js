const fs = require('fs');
const path = require('path');

const routes = [
  { path: 'shop-management', title: 'Shop Management', desc: 'Manage your studio merchandise and products' },
  { path: 'analytics', title: 'Deep Analytics', desc: 'Advanced reporting and business intelligence' },
  { path: 'progress-parameters', title: 'Progress Parameters', desc: 'Track member fitness metrics and goals' },
  { path: 'invoices', title: 'Invoices', desc: 'Manage digital receipts and billing' },
  { path: 'tax-report', title: 'Monthly Tax Report', desc: 'Calculate PB1 and PPN obligations' },
  { path: 'review-moderation', title: 'Review Moderation', desc: 'Approve or reject customer reviews' },
  { path: 'blogs', title: 'Blogs', desc: 'Publish news and articles for SEO' },
  { path: 'faqs', title: 'Faqs', desc: 'Manage frequently asked questions' },
  { path: 'page-contents', title: 'Page Content', desc: 'Manage dynamic website content' },
  { path: 'users', title: 'System Users', desc: 'Manage administrative staff accounts' },
  { path: 'shield/roles', title: 'Roles & Permissions', desc: 'Configure access control and security shield' },
  { path: 'authentication-logs', title: 'Authentication Logs', desc: 'Audit trail of system logins' },
  { path: 'general-settings', title: 'General Settings', desc: 'Configure studio name, logo, and core parameters' },
  { path: 'manage-payment', title: 'Payment Gateway Settings', desc: 'Configure Midtrans/Xendit API keys' },
  { path: 'seo-settings', title: 'SEO Settings', desc: 'Configure meta tags and search engine visibility' },
  { path: 'topbar-settings', title: 'Topbar Settings', desc: 'Manage global announcement banners' },
  { path: 'notification-templates', title: 'Notification Templates', desc: 'Customize email and push notification text' },
  { path: 'whatsapp-accounts', title: 'WhatsApp Accounts', desc: 'Manage WhatsApp API integrations' }
];

const basePath = path.join(__dirname, '..', 'src', 'app');

routes.forEach(route => {
  const dirPath = path.join(basePath, route.path);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  const content = `import { FileText, PlusCircle, Search } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">${route.title}</h1>
          <p className="text-gray-500 mt-1">${route.desc}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
          <PlusCircle className="w-5 h-5" />
          Add New
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search ${route.title.toLowerCase()}..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
        </div>
        
        <div className="p-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No data available</h3>
          <p className="text-gray-500 max-w-sm">This module has been structurally generated and is ready for database connection in the next integration phase.</p>
        </div>
      </div>
    </>
  );
}`;

  fs.writeFileSync(path.join(dirPath, 'page.tsx'), content);
});

console.log('All remaining routes have been scaffolded successfully!');
