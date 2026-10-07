"use client";

import { SidebarProvider, useSidebar } from "./SidebarContext";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Toaster } from "sonner";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

function MobileOverlay() {
  const { isOpen, closeSidebar } = useSidebar();
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-gray-900/50 z-20 md:hidden" 
      onClick={closeSidebar}
    />
  );
}

function GlobalToastListener() {
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    // A simple heuristic: if we transition from a /create page to a list page, show toast
    if (prevPath.endsWith('/create') && !pathname.endsWith('/create') && pathname !== prevPath) {
      toast.success('Saved successfully', {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        className: 'bg-white border border-gray-200 text-gray-900 shadow-lg font-medium rounded-xl',
      });
    }
    setPrevPath(pathname);
  }, [pathname, prevPath]);

  return null;
}

export function AppLayout({ children, initialTopbarProps }: { children: ReactNode, initialTopbarProps: any }) {
  const pathname = usePathname();

  if (pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden w-full">
        <MobileOverlay />
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar initialProps={initialTopbarProps} />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              {children}
            </div>
          </main>
        </div>
      </div>
      <Toaster position="top-right" />
      <GlobalToastListener />
    </SidebarProvider>
  );
}
