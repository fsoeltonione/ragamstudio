"use client";
import { Bell, Menu, AlertCircle } from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { usePathname } from "next/navigation";

export function Topbar({ initialProps }: { initialProps: any }) {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();

  // Hide on login page
  if (pathname === '/login') return null;

  const { studioName = 'RagamStudio', announcementText, announcementLink } = initialProps || {};

  return (
    <div className="flex flex-col sticky top-0 z-10">
      {/* Announcement Banner (if any) */}
      {announcementText && (
        <div className="bg-orange-500 text-white text-xs px-4 py-2 flex items-center justify-center gap-2 font-medium">
          <AlertCircle className="w-4 h-4" />
          {announcementText}
          {announcementLink && (
            <a href={announcementLink} className="underline font-bold ml-1 hover:text-orange-100">Click Here &rarr;</a>
          )}
        </div>
      )}

      {/* Main Topbar */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="md:hidden text-gray-500 hover:text-gray-700">
            <Menu className="w-6 h-6" />
          </button>
          <div className="text-xl font-bold flex items-center gap-2">
            <span>{studioName}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              16
            </span>
          </button>
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
            SA
          </div>
        </div>
      </header>
    </div>
  );
}
