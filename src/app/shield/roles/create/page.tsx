import { createData } from "../actions";
import Link from "next/link";
import { Shield, ShieldAlert } from "lucide-react";
import { PermissionsMatrix } from "@/components/ui/PermissionsMatrix";

export default function CreateRolePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/shield/roles" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block">
          &larr; Back to Roles
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Role</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form action={createData} className="space-y-6">
          <div className="space-y-2 max-w-md">
            <label htmlFor="role_name" className="block text-sm font-medium text-gray-700">Role Name *</label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" id="role_name" name="role_name" required placeholder="e.g. Cashier" className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <div className="mb-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-orange-500" /> Permissions Matrix
              </h3>
              <p className="text-sm text-gray-500 mt-1">Configure granular access for this role.</p>
            </div>
            
            <PermissionsMatrix name="permissions_json" />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t mt-6">
            <Link href="/shield/roles" className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg">Cancel</Link>
            <button type="submit" className="px-6 py-2 text-sm text-white bg-orange-500 rounded-lg hover:bg-orange-600">Save Role</button>
          </div>
        </form>
      </div>
    </div>
  );
}
