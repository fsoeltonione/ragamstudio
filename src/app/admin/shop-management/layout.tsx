"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Archive, Banknote, SlidersHorizontal, Store, Truck, BarChart3 } from "lucide-react";

export default function ShopManagementLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Shop Products", href: "/shop-management/products", icon: ShoppingBag },
    { name: "Shop Purchases", href: "/shop-management/purchases", icon: Archive },
    { name: "Shop Sales", href: "/shop-management/sales", icon: Banknote },
    { name: "Shop Stock Adjustments", href: "/shop-management/stock-adjustments", icon: SlidersHorizontal },
    { name: "Shops", href: "/shop-management/shops", icon: Store },
    { name: "Vendors", href: "/shop-management/vendors", icon: Truck },
    { name: "Shop Reports", href: "/shop-management/reports", icon: BarChart3 },
  ];

  return (
    <div className="flex flex-col space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[500px]">
        {/* Filament-style Sub-navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50/50 px-2 pt-2 scrollbar-hide">
          {navItems.map((item) => {
            const isActive = pathname.includes(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={"whitespace-nowrap px-4 py-2.5 text-sm font-medium border-b-2 rounded-t-lg transition-colors " + (isActive ? "border-orange-500 text-orange-600 bg-white" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100")}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}
