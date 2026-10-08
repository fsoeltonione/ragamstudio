import { supabase } from "@/lib/supabase";
import { PlusCircle, Search, Tag, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function PromoCodesPage() {
  const { data: promos } = await supabase
    .from("promo_codes")
    .select("*")
    .order("created_at", { ascending: false });

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Promo Codes
          </h1>
          <div className="text-sm text-gray-500 flex gap-2 mt-1">
            <span>Settings</span>
            <span>&gt;</span>
            <span>Promo Codes</span>
          </div>
        </div>
        <Link
          href="/promo-codes/create"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm"
        >
          <PlusCircle className="w-5 h-5" />
          New promo code
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors">
              Bulk actions ▾
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 font-bold bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                </th>
                <th className="px-6 py-4 whitespace-nowrap">Code</th>
                <th className="px-6 py-4 whitespace-nowrap">Type</th>
                <th className="px-6 py-4 whitespace-nowrap">Discount</th>
                <th className="px-6 py-4 whitespace-nowrap">Usage</th>
                <th className="px-6 py-4 whitespace-nowrap">Valid until</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Active</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {promos?.map((promo) => (
                <tr key={promo.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-bold text-gray-900">
                      <Tag className="w-4 h-4 text-orange-500" />
                      <span className="uppercase tracking-wide font-mono text-sm bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                        {promo.code}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium capitalize">
                    {promo.discount_percent > 0 ? "Percentage" : "Fixed"}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {promo.discount_percent > 0
                      ? `${promo.discount_percent}% OFF`
                      : promo.discount_fixed > 0
                      ? `${formatRupiah(promo.discount_fixed)} OFF`
                      : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900 font-medium">
                        {promo.used_count || 0}
                      </span>
                      <span className="text-gray-400">/</span>
                      <span className="text-gray-500">
                        {promo.max_uses ? promo.max_uses : "∞"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {promo.expires_at
                      ? format(new Date(promo.expires_at), "dd MMM yyyy")
                      : "Never"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {promo.is_active ? (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-[#e6f4ea] text-[#137333]">Yes</span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-gray-100 text-gray-500">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={"/promo-codes/" + promo.id + "/edit"}
                        className="text-orange-600 hover:text-orange-800 font-medium text-sm"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {!promos?.length && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <Tag className="w-8 h-8 text-gray-300" />
                      <p className="font-medium">No promo codes active yet.</p>
                      <Link
                        href="/promo-codes/create"
                        className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                      >
                        Create a new discount code
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
