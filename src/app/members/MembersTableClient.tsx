"use client";

import { useState } from "react";
import { User, ChevronLeft, ChevronRight, CheckSquare, Square, Trash2, Ban, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { bulkActionMembers } from "./actions";
import { useRouter } from "next/navigation";

export default function MembersTableClient({ members, currentPage, totalPages }: { members: any[], currentPage: number, totalPages: number }) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleSelectAll = () => {
    if (selectedIds.length === members.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(members.map(m => m.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkAction = async (action: 'delete' | 'suspend' | 'activate') => {
    if (selectedIds.length === 0) return;
    if (action === 'delete' && !confirm("Are you sure you want to delete selected members?")) return;
    
    setIsProcessing(true);
    const res = await bulkActionMembers(selectedIds, action);
    setIsProcessing(false);
    
    if (res?.error) {
      alert(res.error);
    } else {
      setSelectedIds([]);
      router.refresh();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* Toolbar / Bulk Actions */}
      <div className="p-4 border-b border-gray-200 flex gap-4 bg-gray-50/50 justify-between items-center min-h-[64px]">
        {selectedIds.length > 0 ? (
          <div className="flex items-center gap-4 animate-in fade-in">
            <span className="text-sm font-bold text-gray-700 bg-white px-3 py-1 rounded-md shadow-sm border">
              {selectedIds.length} selected
            </span>
            <div className="flex gap-2">
              <button onClick={() => handleBulkAction('activate')} disabled={isProcessing} className="flex items-center gap-1 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50">
                <CheckCircle className="w-4 h-4" /> Activate
              </button>
              <button onClick={() => handleBulkAction('suspend')} disabled={isProcessing} className="flex items-center gap-1 text-sm font-medium text-yellow-700 bg-yellow-50 hover:bg-yellow-100 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50">
                <Ban className="w-4 h-4" /> Suspend
              </button>
              <button onClick={() => handleBulkAction('delete')} disabled={isProcessing} className="flex items-center gap-1 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500 italic">Select members to perform bulk actions</div>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-4 w-12 text-center">
                <button onClick={toggleSelectAll} className="text-gray-400 hover:text-orange-500 transition-colors">
                  {selectedIds.length === members.length && members.length > 0 ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                </button>
              </th>
              <th className="px-6 py-4 font-medium">Name & Gender</th>
              <th className="px-6 py-4 font-medium">Contact Info</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Joined Date</th>
              <th className="px-6 py-4 font-medium text-center">Packages</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.id} className={`transition-colors ${selectedIds.includes(member.id) ? 'bg-orange-50/30' : 'hover:bg-gray-50'}`}>
                <td className="px-4 py-4 text-center">
                  <button onClick={() => toggleSelect(member.id)} className={`transition-colors ${selectedIds.includes(member.id) ? 'text-orange-500' : 'text-gray-300 hover:text-gray-400'}`}>
                    {selectedIds.includes(member.id) ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                  </button>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold">{member.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{member.gender || 'Unknown'}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-900 font-medium">{member.email}</div>
                  <div className="text-gray-500 text-xs">{member.phone || "No phone"}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase ${member.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {member.status || 'ACTIVE'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {format(new Date(member.created_at), "dd MMM yyyy")}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">
                    {member.member_packages[0]?.count || 0}
                  </span>
                </td>
              </tr>
            ))}

            {!members.length && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-white">
          <span className="text-sm text-gray-500">
            Page <span className="font-bold text-gray-900">{currentPage}</span> of <span className="font-bold text-gray-900">{totalPages}</span>
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => router.push(`/members?page=${currentPage - 1}`)}
              disabled={currentPage <= 1}
              className="p-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => router.push(`/members?page=${currentPage + 1}`)}
              disabled={currentPage >= totalPages}
              className="p-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
