import { LogOut } from "lucide-react";

export default function Dashboard() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Dashboard</h1>
      
      {/* Welcome Widget */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold">
            SA
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Welcome</h2>
            <p className="text-sm text-gray-500">Super Admin</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>

      {/* Placeholder Widgets matching the screenshot */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 h-32 flex items-center justify-center text-gray-400">
            {/* Empty space for future widgets */}
          </div>
        ))}
      </div>
    </>
  );
}
