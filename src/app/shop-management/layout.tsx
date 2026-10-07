"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, ShoppingCart, Tag, SlidersHorizontal, Store, Truck, BarChart3, ChevronRight } from "lucide-react";

export default function ShopManagementLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Shop Products", href: "/shop-management/products", icon: ShoppingBag },
    { name: "Shop Purchases", href: "/shop-management/purchases", icon: ShoppingCart },
    { name: "Shop Sales", href: "/shop-management/sales", icon: Tag },
    { name: "Shop Stock Adjustments", href: "/shop-management/stock-adjustments", icon: SlidersHorizontal },
    { name: "Shops", href: "/shop-management/shops", icon: Store },
    { name: "Vendors", href: "/shop-management/vendors", icon: Truck },
    { name: "Shop Reports", href: "/shop-management/reports", icon: BarChart3 },
  ];

  const currentItem = navItems.find(item => pathname.includes(item.href)) || navItems[0];

  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Breadcrumb & Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>Shop Management</span>
          <ChevronRight className="w-4 h-4" />
          <span>{currentItem.name}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">List</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{currentItem.name}</h1>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            New {currentItem.name.replace('Shop ', '')}
          </button>
        </div>
      </div>

      {/* Cluster Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Inner Sidebar Menu */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname.includes(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={["flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors", isActive ? "bg-orange-50 text-orange-600" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"].join(" ")}
                >
                  <Icon className={["w-5 h-5", isActive ? "text-orange-600" : "text-gray-400"].join(" ")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {children}
        </div>

      </div>
    </div>
  );
}
