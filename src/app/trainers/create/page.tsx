import { createTrainer } from "../actions";
import Link from "next/link";
import { User, DollarSign, Mail } from "lucide-react";

export default function CreateTrainerPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/trainers" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-block">
          &larr; Back to Trainers
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add Trainer</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form action={createTrainer} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" id="name" name="name" required className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="email" id="email" name="email" required className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t pt-4">
            <div className="space-y-2">
              <label htmlFor="base_rate" className="block text-sm font-medium text-gray-700">Base Rate (Rp)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="number" id="base_rate" name="base_rate" defaultValue={140000} className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="per_head_rate" className="block text-sm font-medium text-gray-700">Per-Head Bonus (Rp)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="number" id="per_head_rate" name="per_head_rate" defaultValue={10000} className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t">
            <Link href="/trainers" className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg">Cancel</Link>
            <button type="submit" className="px-6 py-2 text-sm text-white bg-orange-500 rounded-lg hover:bg-orange-600">Save Trainer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
