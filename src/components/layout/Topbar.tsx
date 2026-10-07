import { Bell, Menu, Search } from "lucide-react";

export function Topbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-gray-500 hover:text-gray-700">
          <Menu className="w-6 h-6" />
        </button>
        <div className="text-xl font-bold flex items-center gap-2">
          {/* We can add a logo icon here if needed */}
          <span>RagamStudio</span>
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
  );
}
