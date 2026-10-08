"use client";

import { markAttendance } from "./actions";
import { Check, X } from "lucide-react";

export default function AttendanceButtons({ id, currentStatus }: { id: string, currentStatus: string }) {
  if (currentStatus === 'PRESENT' || currentStatus === 'NO_SHOW') {
    return <span className="text-xs text-gray-400">Marked</span>;
  }

  return (
    <div className="flex justify-end gap-2">
      <button 
        onClick={() => markAttendance(id, 'PRESENT')}
        title="Mark Present"
        className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
      >
        <Check className="w-4 h-4" />
      </button>
      <button 
        onClick={() => markAttendance(id, 'NO_SHOW')}
        title="Mark No Show"
        className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
