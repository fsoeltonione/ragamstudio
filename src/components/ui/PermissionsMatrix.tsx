"use client";
import { useState } from "react";

const RESOURCES = [
  "Bookings", "Classes", "Members", "Packages", "Trainers", "POS", "Finances", "Settings"
];
const ACTIONS = ["viewAny", "view", "create", "update", "delete"];

export function PermissionsMatrix({ name }: { name: string }) {
  const [permissions, setPermissions] = useState<Record<string, Record<string, boolean>>>({});

  const togglePermission = (resource: string, action: string) => {
    setPermissions(prev => ({
      ...prev,
      [resource]: {
        ...(prev[resource] || {}),
        [action]: !(prev[resource]?.[action])
      }
    }));
  };

  const toggleAllResource = (resource: string, isChecked: boolean) => {
    setPermissions(prev => {
      const newRes: Record<string, boolean> = {};
      ACTIONS.forEach(a => newRes[a] = isChecked);
      return { ...prev, [resource]: newRes };
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white mt-2">
      <input type="hidden" name={name} value={JSON.stringify(permissions)} />
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Resource</th>
              {ACTIONS.map(action => (
                <th key={action} className="px-4 py-3 font-medium text-center">{action}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {RESOURCES.map(res => {
              const resPerms = permissions[res] || {};
              const allChecked = ACTIONS.every(a => resPerms[a]);

              return (
                <tr key={res} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-bold text-gray-900 flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={allChecked}
                      onChange={(e) => toggleAllResource(res, e.target.checked)}
                      className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500" 
                    />
                    {res}
                  </td>
                  {ACTIONS.map(action => (
                    <td key={action} className="px-4 py-3 text-center">
                      <input 
                        type="checkbox" 
                        checked={resPerms[action] || false}
                        onChange={() => togglePermission(res, action)}
                        className="w-4 h-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500" 
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
