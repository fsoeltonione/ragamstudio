import { supabase } from "@/lib/supabase";
import { PlusCircle, Search, Tag } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = 'force-dynamic';

export default async function PromoCodesPage() {
  const { data: promos } = await supabase.from("promo_codes").select("*").order("created_at", { ascending: false });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Promo Codes</h1>
          <p className="text-gray-500 mt-1">Manage discount logic for POS transactions</p>
        </div>
        <Link href="/promo-codes/create" className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
          <PlusCircle className="w-5 h-5" />
          Add Promo Code
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search codes..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
        </div>
        
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-medium">Code</th>
              <th className="px-6 py-4 font-medium text-center">Discount Logic</th>
              <th className="px-6 py-4 font-medium text-center">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {promos?.map((promo) => (
              <tr key={promo.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-orange-500" /> {promo.code}
                </td>
                <td className="px-6 py-4 text-center text-gray-900 font-bold">
                  {promo.discount_percent > 0 ? `${promo.discount_percent}%` : `Rp ${promo.discount_fixed.toLocaleString('id-ID')}`}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase ${promo.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {promo.is_active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-orange-600 font-medium cursor-pointer">Edit</td>
              </tr>
            ))}
            {!promos?.length && (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No promo codes found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
