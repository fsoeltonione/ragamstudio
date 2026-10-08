"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  Home, ShoppingBag, BarChart2, MonitorSmartphone, 
  Users, Package, MapPin, Activity, 
  ChevronDown, ChevronRight, Folder, DollarSign, FileText, Settings, UserCog 
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuGroups = [
  {
    title: "",
    items: [
      { name: "Dashboard", href: "/admin", icon: Home },
      { name: "Shop Management", href: "/admin/shop-management", icon: ShoppingBag },
      { name: "Analytics", href: "/admin/analytics", icon: BarChart2 },
      { name: "Point of Sale", href: "/admin/pos", icon: MonitorSmartphone },
      { name: "Classes", href: "/admin/classes", icon: Users },
      { name: "Packages", href: "/admin/packages", icon: Package },
      { name: "Locations", href: "/admin/locations", icon: MapPin },
      { name: "Medical", href: "/admin/medical", icon: Activity },
    ]
  },
  {
    title: "Management",
    icon: Folder,
    items: [
      { name: "Bookings", href: "/admin/bookings" },
      { name: "Class Schedules", href: "/admin/class-schedules" },
      { name: "Member Packages", href: "/admin/member-packages" },
      { name: "Members", href: "/admin/members" },
      { name: "Progress Parameters", href: "/admin/progress-parameters" },
      { name: "Trainers", href: "/admin/trainers" },
    ]
  },
  {
    title: "Payments",
    icon: DollarSign,
    items: [
      { name: "Invoices", href: "/admin/invoices" },
      { name: "Payment Methods", href: "/admin/payment-methods" },
      { name: "Promo Codes", href: "/admin/promo-codes" },
    ]
  },
  {
    title: "Finance",
    icon: BarChart2,
    items: [
      { name: "Owner Profits", href: "/admin/owner-profits" },
      { name: "Trainer Payments", href: "/admin/trainer-payments" },
      { name: "Monthly Tax Report", href: "/admin/tax-report" },
    ]
  },
  {
    title: "Content Management",
    icon: FileText,
    items: [
      { name: "Review Moderation", href: "/admin/review-moderation" },
      { name: "Blogs", href: "/admin/blogs" },
      { name: "Faqs", href: "/admin/faqs" },
      { name: "Page Content", href: "/admin/page-contents" },
    ]
  },
  {
    title: "User Management",
    icon: UserCog,
    items: [
      { name: "Users", href: "/admin/users" },
      { name: "Roles", href: "/admin/shield/roles" },
      { name: "Authentication Logs", href: "/admin/authentication-logs" },
    ]
  },
  {
    title: "Settings",
    icon: Settings,
    items: [
      { name: "General Settings", href: "/admin/general-settings" },
      { name: "Payment Settings", href: "/admin/manage-payment" },
      { name: "SEO Settings", href: "/admin/seo-settings" },
      { name: "Topbar Settings", href: "/admin/topbar-settings" },
      { name: "Notification Templates", href: "/admin/notification-templates" },
      { name: "WhatsApp Accounts", href: "/admin/whatsapp-accounts" },
    ]
  }
];

import { useSidebar } from "./SidebarContext";

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, closeSidebar } = useSidebar();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => ({ ...prev, [title]: !prev[title] }));
  };

  // If in login page, hide completely
  if (pathname === '/login') return null;

  return (
    <aside className={cn(
      "w-64 bg-white border-r h-screen overflow-y-auto flex flex-col fixed md:relative z-30 transition-transform duration-300",
      isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
    )}>
      <div className="p-4 space-y-1">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="mb-4">
            {group.title ? (
              <div>
                <button
                  onClick={() => toggleGroup(group.title)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {group.icon && <group.icon className="w-5 h-5 text-gray-400" />}
                    <span>{group.title}</span>
                  </div>
                  {expandedGroups[group.title] ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                {expandedGroups[group.title] && (
                  <div className="mt-1 ml-4 pl-4 border-l space-y-1">
                    {group.items.map(item => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={closeSidebar}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                            isActive
                              ? "bg-orange-50 text-orange-600"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          )}
                        >
                          <div className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-orange-500" : "bg-transparent")} />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-1">
                {group.items.map((item: any) => {
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeSidebar}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                        isActive
                          ? "bg-orange-50 text-orange-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      {Icon && (
                        <Icon 
                          className={cn("w-5 h-5", isActive ? "text-orange-500" : "text-gray-400")} 
                        />
                      )}
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
