"use client";
import { Bell, Menu, AlertCircle, User, LogOut, Check } from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { formatDistanceToNow } from "date-fns";

export function Topbar({ initialProps }: { initialProps: any }) {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch notifications
    const fetchNotifs = async () => {
      const { data } = await supabase
        .from('database_notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      if (data) setNotifications(data);
    };
    if (pathname !== '/login') fetchNotifs();

    // Click outside handler
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [pathname]);

  const markAllRead = async () => {
    await supabase.from('database_notifications').update({ is_read: true }).eq('is_read', false);
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  if (pathname === '/login') return null;

  const { studioName = 'RagamStudio', announcementText, announcementLink } = initialProps || {};
  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="flex flex-col sticky top-0 z-10">
      {announcementText && (
        <div className="bg-orange-500 text-white text-xs px-4 py-2 flex items-center justify-center gap-2 font-medium">
          <AlertCircle className="w-4 h-4" />
          {announcementText}
          {announcementLink && (
            <a href={announcementLink} className="underline font-bold ml-1 hover:text-orange-100">Click Here &rarr;</a>
          )}
        </div>
      )}

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
          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
              className="text-gray-500 hover:text-gray-700 relative p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h3 className="font-bold text-gray-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" /> Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {notifications.map(notif => (
                        <div key={notif.id} className={["p-4 hover:bg-gray-50 transition-colors", notif.is_read ? "opacity-60" : "bg-orange-50/30"].join(" ")}>
                          <p className="text-sm font-bold text-gray-900">{notif.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{notif.message}</p>
                          <p className="text-[10px] text-gray-400 mt-2">
                            {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500 text-sm">
                      <Bell className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                      No notifications yet
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                SA
              </div>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <p className="font-bold text-gray-900">Super Admin</p>
                  <p className="text-xs text-gray-500 truncate">superadmin@ragamstudio.com</p>
                </div>
                <div className="p-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2 transition-colors">
                    <User className="w-4 h-4 text-gray-400" /> My Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center gap-2 transition-colors">
                    <LogOut className="w-4 h-4 text-red-400" /> Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
