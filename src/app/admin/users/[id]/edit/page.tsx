import { supabase } from "@/lib/supabase";
import { updateUser } from "../../actions";
import Link from "next/link";
import { UserCog } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditUserPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", params.id)
    .single();

  const { data: locations } = await supabase.from("locations").select("id, name").order("name");

  if (!user) notFound();

  const updateUserWithId = updateUser.bind(null, params.id);

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link
          href="/users"
          className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block"
        >
          &larr; Back to Users
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Edit User
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex items-center gap-2">
          <UserCog className="w-5 h-5 text-orange-500" />
          <h2 className="font-bold text-gray-700">User Details</h2>
        </div>

        <form action={updateUserWithId} className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email (read-only)
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={user.name || ""}
              placeholder="e.g. John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role *
              </label>
              <select
                id="role"
                name="role"
                required
                defaultValue={user.role || "STAFF"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
              >
                <option value="STAFF">Staff</option>
                <option value="TRAINER">Trainer</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="location_id"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <select
                id="location_id"
                name="location_id"
                defaultValue={user.location_id || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
              >
                <option value="">All Locations</option>
                {locations?.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-500 mb-4 font-medium uppercase tracking-wide">
              Trainer Rates
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="base_rate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Base Rate per Class (Rp)
                </label>
                <input
                  type="number"
                  id="base_rate"
                  name="base_rate"
                  min="0"
                  step="1000"
                  defaultValue={Number(user.base_rate) || 140000}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="per_head_rate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Per Head Rate (Rp)
                </label>
                <input
                  type="number"
                  id="per_head_rate"
                  name="per_head_rate"
                  min="0"
                  step="1000"
                  defaultValue={Number(user.per_head_rate) || 10000}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <Link
              href="/users"
              className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2 text-sm text-white bg-orange-500 rounded-lg hover:bg-orange-600 font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
