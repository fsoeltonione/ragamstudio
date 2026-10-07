import { Search, Filter, X } from "lucide-react";

export default function ShopProductsPage() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full min-h-[500px]">
      
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-100 flex justify-end gap-2 bg-gray-50/50">
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
        </div>
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-300 bg-white flex items-center justify-center relative">
          <Filter className="w-4 h-4" />
          <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">0</span>
        </button>
      </div>

      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-bold">Name</th>
              <th className="px-6 py-4 font-bold">SKU</th>
              <th className="px-6 py-4 font-bold">Barcode</th>
              <th className="px-6 py-4 font-bold">UOM</th>
              <th className="px-6 py-4 font-bold flex items-center gap-1 cursor-pointer hover:text-gray-900">Price <span className="text-[10px]">▼</span></th>
              <th className="px-6 py-4 font-bold flex items-center gap-1 cursor-pointer hover:text-gray-900">Avg Cost <span className="text-[10px]">▼</span></th>
              <th className="px-6 py-4 font-bold flex items-center gap-1 cursor-pointer hover:text-gray-900">Stock <span className="text-[10px]">▼</span></th>
              <th className="px-6 py-4 font-bold flex items-center gap-1 cursor-pointer hover:text-gray-900">Shop <span className="text-[10px]">▼</span></th>
              <th className="px-6 py-4 font-bold text-right">Is active</th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center py-20">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
          <X className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-gray-900">No shop products</h3>
      </div>
      
    </div>
  );
}
