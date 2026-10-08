import { supabase } from "@/lib/supabase";
import { PlusCircle, Search, UserCog, DollarSign } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = 'force-dynamic';

export default async function TrainersPage() {
  const { data: trainers } = await supabase.from("users").select("*").order("name", { ascending: true });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Trainers</h1>
          <p className="text-gray-500 mt-1">Manage studio trainers and commission rates</p>
        </div>
        <Link href="/trainers/create" className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
          <PlusCircle className="w-5 h-5" />
          Add Trainer
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search trainers..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
        </div>
        
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-medium">Trainer Info</th>
              <th className="px-6 py-4 font-medium text-right">Base Rate</th>
              <th className="px-6 py-4 font-medium text-right">Per-Head Rate</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {trainers?.map((trainer) => (
              <tr key={trainer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                      <UserCog className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold">{trainer.name}</div>
                      <div className="text-xs text-gray-500">{trainer.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-medium text-gray-900">
                  Rp {trainer.base_rate?.toLocaleString('id-ID') || 0}
                </td>
                <td className="px-6 py-4 text-right font-medium text-gray-900">
                  Rp {trainer.per_head_rate?.toLocaleString('id-ID') || 0}
                </td>
                <td className="px-6 py-4 text-right text-orange-600 font-medium cursor-pointer">Edit</td>
              </tr>
            ))}
            {!trainers?.length && (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No trainers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
