import { supabase } from "@/lib/supabase";
import { format } from "date-fns";

export const dynamic = 'force-dynamic';

export default async function MemberPackagesPage() {
  const { data: memberPackages } = await supabase
    .from("member_packages")
    .select(`
      id,
      sessions_left,
      activation_date,
      expiry_date,
      is_active,
      member:members(name),
      package:packages(name)
    `)
    .order("expiry_date", { ascending: true });

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Member Packages</h1>
        <p className="text-gray-500 mt-1">Monitor active packages and remaining credits for each member.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Member</th>
                <th className="px-6 py-4 font-medium">Package Types</th>
                <th className="px-6 py-4 font-medium text-center">Credits Remaining</th>
                <th className="px-6 py-4 font-medium">Valid Until</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {memberPackages?.map((mp) => (
                <tr key={mp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {mp.member.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {mp.package.name}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-bold text-lg">
                      {mp.sessions_left}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {format(new Date(mp.expiry_date), "dd MMM yyyy")}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${mp.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {mp.is_active ? "Active" : "Finished"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
