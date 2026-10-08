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
const ACTIONS = [
  "viewAny",
  "view",
  "create",
  "update",
  "delete",
  "restore",
  "force Delete",
  "force Delete Any",
  "restore Any",
  "replicate",
  "reorder"
];

const TABS = ["Resources", "Pages", "Widgets", "Custom Permissions"];

type PermissionsState = Record<string, Record<string, boolean>>;

interface PermissionsMatrixProps {
  name: string;
  initialValue?: PermissionsState;
}

export function PermissionsMatrix({
  name,
  initialValue,
}: PermissionsMatrixProps) {
  const [activeTab, setActiveTab] = useState("Resources");
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
    <div className="mt-4">
      <input type="hidden" name={name} value={JSON.stringify(permissions)} />

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-4 px-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        {activeTab === "Resources" ? (
          <div className="divide-y divide-gray-200">
            {RESOURCES.map((res) => {
              const resPerms = permissions[res] || {};
              const allChecked = ACTIONS.every((a) => resPerms[a]);

              return (
                <div key={res} className="bg-white">
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={allChecked}
                        onChange={(e) =>
                          toggleAllResource(res, e.target.checked)
                        }
                        className="w-4 h-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                        title={"Select all " + res}
                      />
                      <span className="font-bold text-gray-900">{res}</span>
                    </div>
                    {/* Mock Accordion Chevron */}
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {ACTIONS.map((action) => (
                      <div key={action} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`${res}-${action}`}
                          checked={!!resPerms[action]}
                          onChange={() => togglePermission(res, action)}
                          className="w-4 h-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500 cursor-pointer"
                        />
                        <label htmlFor={`${res}-${action}`} className="text-sm text-gray-700 capitalize cursor-pointer">
                          {action}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500 bg-gray-50">
            <p>Select specific {activeTab.toLowerCase()} access matrix here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
