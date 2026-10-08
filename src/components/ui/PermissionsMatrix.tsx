"use client";
import { useState } from "react";

const RESOURCES = [
  "Bookings",
  "Classes",
  "Members",
  "Packages",
  "Trainers",
  "POS",
  "Shop",
  "Invoices",
  "Finance",
  "Settings",
  "Users",
];
const ACTIONS = ["viewAny", "view", "create", "update", "delete"];

type PermissionsState = Record<string, Record<string, boolean>>;

interface PermissionsMatrixProps {
  name: string;
  initialValue?: PermissionsState;
}

export function PermissionsMatrix({
  name,
  initialValue,
}: PermissionsMatrixProps) {
  const [permissions, setPermissions] = useState<PermissionsState>(
    initialValue || {}
  );

  const togglePermission = (resource: string, action: string) => {
    setPermissions((prev) => ({
      ...prev,
      [resource]: {
        ...(prev[resource] || {}),
        [action]: !(prev[resource]?.[action]),
      },
    }));
  };

  const toggleAllResource = (resource: string, isChecked: boolean) => {
    setPermissions((prev) => {
      const newRes: Record<string, boolean> = {};
      ACTIONS.forEach((a) => (newRes[a] = isChecked));
      return { ...prev, [resource]: newRes };
    });
  };

  const toggleAllAction = (action: string, isChecked: boolean) => {
    setPermissions((prev) => {
      const updated = { ...prev };
      RESOURCES.forEach((r) => {
        updated[r] = { ...(updated[r] || {}), [action]: isChecked };
      });
      return updated;
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
              {ACTIONS.map((action) => (
                <th key={action} className="px-4 py-3 font-medium text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span>{action}</span>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        toggleAllAction(action, e.target.checked)
                      }
                      className="w-3.5 h-3.5 text-orange-500 rounded focus:ring-orange-500"
                      title={"Toggle all " + action}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {RESOURCES.map((res) => {
              const resPerms = permissions[res] || {};
              const allChecked = ACTIONS.every((a) => resPerms[a]);

              return (
                <tr key={res} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-bold text-gray-900">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={allChecked}
                        onChange={(e) =>
                          toggleAllResource(res, e.target.checked)
                        }
                        className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                      />
                      {res}
                    </div>
                  </td>
                  {ACTIONS.map((action) => (
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
